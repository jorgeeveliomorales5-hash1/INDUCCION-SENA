import React from 'react';
import { ModuleId } from '../types/induction';
import { Award, UserCheck, FileText, Sun, Moon, Shield, Trophy } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface HeaderProps {
  currentModule: ModuleId;
  onSelectModule: (mod: ModuleId) => void;
  onOpenProfile: () => void;
  onOpenCertificate: () => void;
  onOpenUnifiedEvaluation?: () => void;
  onOpenAdminDashboard?: () => void;
  progressPercent: number;
  badgesCount: number;
  totalBadges: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentModule,
  onSelectModule,
  onOpenProfile,
  onOpenCertificate,
  onOpenUnifiedEvaluation,
  onOpenAdminDashboard,
  progressPercent,
  badgesCount,
  totalBadges,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[5.25rem] py-2 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark with enlarged logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectModule('identidad')}
            className="flex items-center gap-3.5 text-left group transition-transform active:scale-95"
            title="Inicio - Inducción SENA"
          >
            <div className="w-[74px] h-[74px] p-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-xs group-hover:border-[#39A900] group-hover:shadow-md transition-all">
              <SenaLogo className="w-[66px] h-[66px] text-[#39A900]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 dark:text-white tracking-tight group-hover:text-[#39A900] dark:group-hover:text-[#39A900] transition-colors leading-none text-xl sm:text-2xl">
                SENA
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase leading-tight mt-0.5">
                Inducción
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectModule('identidad')}
            className={`transition-colors whitespace-nowrap ${
              currentModule === 'identidad'
                ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900] pb-0.5'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            01. Identidad
          </button>
          <button
            onClick={() => onSelectModule('formacion')}
            className={`transition-colors whitespace-nowrap ${
              currentModule === 'formacion'
                ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900] pb-0.5'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            02. Formación FPI
          </button>
          <button
            onClick={() => onSelectModule('reglamento')}
            className={`transition-colors whitespace-nowrap ${
              currentModule === 'reglamento'
                ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900] pb-0.5'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            03. Reglamento
          </button>
          <button
            onClick={() => onSelectModule('bienestar')}
            className={`transition-colors whitespace-nowrap ${
              currentModule === 'bienestar'
                ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900] pb-0.5'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            04. Bienestar
          </button>
          <button
            onClick={() => onSelectModule('innovacion')}
            className={`transition-colors whitespace-nowrap ${
              currentModule === 'innovacion'
                ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900] pb-0.5'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            05. SENNOVA
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + Dark Mode Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenProfile}
            title="Ver o editar ficha de aprendiz"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span className="hidden sm:inline">Mi Perfil</span>
          </button>

          {onOpenUnifiedEvaluation && (
            <button
              onClick={onOpenUnifiedEvaluation}
              title="Gran Evaluación del Reglamento (25 Preguntas · Cronómetro · Ranking)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-400/40 rounded-md transition-all shadow-2xs whitespace-nowrap"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Evaluación & Ranking</span>
            </button>
          )}

          <button
            onClick={onOpenCertificate}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all shadow-sm whitespace-nowrap ${
              progressPercent === 100
                ? 'bg-[#39A900] hover:bg-[#2d8500] text-white ring-2 ring-[#39A900]/30'
                : 'bg-[#00324D] dark:bg-emerald-950 dark:border dark:border-[#39A900]/40 hover:bg-[#002235] text-white'
            }`}
          >
            {progressPercent === 100 ? (
              <Award className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <FileText className="w-3.5 h-3.5" />
            )}
            <span>Certificado</span>
            <span className="text-[11px] font-mono opacity-90 ml-0.5">
              ({badgesCount}/{totalBadges})
            </span>
          </button>

          {/* Discreet Instructor / Admin Security Access */}
          {onOpenAdminDashboard && (
            <button
              onClick={onOpenAdminDashboard}
              title="Acceso Instructor / Administrador"
              aria-label="Acceso Instructor"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Shield className="w-4 h-4" />
            </button>
          )}

          {/* Dark Mode Toggle Button on Top Right */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            aria-label={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-all duration-300 shadow-2xs whitespace-nowrap bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline text-xs font-semibold text-slate-200">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="hidden sm:inline text-xs font-semibold text-slate-700">Oscuro</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

