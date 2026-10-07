import React, { useState } from 'react';
import { ApprenticeProfile, ModuleId, Badge } from '../types/induction';
import { MODULES_INFO } from '../data/senaData';
import { Award, CheckCircle2, BookOpen, Edit3, Activity, ChevronDown, ChevronUp, Sparkles, Trophy } from 'lucide-react';
import { InductionTelemetryDashboard } from './InductionTelemetryDashboard';

interface ApprenticeHeaderCardProps {
  profile: ApprenticeProfile;
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  unlockedBadges: string[];
  badgesList: Badge[];
  onOpenProfile: () => void;
  onOpenCertificate: () => void;
  onOpenUnifiedEvaluation?: () => void;
  onStartQuiz: (modId: ModuleId) => void;
}

export const ApprenticeHeaderCard: React.FC<ApprenticeHeaderCardProps> = ({
  profile,
  activeModule,
  onSelectModule,
  unlockedBadges,
  badgesList,
  onOpenProfile,
  onOpenCertificate,
  onOpenUnifiedEvaluation,
  onStartQuiz,
}) => {
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(true);
  const completedCount = unlockedBadges.length;
  const totalCount = MODULES_INFO.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Learner Context Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#39A900]/10 border border-[#39A900]/30 flex items-center justify-center text-[#39A900] font-bold text-base shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {profile.name}
                </h1>
                <button
                  onClick={onOpenProfile}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-0.5"
                  title="Editar datos de formación"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">{profile.programLevel} en {profile.programName}</span>
                <span aria-hidden="true">·</span>
                <span>Ficha {profile.fichaNumber}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate max-w-[260px]">{profile.trainingCenter}</span>
              </div>
            </div>
          </div>

          {/* Progress summary & Badges with UI Kit Inspiration button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Reto Gamificado Button */}
            {onOpenUnifiedEvaluation && (
              <button
                onClick={onOpenUnifiedEvaluation}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-400/30 hover:bg-amber-500/20 active:scale-95"
                title="Presentar el Gran Reto Gamificado del Reglamento (25 Preguntas)"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline">Reto Reglamento</span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-200">25Q</span>
              </button>
            )}

            {/* Toggle Button for Telemetry Dashboard */}
            <button
              onClick={() => setIsTelemetryOpen(!isTelemetryOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs bg-[#121836] text-[#00e5ff] border border-cyan-500/40 hover:bg-[#18214a] hover:shadow-[0_0_12px_rgba(0,229,255,0.4)]"
              title="Alternar vista del Panel de Telemetría e Indicadores"
            >
              <Activity className="w-4 h-4 text-[#00e5ff] animate-pulse" />
              <span>{isTelemetryOpen ? 'Ocultar Telemetría' : 'Panel de Telemetría'}</span>
              {isTelemetryOpen ? (
                <ChevronUp className="w-3.5 h-3.5 opacity-80" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              )}
            </button>

            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 rounded-xl p-3 shrink-0">
              <div className="space-y-1 min-w-[130px]">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-medium">Progreso Global</span>
                  <span className="font-mono font-bold text-[#00e5ff] dark:text-[#00e5ff]">{progressPercent}%</span>
                </div>
                {/* Luminous Capsule Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-cyan-500/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#39A900] via-[#00e5ff] to-[#38bdf8] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-400">
                  {completedCount} de {totalCount} insignias logradas
                </p>
              </div>

              <div className="h-9 w-px bg-slate-200 dark:bg-slate-700" />

              <div className="flex items-center gap-1.5">
                {badgesList.map((badge) => {
                  const isUnlocked = unlockedBadges.includes(badge.moduleId);
                  return (
                    <button
                      key={badge.id}
                      onClick={() => {
                        onSelectModule(badge.moduleId);
                      }}
                      title={`${badge.name}: ${isUnlocked ? 'Obtenida' : 'Pendiente por evaluar'}`}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-[#39A900] to-[#00b4d8] text-white shadow-sm ring-2 ring-cyan-400/40'
                          : 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-400 dark:text-slate-500 hover:bg-slate-300/80 dark:hover:bg-slate-600'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modular Tabs Navigator */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {MODULES_INFO.map((mod) => {
            const isCompleted = unlockedBadges.includes(mod.id);
            const isActive = activeModule === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#121836] text-[#00e5ff] border border-cyan-500/50 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                    : 'bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="font-mono text-[11px] opacity-75">{mod.number}</span>
                <span>{mod.shortTitle}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5ff]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Telemetry Dashboard (Inspired by the uploaded UI Kit Image) */}
        {isTelemetryOpen && (
          <div className="mt-5 animate-fadeIn">
            <InductionTelemetryDashboard
              profile={profile}
              unlockedBadges={unlockedBadges}
              activeModule={activeModule}
              onSelectModule={onSelectModule}
              onStartQuiz={onStartQuiz}
            />
          </div>
        )}
      </div>
    </div>
  );
};
