import React, { useState } from 'react';
import { ApprenticeProfile, ModuleId } from '../types/induction';
import { MODULES_INFO } from '../data/senaData';
import { Award, ChevronRight, Activity, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface InductionTelemetryDashboardProps {
  profile: ApprenticeProfile;
  unlockedBadges: string[];
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  onStartQuiz: (id: ModuleId) => void;
}

export const InductionTelemetryDashboard: React.FC<InductionTelemetryDashboardProps> = ({
  profile,
  unlockedBadges,
  activeModule,
  onSelectModule,
  onStartQuiz,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('global');

  // Calculate real progress percentages based on apprentice data
  const totalModules = MODULES_INFO.length;
  const completedModules = unlockedBadges.length;
  const globalProgress = Math.round((completedModules / totalModules) * 100);

  // Per-module values
  const getModulePercent = (modId: ModuleId) => {
    return unlockedBadges.includes(modId) ? 100 : modId === activeModule ? 45 : 15;
  };

  const moduleGauges = [
    { id: 'identidad' as ModuleId, label: 'Identidad SENA', percent: getModulePercent('identidad') },
    { id: 'formacion' as ModuleId, label: 'Pedagogía FPI', percent: getModulePercent('formacion') },
    { id: 'reglamento' as ModuleId, label: 'Reglamento 2024', percent: getModulePercent('reglamento') },
    { id: 'bienestar' as ModuleId, label: 'Bienestar Integral', percent: getModulePercent('bienestar') },
    { id: 'innovacion' as ModuleId, label: 'SENNOVA Tech', percent: getModulePercent('innovacion') },
  ];

  // Competency maturity scores (100 to 150 scale as shown in the UI kit image)
  const maturityLevels = [
    { name: 'Saber', score: unlockedBadges.length >= 2 ? 145 : 115, max: 150, color: 'from-[#39A900] to-[#00e5ff]' },
    { name: 'Saber Hacer', score: unlockedBadges.length >= 3 ? 140 : 110, max: 150, color: 'from-[#00b4d8] to-[#0072CE]' },
    { name: 'Saber Ser', score: unlockedBadges.length >= 1 ? 150 : 120, max: 150, color: 'from-[#00e5ff] to-[#39A900]' },
    { name: 'SENNOVA', score: unlockedBadges.includes('innovacion') ? 148 : 105, max: 150, color: 'from-[#38bdf8] to-[#6366f1]' },
  ];

  // SVG circular gauge geometry
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-[#121836] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-cyan-500/20 relative overflow-hidden my-4 backdrop-blur-xl">
      {/* Ambient background glows directly matching the reference screenshot */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#39A900]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar of the telemetry dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-cyan-500/20 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] animate-pulse" />
          <h2 className="text-sm sm:text-base font-bold tracking-wider uppercase text-cyan-300 font-mono flex items-center gap-2">
            <span>Telemetría de Apropiación Institucional</span>
            <span className="text-[10px] bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded-full text-cyan-300 font-sans normal-case">
              Dashboard UI Inspired
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="font-mono text-cyan-400 font-semibold">{profile.name}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 font-mono text-[11px]">Ficha {profile.fichaNumber}</span>
        </div>
      </div>

      {/* Main Grid: Quadrants replicating the uploaded UI inspiration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 relative z-10">
        
        {/* QUADRANT 1: Circular Progress Gauges (Top Left of Reference Image) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00e5ff]" />
              Indicadores de Apropiación por Módulo
            </span>
            <span className="text-[11px] text-cyan-400 font-mono font-medium">
              {completedModules}/{totalModules} Módulos Acreditados
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 items-center justify-items-center pt-2">
            {moduleGauges.map((gauge) => {
              const strokeOffset = circumference - (gauge.percent / 100) * circumference;
              const isEarned = unlockedBadges.includes(gauge.id);
              const isSelected = activeModule === gauge.id;

              return (
                <button
                  key={gauge.id}
                  onClick={() => onSelectModule(gauge.id)}
                  className={`flex flex-col items-center group transition-transform active:scale-95 text-center p-2 rounded-2xl w-full ${
                    isSelected ? 'bg-cyan-950/40 ring-1 ring-cyan-500/50' : 'hover:bg-slate-800/40'
                  }`}
                  title={`Clic para ir a Módulo: ${gauge.label}`}
                >
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 100 100">
                      {/* Background circle ring */}
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        className="stroke-slate-800/80"
                        strokeWidth="7"
                        fill="none"
                      />
                      {/* Animated Neon Cyan / Mint progress ring */}
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        className="transition-all duration-1000 ease-out"
                        stroke={isEarned ? '#39A900' : isSelected ? '#00e5ff' : '#00a8cc'}
                        strokeWidth="7"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                        fill="none"
                        style={{
                          filter: isEarned || isSelected ? 'drop-shadow(0 0 6px rgba(0, 229, 255, 0.6))' : 'none',
                        }}
                      />
                    </svg>
                    {/* Inner percentage text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-extrabold tracking-tight text-white font-mono leading-none">
                        {gauge.percent}%
                      </span>
                      <span className="text-[9px] text-cyan-300 font-medium opacity-80 mt-0.5">
                        {isEarned ? 'Listo' : 'Activo'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 group-hover:text-cyan-300 mt-2 line-clamp-1 leading-tight transition-colors">
                    {gauge.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* QUADRANT 2: Luminous Capsule Horizontal Progress Bars (Top Right of Reference Image) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5 bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/15">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Ruta Global de Inducción
            </span>
            <p className="text-[11px] text-slate-400">
              Avance integral de competencias y horas formativas
            </p>
          </div>

          {/* Bar 1: Global Induction Approval */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Apropiación Institucional y Normativa</span>
              <span className="text-base font-extrabold text-[#00e5ff] font-mono shadow-xs">
                {globalProgress}%
              </span>
            </div>
            {/* Luminous Capsule Bar with Mint to Cyan Gradient */}
            <div className="w-full h-4 bg-slate-950/80 rounded-full p-0.5 border border-cyan-500/30 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#39A900] via-[#00e5ff] to-[#38bdf8] transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                style={{ width: `${Math.max(globalProgress, 8)}%` }}
              />
            </div>
          </div>

          {/* Bar 2: Etapa Lectiva & Readiness */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Alistamiento para Fase Lectiva</span>
              <span className="text-base font-extrabold text-emerald-400 font-mono">
                {Math.min(globalProgress + 15, 100)}%
              </span>
            </div>
            {/* Soft Cyan Capsule Bar */}
            <div className="w-full h-4 bg-slate-950/80 rounded-full p-0.5 border border-cyan-500/30 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0072CE] to-[#00e5ff] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,114,206,0.6)]"
                style={{ width: `${Math.min(globalProgress + 15, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* QUADRANT 3: Line Wave Area Graph with Column Shading (Bottom Left of Reference Image) */}
        <div className="lg:col-span-6 bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/15 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#00e5ff]" />
                Curva de Asimilación de Conocimientos
              </span>
              <p className="text-[11px] text-slate-400">Puntaje por hitos pedagógicos acumulados</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              300 Max Pts
            </span>
          </div>

          {/* Line Chart with vertical shaded bars (Inspired by Bottom-Left of UI kit) */}
          <div className="relative h-44 w-full flex items-end justify-between px-2 pt-6">
            {/* Horizontal axis grid markers */}
            <div className="absolute inset-x-0 top-0 border-b border-cyan-500/10 flex justify-between text-[10px] font-mono text-slate-500 pb-0.5">
              <span>300</span>
            </div>
            <div className="absolute inset-x-0 top-1/3 border-b border-cyan-500/10 flex justify-between text-[10px] font-mono text-slate-500 pb-0.5">
              <span>200</span>
            </div>
            <div className="absolute inset-x-0 top-2/3 border-b border-cyan-500/10 flex justify-between text-[10px] font-mono text-slate-500 pb-0.5">
              <span>100</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 border-b border-cyan-500/20 flex justify-between text-[10px] font-mono text-slate-500 pb-0.5">
              <span>0</span>
            </div>

            {/* Simulated vertical bar columns matching the reference screenshot */}
            {[
              { label: 'Inducción', val: 78, h: '78%' },
              { label: 'Símbolos', val: 65, h: '65%' },
              { label: 'FPI', val: 82, h: '82%' },
              { label: 'Reglamento', val: 70, h: '70%' },
              { label: 'Bienestar', val: 55, h: '55%' },
              { label: 'SENNOVA', val: 42, h: '42%' },
              { label: 'Proyecto', val: 38, h: '38%' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end px-1 relative group">
                <div
                  className="w-full bg-gradient-to-t from-cyan-900/40 via-cyan-600/30 to-[#00e5ff]/50 rounded-t-sm group-hover:to-[#00e5ff] transition-all duration-300 relative"
                  style={{ height: col.h }}
                >
                  {/* Glowing Node Dot at peak of column */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] border-2 border-slate-900 group-hover:scale-125 transition-transform" />
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-2 truncate max-w-[42px]">
                  {col.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
            <span className="text-slate-400 text-[11px]">Metas semanales de inducción:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px] text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                Puntaje Obtenido
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                Proyección
              </span>
            </div>
          </div>
        </div>

        {/* QUADRANT 4: Pillar Columns with Metric Ticks (Bottom Right of Reference Image) */}
        <div className="lg:col-span-6 bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/15 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Madurez de Competencias (100 - 150)
              </span>
              <p className="text-[11px] text-slate-400">Escala de suficiencia formativa en talleres y ambientes</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              Escala SENA
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Left side milestone list with Diamond markers (◆) */}
            <div className="col-span-5 space-y-2 text-xs">
              {[
                { name: 'Saber Cognitivo', pts: 145 },
                { name: 'Procedimental', pts: 140 },
                { name: 'Actitud & Ética', pts: 150 },
                { name: 'Innovación Tech', pts: 148 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 group cursor-pointer">
                  {/* Glowing Cyan Diamond Marker */}
                  <span className="text-[#00e5ff] text-xs font-bold filter drop-shadow-[0_0_4px_#00e5ff]">
                    ◆
                  </span>
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-medium group-hover:text-cyan-300 transition-colors text-[11px] leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.pts} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side vertical capsule pillars with numeric ticks (100 - 150) */}
            <div className="col-span-7 flex items-end justify-around gap-2 h-44 pt-4 px-2 bg-slate-950/60 rounded-xl border border-cyan-500/20 relative">
              {/* Vertical Scale Ticks */}
              <div className="absolute left-1.5 inset-y-2 flex flex-col justify-between text-[8px] font-mono text-slate-500 pointer-events-none select-none">
                <span>150</span>
                <span>140</span>
                <span>130</span>
                <span>120</span>
                <span>110</span>
                <span>100</span>
              </div>

              {maturityLevels.map((pillar, idx) => {
                const heightPercent = Math.max(((pillar.score - 90) / 60) * 100, 20);

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group relative z-10 pl-2">
                    {/* Tooltip value */}
                    <span className="text-[9px] font-mono text-[#00e5ff] font-bold mb-1 opacity-90 group-hover:scale-110 transition-transform">
                      {pillar.score}
                    </span>

                    {/* Capsule Pillar Bar with rounded pill cap */}
                    <div className="w-6 sm:w-7 bg-slate-800/80 rounded-full p-0.5 border border-cyan-500/30 overflow-hidden flex flex-col justify-end h-32 shadow-inner">
                      <div
                        className={`w-full rounded-full bg-gradient-to-t ${pillar.color} shadow-[0_0_10px_rgba(0,229,255,0.7)] transition-all duration-1000 ease-out`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    <span className="text-[9px] font-medium text-slate-300 mt-1.5 truncate max-w-[48px] text-center">
                      {pillar.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Rango óptimo para etapa productiva: <strong>130 - 150 pts</strong></span>
            <button
              onClick={() => onStartQuiz(activeModule)}
              className="text-[#00e5ff] hover:text-white font-semibold flex items-center gap-1 transition-colors hover:underline"
            >
              <span>Subir Nivel</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
