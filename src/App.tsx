import React, { useState, useEffect } from 'react';
import { ModuleId, ApprenticeProfile } from './types/induction';
import { DEFAULT_APPRENTICE, BADGES_LIST, MODULES_INFO } from './data/senaData';
import { Header } from './components/Header';
import { ApprenticeHeaderCard } from './components/ApprenticeHeaderCard';
import { ModuleIdentidad } from './components/ModuleIdentidad';
import { ModuleFormacion } from './components/ModuleFormacion';
import { ModuleReglamento } from './components/ModuleReglamento';
import { ModuleBienestar } from './components/ModuleBienestar';
import { ModuleInnovacion } from './components/ModuleInnovacion';
import { ModuleQuizModal } from './components/ModuleQuizModal';
import { CertificateView } from './components/CertificateView';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { UnifiedReglamentoEvaluationModal } from './components/UnifiedReglamentoEvaluationModal';
import { recordApprenticeSubmission } from './utils/submissionsManager';
import { SenaLogo } from './components/SenaLogo';
import { Sun, Moon, Shield } from 'lucide-react';

export default function App() {
  // Dark mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sena_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Blur transition trigger state
  const [isBlurTransitioning, setIsBlurTransitioning] = useState(false);
  const [themeNotification, setThemeNotification] = useState<string | null>(null);

  // Sync dark class on <html> document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('sena_dark_mode', String(isDarkMode));
    } catch {
      // Ignore
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    // Trigger smooth optical blur transition effect
    setIsBlurTransitioning(true);
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    setThemeNotification(nextMode ? 'Modo Oscuro activado' : 'Modo Claro activado');

    window.setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 500);

    window.setTimeout(() => {
      setThemeNotification(null);
    }, 2400);
  };

  // Persistence in localStorage
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentice_profile');
      return saved ? JSON.parse(saved) : DEFAULT_APPRENTICE;
    } catch {
      return DEFAULT_APPRENTICE;
    }
  });

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sena_unlocked_badges');
      return saved ? JSON.parse(saved) : ['identidad']; // start with first badge or none
    } catch {
      return ['identidad'];
    }
  });

  const [activeModule, setActiveModule] = useState<ModuleId>('identidad');
  const [quizModule, setQuizModule] = useState<ModuleId | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showUnifiedEvaluationModal, setShowUnifiedEvaluationModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
    } catch {
      // Ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_unlocked_badges', JSON.stringify(unlockedBadges));
    } catch {
      // Ignore
    }
  }, [unlockedBadges]);

  const handleModuleQuizPassed = (modId: ModuleId) => {
    const updated = unlockedBadges.includes(modId) ? unlockedBadges : [...unlockedBadges, modId];
    if (!unlockedBadges.includes(modId)) {
      setUnlockedBadges(updated);
    }
    // Record submission quietly for the instructor
    recordApprenticeSubmission(profile, updated, {
      moduleId: modId,
      correctCount: 4,
      total: 4,
    });
  };

  const handleSaveProfile = (newProfile: ApprenticeProfile) => {
    setProfile(newProfile);
    recordApprenticeSubmission(newProfile, unlockedBadges);
  };

  const progressPercent = Math.round((unlockedBadges.length / MODULES_INFO.length) * 100);

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#0e1329] text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-[#39A900] selection:text-white transition-colors duration-300 relative ${
      isBlurTransitioning ? 'theme-blur-active' : ''
    }`}>
      {/* Fullscreen Blur Flash Overlay on Theme Change */}
      {isBlurTransitioning && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none theme-overlay-flash bg-slate-900/10 dark:bg-black/20"
        />
      )}

      {/* Floating Theme Toast Notification */}
      {themeNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-100/95 text-white dark:text-slate-900 text-xs font-semibold shadow-xl backdrop-blur-md animate-fadeIn">
          {isDarkMode ? (
            <Moon className="w-4 h-4 text-emerald-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          <span>{themeNotification}</span>
        </div>
      )}

      {/* Top Bar Navigation with Dark Mode button */}
      <Header
        currentModule={activeModule}
        onSelectModule={setActiveModule}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenCertificate={() => setShowCertificate(true)}
        onOpenUnifiedEvaluation={() => setShowUnifiedEvaluationModal(true)}
        onOpenAdminDashboard={() => setShowAdminModal(true)}
        progressPercent={progressPercent}
        badgesCount={unlockedBadges.length}
        totalBadges={MODULES_INFO.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Learner Context & Navigation Strip */}
      <ApprenticeHeaderCard
        profile={profile}
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        unlockedBadges={unlockedBadges}
        badgesList={BADGES_LIST}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenCertificate={() => setShowCertificate(true)}
        onOpenUnifiedEvaluation={() => setShowUnifiedEvaluationModal(true)}
        onStartQuiz={(mId) => setQuizModule(mId)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
        {activeModule === 'identidad' && (
          <ModuleIdentidad
            onStartQuiz={() => setQuizModule('identidad')}
            isCompleted={unlockedBadges.includes('identidad')}
          />
        )}

        {activeModule === 'formacion' && (
          <ModuleFormacion
            onStartQuiz={() => setQuizModule('formacion')}
            isCompleted={unlockedBadges.includes('formacion')}
          />
        )}

        {activeModule === 'reglamento' && (
          <ModuleReglamento
            onStartQuiz={() => setQuizModule('reglamento')}
            onStartUnifiedEvaluation={() => setShowUnifiedEvaluationModal(true)}
            isCompleted={unlockedBadges.includes('reglamento')}
          />
        )}

        {activeModule === 'bienestar' && (
          <ModuleBienestar
            onStartQuiz={() => setQuizModule('bienestar')}
            isCompleted={unlockedBadges.includes('bienestar')}
          />
        )}

        {activeModule === 'innovacion' && (
          <ModuleInnovacion
            onStartQuiz={() => setQuizModule('innovacion')}
            isCompleted={unlockedBadges.includes('innovacion')}
          />
        )}
      </main>

      {/* Institutional Quiet Footer */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <SenaLogo className="w-4 h-4 text-[#39A900] shrink-0" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">Servicio Nacional de Aprendizaje SENA</span>
            <span aria-hidden="true">·</span>
            <span>Entidad Pública Tripartita de Colombia</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCertificate(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Generar Constancia
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowProfileModal(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Ficha del Aprendiz
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowAdminModal(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors flex items-center gap-1"
              title="Acceso exclusivo para el instructor o administrador"
            >
              <Shield className="w-3 h-3 text-[#39A900]" />
              <span>Acceso Instructor</span>
            </button>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400 dark:text-slate-500">Acuerdo 0009 de 2024</span>
          </div>
        </div>
      </footer>

      {/* Quiz Modal */}
      {quizModule && (
        <ModuleQuizModal
          moduleId={quizModule}
          onClose={() => setQuizModule(null)}
          onPassed={handleModuleQuizPassed}
        />
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateView
          profile={profile}
          unlockedBadges={unlockedBadges}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Apprentice Profile Modal */}
      {showProfileModal && (
        <ApprenticeProfileModal
          initialProfile={profile}
          onSave={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Admin and Instructor Protected Dashboard Modal */}
      <AdminDashboardModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />

      {/* Unified Gamified Reglamento Evaluation with Chronometer and Ranking */}
      <UnifiedReglamentoEvaluationModal
        initialProfile={profile}
        isOpen={showUnifiedEvaluationModal}
        onClose={() => setShowUnifiedEvaluationModal(false)}
        onComplete={(updatedProfile, scorePercent) => {
          setProfile(updatedProfile);
          if (!unlockedBadges.includes('reglamento')) {
            setUnlockedBadges(prev => [...prev, 'reglamento']);
          }
        }}
      />
    </div>
  );
}

