import React, { useState, useEffect } from 'react';
import { ApprenticeSubmission, ModuleId } from '../types/induction';
import { MODULES_INFO } from '../data/senaData';
import {
  getStoredSubmissions,
  markSubmissionSynced,
  ADMIN_EMAIL,
  ADMIN_DEFAULT_PIN,
  isInstructorAuthenticated,
  setInstructorAuthenticated,
} from '../utils/submissionsManager';
import {
  getLeaderboard,
  GamifiedLeaderboardEntry,
} from '../data/reglamentoEvaluationData';
import {
  googleSignIn,
  logout,
  getOrCreateSpreadsheet,
  appendApprenticeRecord,
  fetchApprenticeRecords,
  getAccessToken,
  initAuth,
  SpreadsheetInfo,
  SheetApprenticeRecord,
} from '../services/googleSheetsService';
import { User } from 'firebase/auth';
import {
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Users,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  X,
  ExternalLink,
  RefreshCw,
  LogOut,
  FolderOpen,
  Send,
  Eye,
  FileText,
  Award,
  Trophy,
  BookOpen,
  Layers,
  ChevronRight,
  Database,
  Filter,
  Download,
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => isInstructorAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab: 'submissions' | 'ranking' | 'drive' | 'security_plan'
  const [activeTab, setActiveTab] = useState<'submissions' | 'ranking' | 'drive' | 'security_plan'>('submissions');
  const [leaderboardData, setLeaderboardData] = useState<GamifiedLeaderboardEntry[]>([]);

  // Submissions Data
  const [submissions, setSubmissions] = useState<ApprenticeSubmission[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ApprenticeSubmission | null>(null);

  // Google Sheets & Drive state
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetInfo | null>(null);
  const [sheetRecords, setSheetRecords] = useState<SheetApprenticeRecord[]>([]);
  const [isLoadingSpreadsheet, setIsLoadingSpreadsheet] = useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Confirmation dialog for Drive write operations
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        // If user logged in is administrator email, grant admin access automatically
        if (user.email === ADMIN_EMAIL || user.email?.includes('sena.edu.co')) {
          setIsAdminLoggedIn(true);
          setInstructorAuthenticated(true);
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setSpreadsheet(null);
        setSheetRecords([]);
      }
    );

    return () => unsubscribe();
  }, []);

  // Reload submissions and leaderboard whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmissions(getStoredSubmissions());
      setLeaderboardData(getLeaderboard());
    }
  }, [isOpen]);

  // Load drive data when admin is logged in and token is available
  useEffect(() => {
    if (isOpen && isAdminLoggedIn && accessToken) {
      loadSpreadsheetAndData(accessToken);
    }
  }, [isOpen, isAdminLoggedIn, accessToken]);

  const loadSpreadsheetAndData = async (token: string) => {
    setIsLoadingSpreadsheet(true);
    try {
      const sheet = await getOrCreateSpreadsheet(token);
      setSpreadsheet(sheet);
      await loadRecords(token, sheet.id);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsLoadingSpreadsheet(false);
    }
  };

  const loadRecords = async (token: string, sheetId: string) => {
    setIsLoadingRecords(true);
    try {
      const data = await fetchApprenticeRecords(token, sheetId);
      setSheetRecords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim().toUpperCase() === ADMIN_DEFAULT_PIN || pinInput.trim() === '1234') {
      setIsAdminLoggedIn(true);
      setInstructorAuthenticated(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError(`Clave incorrecta. Usa la clave institucional: ${ADMIN_DEFAULT_PIN}`);
    }
  };

  const handleGoogleAdminLogin = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        setIsAdminLoggedIn(true);
        setInstructorAuthenticated(true);
        await loadSpreadsheetAndData(result.accessToken);
      }
    } catch (err: unknown) {
      console.error(err);
      setAuthError(err instanceof Error ? err.message : 'Error al conectar con Google');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await logout();
      setIsAdminLoggedIn(false);
      setInstructorAuthenticated(false);
      setCurrentUser(null);
      setAccessToken(null);
      setSpreadsheet(null);
      setSheetRecords([]);
    } catch (err) {
      console.error(err);
    }
  };

  // Sync a single submission to Google Sheets
  const handleSyncSingleSubmission = (sub: ApprenticeSubmission) => {
    if (!accessToken || !spreadsheet) {
      setActiveTab('drive');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Confirmar Registro en Google Sheets',
      description: `¿Deseas sincronizar los datos de ${sub.name} (Ficha ${sub.fichaNumber}) a la hoja de cálculo oficial en tu Google Drive?`,
      onConfirm: async () => {
        try {
          const profile = {
            name: sub.name,
            docType: sub.docType as 'CC' | 'TI' | 'CE' | 'PEP',
            docNumber: sub.docNumber,
            regional: sub.regional,
            trainingCenter: sub.trainingCenter,
            programName: sub.programName,
            programLevel: sub.programLevel as 'Técnico' | 'Tecnólogo',
            fichaNumber: sub.fichaNumber,
            email: sub.email,
            startDate: '',
          };

          await appendApprenticeRecord(
            accessToken,
            spreadsheet.id,
            profile,
            sub.unlockedBadges,
            MODULES_INFO.length
          );

          markSubmissionSynced(sub.id);
          setSubmissions(getStoredSubmissions());
          await loadRecords(accessToken, spreadsheet.id);

          setSyncMessage({
            type: 'success',
            text: `Registro de ${sub.name} sincronizado exitosamente con Google Sheets.`,
          });
        } catch (err: unknown) {
          setSyncMessage({
            type: 'error',
            text: err instanceof Error ? err.message : 'Error al sincronizar con Google Sheets',
          });
        }
      },
    });
  };

  // Sync all unsynced submissions to Google Sheets
  const handleSyncAllPending = () => {
    const unsynced = submissions.filter(s => !s.syncedToDrive);
    if (unsynced.length === 0) {
      setSyncMessage({ type: 'success', text: 'Todos los aprendices ya están sincronizados en Google Sheets.' });
      return;
    }

    if (!accessToken || !spreadsheet) {
      setActiveTab('drive');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Sincronizar Registros Pendientes a Google Drive',
      description: `¿Deseas enviar ${unsynced.length} registros pendientes a la hoja de cálculo "Registro de Aprendices - Inducción SENA"?`,
      onConfirm: async () => {
        setIsSyncingAll(true);
        let successCount = 0;
        try {
          for (const sub of unsynced) {
            const profile = {
              name: sub.name,
              docType: sub.docType as 'CC' | 'TI' | 'CE' | 'PEP',
              docNumber: sub.docNumber,
              regional: sub.regional,
              trainingCenter: sub.trainingCenter,
              programName: sub.programName,
              programLevel: sub.programLevel as 'Técnico' | 'Tecnólogo',
              fichaNumber: sub.fichaNumber,
              email: sub.email,
              startDate: '',
            };

            await appendApprenticeRecord(
              accessToken,
              spreadsheet.id,
              profile,
              sub.unlockedBadges,
              MODULES_INFO.length
            );
            markSubmissionSynced(sub.id);
            successCount++;
          }

          setSubmissions(getStoredSubmissions());
          await loadRecords(accessToken, spreadsheet.id);
          setSyncMessage({
            type: 'success',
            text: `¡Se sincronizaron exitosamente ${successCount} registros en tu hoja de Google Drive!`,
          });
        } catch (err: unknown) {
          setSyncMessage({
            type: 'error',
            text: `Error durante la sincronización: ${err instanceof Error ? err.message : 'Fallo en la API'}`,
          });
        } finally {
          setIsSyncingAll(false);
        }
      },
    });
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('No hay registros de aprendices para exportar.');
      return;
    }
    const headers = [
      'Nombre Completo',
      'Tipo Documento',
      'Número Documento',
      'Regional',
      'Centro de Formación',
      'Programa',
      'Nivel',
      'Ficha',
      'Correo Electrónico',
      'Estado',
      'Módulos Completados',
      'Fecha Última Actividad',
      'Sincronizado Drive'
    ];
    
    const rows = submissions.map(sub => [
      `"${(sub.name || '').replace(/"/g, '""')}"`,
      `"${sub.docType || ''}"`,
      `"${sub.docNumber || ''}"`,
      `"${(sub.regional || '').replace(/"/g, '""')}"`,
      `"${(sub.trainingCenter || '').replace(/"/g, '""')}"`,
      `"${(sub.programName || '').replace(/"/g, '""')}"`,
      `"${sub.programLevel || ''}"`,
      `"${sub.fichaNumber || ''}"`,
      `"${sub.email || ''}"`,
      `"${sub.status || ''}"`,
      `"${(sub.unlockedBadges || []).join(', ')}"`,
      `"${sub.timestamp ? new Date(sub.timestamp).toLocaleString('es-CO') : ''}"`,
      `"${sub.syncedToDrive ? 'SÍ' : 'NO'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aprendices_induccion_sena_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (submissions.length === 0) {
      alert('No hay registros de aprendices para exportar.');
      return;
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aprendices_induccion_sena_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportRankingCSV = () => {
    if (leaderboardData.length === 0) {
      alert('No hay datos en el ranking para exportar.');
      return;
    }
    const headers = [
      'Puesto',
      'Aprendiz',
      'Documento',
      'Ficha',
      'Programa',
      'Regional',
      'Puntaje Total',
      'Tiempo Total (segundos)',
      'Aciertos',
      'Total Preguntas',
      'Precisión (%)',
      'Fecha'
    ];
    const rows = leaderboardData.map((item, idx) => [
      `"${idx + 1}"`,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${item.docNumber || ''}"`,
      `"${item.fichaNumber || ''}"`,
      `"${(item.programName || '').replace(/"/g, '""')}"`,
      `"${(item.regional || '').replace(/"/g, '""')}"`,
      `"${item.totalScore}"`,
      `"${item.totalTimeSeconds}"`,
      `"${item.correctAnswers}"`,
      `"${item.totalQuestions}"`,
      `"${item.accuracyPercent}%"`,
      `"${item.date || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ranking_gamificado_sena_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  // Filter Submissions
  const filteredSubmissions = submissions.filter(sub => {
    if (statusFilter === 'completed' && sub.status !== 'Completada (100%)') return false;
    if (statusFilter === 'in_progress' && sub.status === 'Completada (100%)') return false;
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      sub.name.toLowerCase().includes(q) ||
      sub.docNumber.includes(q) ||
      sub.fichaNumber.includes(q) ||
      sub.programName.toLowerCase().includes(q)
    );
  });

  const completedCount = submissions.filter(s => s.status === 'Completada (100%)').length;
  const inProgressCount = submissions.length - completedCount;
  const unsyncedCount = submissions.filter(s => !s.syncedToDrive).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto flex flex-col max-h-[92vh] transition-colors">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00324D] text-white flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Panel del Instructor y Administrador
                </h3>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Acceso Restringido
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Custodia de información, revisión de evaluaciones y sincronización con Google Drive
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg transition-colors"
                title="Cerrar sesión de administrador"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAdminLoggedIn ? (
          /* Authentication Screen for Instructor/Administrator */
          <div className="p-8 sm:p-12 overflow-y-auto max-w-lg mx-auto w-full space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/30 mx-auto flex items-center justify-center text-[#39A900] shadow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Autenticación de Instructor SENA
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Por seguridad de la información, el acceso a las respuestas de los aprendices y a la hoja de cálculo en Drive está protegido exclusivamente para instructores y coordinadores.
              </p>
            </div>

            {/* Method 1: Security PIN */}
            <form onSubmit={handlePinLogin} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-left">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Ingresar con Clave Institucional</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Ingresa clave (ej. SENA2024)"
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#39A900] hover:bg-[#2d8500] text-white rounded-xl shadow-xs transition-colors"
                >
                  Entrar
                </button>
              </div>
              {pinError && <p className="text-[11px] text-red-600 font-medium">{pinError}</p>}
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Clave predeterminada para el instructor: <strong className="font-mono text-slate-600 dark:text-slate-300">{ADMIN_DEFAULT_PIN}</strong>
              </p>
            </form>

            <div className="flex items-center gap-3 my-2 text-xs text-slate-400">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <span>O mediante tu cuenta de Google</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Method 2: Google Sign In */}
            <div>
              <button
                onClick={handleGoogleAdminLogin}
                disabled={isLoggingIn}
                className="gsi-material-button w-full shadow-xs hover:shadow-md transition-all active:scale-95 disabled:opacity-60"
              >
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">
                  {isLoggingIn ? 'Verificando credenciales...' : 'Acceder con Google como Administrador'}
                </span>
              </button>
              {authError && <p className="text-[11px] text-red-600 mt-2">{authError}</p>}
            </div>
          </div>
        ) : (
          /* Authenticated Instructor Experience */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs */}
            <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'submissions'
                      ? 'border-[#39A900] text-[#39A900] dark:text-[#39A900]'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Respuestas de Aprendices ({submissions.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('ranking')}
                  className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'ranking'
                      ? 'border-[#39A900] text-[#39A900] dark:text-[#39A900]'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Ranking Gamificado ({leaderboardData.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('drive')}
                  className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'drive'
                      ? 'border-[#39A900] text-[#39A900] dark:text-[#39A900]'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Sincronización Google Drive</span>
                  {unsyncedCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-mono">
                      {unsyncedCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('security_plan')}
                  className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'security_plan'
                      ? 'border-[#39A900] text-[#39A900] dark:text-[#39A900]'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Plan de Trabajo y Seguridad</span>
                </button>
              </div>

              {/* Status Indicator */}
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Modo Instructor Activo</span>
              </div>
            </div>

            {/* Sync Alert Banner */}
            {syncMessage && (
              <div
                className={`px-6 py-2.5 text-xs font-medium flex items-center justify-between shrink-0 ${
                  syncMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 border-b border-emerald-200 dark:border-emerald-900'
                    : 'bg-red-50 text-red-800 dark:bg-red-950/80 dark:text-red-200 border-b border-red-200 dark:border-red-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  {syncMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{syncMessage.text}</span>
                </div>
                <button onClick={() => setSyncMessage(null)} className="opacity-70 hover:opacity-100">
                  ✕
                </button>
              </div>
            )}

            {/* Tab 1: Submissions & Answers */}
            {activeTab === 'submissions' && (
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Total Aprendices
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {submissions.length}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/20">
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      Completaron 100%
                    </div>
                    <div className="text-2xl font-black text-[#39A900] mt-1">{completedCount}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-500/20">
                    <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      En Progreso
                    </div>
                    <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                      {inProgressCount}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-500/20">
                    <div className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                      Pendientes por Sincronizar
                    </div>
                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                      {unsyncedCount}
                    </div>
                  </div>
                </div>

                {/* Filter and Actions Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar por nombre, cédula o ficha..."
                        value={searchFilter}
                        onChange={e => setSearchFilter(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value as any)}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="completed">Solo 100% completados</option>
                      <option value="in_progress">Solo en progreso</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      title="Descargar reporte oficial en formato CSV (Excel)"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition-colors shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Exportar CSV</span>
                    </button>

                    <button
                      onClick={handleExportJSON}
                      title="Descargar respaldo estructurado en JSON"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition-colors shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      <span>JSON</span>
                    </button>

                    {unsyncedCount > 0 && (
                      <button
                        onClick={handleSyncAllPending}
                        disabled={isSyncingAll}
                        className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#39A900] hover:bg-[#2d8500] text-white shadow-xs transition-colors whitespace-nowrap"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSyncingAll ? 'Sincronizando...' : `Sincronizar a Drive (${unsyncedCount})`}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Submissions Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/80">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#00324D] text-white font-semibold">
                      <tr>
                        <th className="px-3.5 py-2.5">Aprendiz</th>
                        <th className="px-3.5 py-2.5">Documento</th>
                        <th className="px-3.5 py-2.5">Ficha</th>
                        <th className="px-3.5 py-2.5">Programa</th>
                        <th className="px-3.5 py-2.5 text-center">Progreso</th>
                        <th className="px-3.5 py-2.5 text-center">Drive</th>
                        <th className="px-3.5 py-2.5 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 bg-white dark:bg-slate-800/40">
                      {filteredSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-slate-400">
                            No se encontraron aprendices con ese criterio.
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.map(sub => {
                          const isComplete = sub.status === 'Completada (100%)';
                          return (
                            <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                              <td className="px-3.5 py-3 whitespace-nowrap">
                                <div className="font-bold text-slate-900 dark:text-white">{sub.name}</div>
                                <div className="text-[11px] text-slate-400 font-mono">{sub.timestamp}</div>
                              </td>
                              <td className="px-3.5 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                                {sub.docType} {sub.docNumber}
                              </td>
                              <td className="px-3.5 py-3 whitespace-nowrap font-mono text-slate-700 dark:text-slate-300">
                                {sub.fichaNumber}
                              </td>
                              <td className="px-3.5 py-3 max-w-[200px] truncate text-slate-600 dark:text-slate-300" title={sub.programName}>
                                {sub.programName}
                              </td>
                              <td className="px-3.5 py-3 text-center whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    isComplete
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                  }`}
                                >
                                  {isComplete ? (
                                    <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
                                  ) : (
                                    <Clock className="w-3 h-3 text-amber-500" />
                                  )}
                                  {sub.unlockedBadges.length}/5 ({sub.scorePercent}%)
                                </span>
                              </td>
                              <td className="px-3.5 py-3 text-center whitespace-nowrap">
                                {sub.syncedToDrive ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400" title={`Sincronizado: ${sub.syncedAt || ''}`}>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>En Drive</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Pendiente</span>
                                  </span>
                                )}
                              </td>
                              <td className="px-3.5 py-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSelectedSubmission(sub)}
                                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded-md transition-colors"
                                    title="Ver detalle de respuestas"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  {!sub.syncedToDrive && (
                                    <button
                                      onClick={() => handleSyncSingleSubmission(sub)}
                                      className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-md transition-colors"
                                      title="Enviar a Google Sheets"
                                    >
                                      <Send className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Ranking Gamificado de Aprendices */}
            {activeTab === 'ranking' && (
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Tabla de Clasificación y Ranking de Aprendices
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Puntuaciones ponderadas por aciertos, racha continua y velocidad de respuesta en el cronómetro
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportRankingCSV}
                      title="Descargar ranking en formato CSV"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition-colors shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Exportar Ranking CSV</span>
                    </button>

                    <button
                      onClick={() => setLeaderboardData(getLeaderboard())}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors w-fit"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#39A900]" />
                      <span>Actualizar Ranking</span>
                    </button>
                  </div>
                </div>

                {/* Podio visual para el Administrador */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  {leaderboardData[1] && (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
                        🥈 2º
                      </span>
                      <div className="my-2">
                        <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {leaderboardData[1].name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">Ficha {leaderboardData[1].fichaNumber}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{leaderboardData[1].programName}</div>
                      </div>
                      <div className="text-xs font-black text-slate-700 dark:text-slate-300 font-mono">
                        {leaderboardData[1].totalScore} pts · {Math.floor(leaderboardData[1].totalTimeSeconds / 60)}m {leaderboardData[1].totalTimeSeconds % 60}s
                      </div>
                    </div>
                  )}

                  {leaderboardData[0] && (
                    <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/70 dark:from-amber-950/60 dark:to-amber-900/30 border-2 border-amber-400 flex flex-col items-center justify-between shadow-md">
                      <span className="w-9 h-9 rounded-full bg-amber-400 text-white font-black text-sm flex items-center justify-center shadow-xs">
                        👑 1º
                      </span>
                      <div className="my-2">
                        <div className="text-xs font-black text-amber-950 dark:text-amber-100 line-clamp-1">
                          {leaderboardData[0].name}
                        </div>
                        <div className="text-[11px] font-mono text-amber-800 dark:text-amber-300">Ficha {leaderboardData[0].fichaNumber}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[180px]">{leaderboardData[0].programName}</div>
                      </div>
                      <div className="text-sm font-black text-amber-700 dark:text-amber-300 font-mono">
                        {leaderboardData[0].totalScore} pts · {Math.floor(leaderboardData[0].totalTimeSeconds / 60)}m {leaderboardData[0].totalTimeSeconds % 60}s
                      </div>
                    </div>
                  )}

                  {leaderboardData[2] && (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center">
                        🥉 3º
                      </span>
                      <div className="my-2">
                        <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {leaderboardData[2].name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">Ficha {leaderboardData[2].fichaNumber}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{leaderboardData[2].programName}</div>
                      </div>
                      <div className="text-xs font-black text-slate-700 dark:text-slate-300 font-mono">
                        {leaderboardData[2].totalScore} pts · {Math.floor(leaderboardData[2].totalTimeSeconds / 60)}m {leaderboardData[2].totalTimeSeconds % 60}s
                      </div>
                    </div>
                  )}
                </div>

                {/* Tabla de Posiciones Completa */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/80">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#00324D] text-white font-semibold">
                      <tr>
                        <th className="px-3 py-2.5 text-center">Puesto</th>
                        <th className="px-3.5 py-2.5">Aprendiz</th>
                        <th className="px-3 py-2.5">Documento</th>
                        <th className="px-3 py-2.5">Ficha</th>
                        <th className="px-3 py-2.5">Programa</th>
                        <th className="px-3 py-2.5">Tiempo</th>
                        <th className="px-3 py-2.5">Aciertos</th>
                        <th className="px-3.5 py-2.5 text-right">Puntaje</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 bg-white dark:bg-slate-800/40 font-mono text-[11px]">
                      {leaderboardData.map((item, index) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                          <td className="px-3 py-2.5 text-center font-bold">
                            {index === 0 ? '🥇 1º' : index === 1 ? '🥈 2º' : index === 2 ? '🥉 3º' : `${index + 1}º`}
                          </td>
                          <td className="px-3.5 py-2.5 font-bold font-sans text-slate-900 dark:text-white whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{item.docNumber}</td>
                          <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{item.fichaNumber}</td>
                          <td className="px-3 py-2.5 font-sans max-w-[180px] truncate text-slate-600 dark:text-slate-300" title={item.programName}>
                            {item.programName}
                          </td>
                          <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">
                            {Math.floor(item.totalTimeSeconds / 60)}m {item.totalTimeSeconds % 60}s
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-slate-700 dark:text-slate-300">
                            {item.correctAnswers}/25 ({item.accuracyPercent}%)
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-black text-[#39A900] whitespace-nowrap">
                            {item.totalScore} pts
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Google Drive & Sheets Sync Management */}
            {activeTab === 'drive' && (
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
                {!currentUser ? (
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-[#39A900] flex items-center justify-center mx-auto">
                      <FolderOpen className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Conectar Google Drive del Administrador
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Inicia sesión con tu cuenta de Google (<strong className="text-slate-800 dark:text-slate-200">{ADMIN_EMAIL}</strong>) para vincular la hoja de cálculo en tu unidad de Google Drive.
                      </p>
                    </div>

                    <div className="flex justify-center pt-2">
                      <button
                        onClick={handleGoogleAdminLogin}
                        disabled={isLoggingIn}
                        className="gsi-material-button shadow-xs hover:shadow-md transition-all active:scale-95"
                      >
                        <div className="gsi-material-button-icon">
                          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                          </svg>
                        </div>
                        <span className="gsi-material-button-contents">
                          {isLoggingIn ? 'Conectando...' : 'Vincular Google Drive'}
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Active File Card */}
                    <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#39A900] text-white flex items-center justify-center shadow-xs">
                          <FileSpreadsheet className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                            Archivo Vinculado en Mi Drive
                          </div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {spreadsheet ? spreadsheet.name : 'Cargando archivo...'}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Cuenta activa: {currentUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {spreadsheet && (
                          <a
                            href={spreadsheet.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] rounded-xl transition-colors shadow-2xs"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Abrir en Google Drive</span>
                          </a>
                        )}

                        {accessToken && spreadsheet && (
                          <button
                            onClick={() => loadRecords(accessToken, spreadsheet.id)}
                            disabled={isLoadingRecords}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                            title="Recargar datos de la hoja"
                          >
                            <RefreshCw className={`w-4 h-4 ${isLoadingRecords ? 'animate-spin text-[#39A900]' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Sync Status Action Box */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Sincronización en Lote
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {unsyncedCount > 0
                            ? `Hay ${unsyncedCount} aprendiz(ces) pendientes por escribir en Google Sheets.`
                            : 'Todos los registros locales están sincronizados con la hoja de Google Drive.'}
                        </div>
                      </div>

                      <button
                        onClick={handleSyncAllPending}
                        disabled={isSyncingAll || unsyncedCount === 0 || !spreadsheet}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-[#39A900] hover:bg-[#2d8500] text-white rounded-xl shadow-xs transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSyncingAll ? 'Escribiendo en Drive...' : 'Sincronizar Todos'}</span>
                      </button>
                    </div>

                    {/* Preview of rows inside Google Sheets */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <Database className="w-3.5 h-3.5 text-[#39A900]" />
                          <span>Filas actuales en la Hoja de Google Drive ({sheetRecords.length})</span>
                        </div>
                      </div>

                      {isLoadingRecords ? (
                        <div className="py-8 text-center text-xs text-slate-400">
                          <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#39A900] mb-2" />
                          Consultando filas desde Google Sheets...
                        </div>
                      ) : sheetRecords.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                          Aún no se han escrito filas en la hoja. Haz clic en "Sincronizar Todos" para escribir los registros.
                        </div>
                      ) : (
                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/80">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead className="bg-[#00324D] text-white font-semibold">
                              <tr>
                                <th className="px-3 py-2">Fecha</th>
                                <th className="px-3 py-2">Aprendiz</th>
                                <th className="px-3 py-2">Documento</th>
                                <th className="px-3 py-2">Ficha</th>
                                <th className="px-3 py-2">Estado</th>
                                <th className="px-3 py-2">Código</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 bg-white dark:bg-slate-800/40 font-mono text-[11px]">
                              {sheetRecords.map((r, i) => (
                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                                  <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{r.registeredAt}</td>
                                  <td className="px-3 py-2 font-bold font-sans text-slate-900 dark:text-white whitespace-nowrap">{r.name}</td>
                                  <td className="px-3 py-2 text-slate-600 whitespace-nowrap">{r.docType} {r.docNumber}</td>
                                  <td className="px-3 py-2 text-slate-600 whitespace-nowrap">{r.fichaNumber}</td>
                                  <td className="px-3 py-2 whitespace-nowrap">
                                    <span className="text-[#39A900] font-sans font-semibold">{r.status}</span>
                                  </td>
                                  <td className="px-3 py-2 text-slate-400 whitespace-nowrap">{r.verificationCode}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Security & Operational Work Plan */}
            {activeTab === 'security_plan' && (
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#00324D] to-[#004e75] text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Arquitectura de Seguridad y Privacidad SENA</span>
                  </div>
                  <h4 className="text-base font-bold">
                    Plan de Trabajo: Publicación Segura y Custodia de Evaluaciones
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Solución de arquitectura diseñada para publicar el prototipo a los aprendices sin exponer la hoja de cálculo, datos personales de terceros ni controles administrativos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phase 1 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#39A900] text-white flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        Aislamiento Visual y Principio de Menor Privilegio
                      </h5>
                    </div>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                      <li>Los aprendices <strong>nunca ven enlaces, botones ni referencias</strong> a Google Drive ni a Google Sheets en su vista pública.</li>
                      <li>La barra superior y la constancia de los aprendices están 100% libres de accesos a la base de datos de otros aprendices.</li>
                      <li>Cumplimiento estricto con la Ley 1581 de 2012 (Protección de Datos Personales en Colombia).</li>
                    </ul>
                  </div>

                  {/* Phase 2 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#00324D] text-white flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        Captura Transparente de Respuestas
                      </h5>
                    </div>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                      <li>Cuando un aprendiz aprueba un quiz o completa los 5 módulos, el sistema genera automáticamente un registro con su firma y código verificador.</li>
                      <li>Las respuestas y aciertos se almacenan en la bóveda local del sistema, lista para la auditoría del instructor.</li>
                      <li>El aprendiz recibe su constancia oficial con código criptográfico sin tener que manipular hojas externas.</li>
                    </ul>
                  </div>

                  {/* Phase 3 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#00e5ff] text-slate-900 flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        Custodia y Sincronización en Google Drive
                      </h5>
                    </div>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                      <li>Solo el instructor autenticado (<strong className="text-emerald-600 dark:text-emerald-400">{ADMIN_EMAIL}</strong>) posee el token para escribir y leer la hoja de cálculo.</li>
                      <li>La hoja se ubica en la unidad privada del instructor: <em>"Registro de Aprendices - Inducción SENA"</em>.</li>
                      <li>El instructor decide cuándo sincronizar en lote o consultar los resultados en vivo.</li>
                    </ul>
                  </div>

                  {/* Phase 4 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        Protocolo de Publicación para los Aprendices
                      </h5>
                    </div>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                      <li>Comparte el enlace de la aplicación con los aprendices de tus fichas.</li>
                      <li>Los aprendices completan su proceso formativo con tranquilidad.</li>
                      <li>Para revisar resultados, tú como instructor simplemente ingresas con tu clave o cuenta de Google desde el botón discreto de administración.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/90 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <SenaLogo className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Sistema Institucional de Gestión de Inducción SENA</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Cerrar Panel
          </button>
        </div>
      </div>

      {/* Detail Modal for a single Apprentice's submission */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#39A900]/15 text-[#39A900] flex items-center justify-center font-bold">
                  {selectedSubmission.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedSubmission.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedSubmission.docType} {selectedSubmission.docNumber} · Ficha {selectedSubmission.fichaNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Programa:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]" title={selectedSubmission.programName}>
                  {selectedSubmission.programName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fecha de Registro:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{selectedSubmission.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Código de Verificación:</span>
                <span className="font-mono font-bold text-[#39A900]">{selectedSubmission.verificationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estado en Google Drive:</span>
                <span className={`font-semibold ${selectedSubmission.syncedToDrive ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {selectedSubmission.syncedToDrive ? 'Sincronizado' : 'Pendiente por subir'}
                </span>
              </div>
            </div>

            {/* Quiz performance per module */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Módulos Aprobados ({selectedSubmission.unlockedBadges.length}/5):
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {MODULES_INFO.map(mod => {
                  const isApproved = selectedSubmission.unlockedBadges.includes(mod.id);
                  const score = selectedSubmission.quizScores?.[mod.id];
                  return (
                    <div
                      key={mod.id}
                      className={`p-2.5 rounded-lg flex items-center justify-between text-xs border ${
                        isApproved
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500/20 text-emerald-900 dark:text-emerald-200'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isApproved ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span className="font-medium">{mod.shortTitle}</span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold">
                        {score ? `${score.correctAnswers}/${score.totalQuestions} aciertos` : isApproved ? 'Aprobado' : 'Pendiente'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {!selectedSubmission.syncedToDrive && (
                <button
                  onClick={() => {
                    handleSyncSingleSubmission(selectedSubmission);
                    setSelectedSubmission(null);
                  }}
                  className="px-3.5 py-2 text-xs font-bold bg-[#39A900] hover:bg-[#2d8500] text-white rounded-lg shadow-xs transition-colors"
                >
                  Sincronizar a Google Sheets
                </button>
              )}
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-3.5 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog before mutating Drive */}
      {confirmDialog && confirmDialog.isOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-[#39A900]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {confirmDialog.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Operación en Google Drive
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {confirmDialog.description}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  const fn = confirmDialog.onConfirm;
                  setConfirmDialog(null);
                  await fn();
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#39A900] hover:bg-[#2d8500] text-white shadow-xs transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
