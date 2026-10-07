import React from 'react';
import { ApprenticeProfile } from '../types/induction';
import { MODULES_INFO } from '../data/senaData';
import { Printer, Download, X, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  unlockedBadges: string[];
  onClose: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  unlockedBadges,
  onClose,
}) => {
  const isAllCompleted = unlockedBadges.length === MODULES_INFO.length;
  const issueDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const verificationCode = `SENA-IND-${profile.fichaNumber}-${profile.docNumber.slice(-4)}-${new Date().getFullYear()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto flex flex-col transition-colors">
        {/* Modal Top Control Bar (hidden in print) */}
        <div className="no-print px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#39A900]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Constancia Oficial de Inducción Institucional SENA
            </h3>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Registro Institucional Verificado</span>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Sheet */}
        <div className="p-6 sm:p-12 bg-white flex flex-col items-center justify-between min-h-[640px] text-slate-900 relative overflow-hidden">
          {/* Subtle ornate institutional border */}
          <div className="absolute inset-4 sm:inset-6 border-2 border-[#00324D] rounded-xl pointer-events-none" />
          <div className="absolute inset-5 sm:inset-7 border border-[#39A900]/40 rounded-lg pointer-events-none" />

          {/* Official Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]">
            <SenaLogo className="w-96 h-96 text-[#39A900]" />
          </div>

          {/* Institutional Header */}
          <div className="relative text-center space-y-2 pt-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-14 h-14 p-1.5 rounded-full bg-emerald-50/80 border border-[#39A900]/30 flex items-center justify-center shadow-xs">
                <SenaLogo className="w-11 h-11 text-[#39A900]" />
              </div>
            </div>

            <div className="text-[11px] font-bold tracking-widest text-[#00324D] uppercase">
              República de Colombia · Ministerio del Trabajo
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              SERVICIO NACIONAL DE APRENDIZAJE · SENA
            </h1>
            <div className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              Dirección de Formación Profesional Integral
            </div>
          </div>

          {/* Certificate Body Text */}
          <div className="relative text-center my-6 space-y-4 max-w-2xl px-4">
            <p className="text-xs sm:text-sm text-slate-600 uppercase tracking-widest">
              HACE CONSTAR QUE EL (LA) APRENDIZ:
            </p>

            <div className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight border-b-2 border-[#39A900] pb-2 inline-block">
              {profile.name}
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              Identificado(a) con <strong>{profile.docType} No. {profile.docNumber}</strong>, matriculado(a) en el programa:
            </p>

            <div className="text-base sm:text-lg font-bold text-slate-900">
              {profile.programLevel} en {profile.programName}
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Ficha de Caracterización: <strong>{profile.fichaNumber}</strong>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto pt-2">
              Ha culminado y aprobado satisfactoriamente el proceso de <strong>Inducción Institucional</strong>, apropiando la misión, símbolos, el modelo pedagógico de Formación Profesional Integral, el Reglamento del Aprendiz (Acuerdo 0009 de 2024), los servicios de Bienestar y el ecosistema de innovación SENNOVA.
            </p>

            {/* Modules badge verification pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-600">
              {MODULES_INFO.map(mod => {
                const isEarned = unlockedBadges.includes(mod.id);
                return (
                  <span
                    key={mod.id}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border font-medium ${
                      isEarned
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
                    <span>{mod.shortTitle}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Signatures & Footer Validation */}
          <div className="relative w-full max-w-2xl pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
            {/* Signature 1 */}
            <div className="space-y-1">
              <div className="font-serif italic text-sm text-slate-600 h-8 flex items-end justify-center">
                Dr. J. Rodríguez C.
              </div>
              <div className="w-36 h-px bg-slate-400 mx-auto" />
              <div className="text-[11px] font-bold text-slate-800">Subdirector de Centro</div>
              <div className="text-[10px] text-slate-500 leading-tight truncate">{profile.trainingCenter}</div>
            </div>

            {/* Digital Stamp / QR */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="w-16 h-16 border-2 border-dashed border-[#39A900] rounded-lg flex flex-col items-center justify-center p-1 bg-emerald-50/50">
                <ShieldCheck className="w-6 h-6 text-[#39A900]" />
                <span className="text-[8px] font-mono font-bold text-slate-700">VERIFICADO</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400">
                {verificationCode}
              </div>
            </div>

            {/* Signature 2 */}
            <div className="space-y-1">
              <div className="font-serif italic text-sm text-slate-600 h-8 flex items-end justify-center">
                Lic. M. Fernanda Gómez
              </div>
              <div className="w-36 h-px bg-slate-400 mx-auto" />
              <div className="text-[11px] font-bold text-slate-800">Coordinador Misional</div>
              <div className="text-[10px] text-slate-500 leading-tight">{profile.regional}</div>
            </div>
          </div>

          <div className="relative text-center pt-4 text-[10px] text-slate-400">
            Expedido en Colombia a los {issueDate} · Documento electrónico de inducción institucional SENA
          </div>
        </div>

        {/* Non-print footer notice */}
        <div className="no-print px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>{isAllCompleted ? '★ Todas las 5 insignias institucionales acreditadas.' : 'Nota: Puedes completar los módulos pendientes en cualquier momento.'}</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
          >
            Cerrar Constancia
          </button>
        </div>
      </div>
    </div>
  );
};
