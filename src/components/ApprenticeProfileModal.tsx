import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { X, Save, User, Check } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeProfileModalProps {
  initialProfile: ApprenticeProfile;
  onSave: (profile: ApprenticeProfile) => void;
  onClose: () => void;
}

const PROGRAM_PRESETS = [
  {
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    programLevel: 'Tecnólogo' as const,
    trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Regional Distrito Capital',
    fichaNumber: '2874102'
  },
  {
    programName: 'Gestión Empresarial y Administrativa',
    programLevel: 'Tecnólogo' as const,
    trainingCenter: 'Centro de Servicios Financieros',
    regional: 'Regional Distrito Capital',
    fichaNumber: '2754910'
  },
  {
    programName: 'Electricidad Industrial y Mantenimiento',
    programLevel: 'Técnico' as const,
    trainingCenter: 'Centro Metalmecánico',
    regional: 'Regional Antioquia',
    fichaNumber: '2910340'
  },
  {
    programName: 'Producción Agropecuaria y Ecológica',
    programLevel: 'Técnico' as const,
    trainingCenter: 'Centro Agropecuario La Granja',
    regional: 'Regional Tolima',
    fichaNumber: '2845119'
  }
];

export const ApprenticeProfileModal: React.FC<ApprenticeProfileModalProps> = ({
  initialProfile,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>({ ...initialProfile });

  const handleChange = (field: keyof ApprenticeProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (preset: typeof PROGRAM_PRESETS[0]) => {
    setFormData(prev => ({
      ...prev,
      programName: preset.programName,
      programLevel: preset.programLevel,
      trainingCenter: preset.trainingCenter,
      regional: preset.regional,
      fichaNumber: preset.fichaNumber
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto flex flex-col transition-colors">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-[#39A900]/30 flex items-center justify-center p-1">
              <SenaLogo className="w-full h-full text-[#39A900]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ficha del Aprendiz SENA
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Presets shortcut */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Programas Destacados (Relleno rápido):
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PROGRAM_PRESETS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className="text-left p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#39A900] dark:hover:border-[#39A900] bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 text-[11px] text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{preset.programName}</div>
                  <div className="text-slate-500 dark:text-slate-400 font-mono">Ficha {preset.fichaNumber}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nombre Completo del Aprendiz</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tipo de Documento</label>
              <select
                value={formData.docType}
                onChange={(e) => handleChange('docType', e.target.value as ApprenticeProfile['docType'])}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40 bg-white dark:bg-slate-800 dark:text-white"
              >
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="TI">Tarjeta de Identidad (TI)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="PEP">Permiso Especial (PEP)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Número de Documento</label>
              <input
                type="text"
                required
                value={formData.docNumber}
                onChange={(e) => handleChange('docNumber', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nivel de Formación</label>
              <select
                value={formData.programLevel}
                onChange={(e) => handleChange('programLevel', e.target.value as ApprenticeProfile['programLevel'])}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40 bg-white dark:bg-slate-800 dark:text-white"
              >
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Técnico">Técnico</option>
                <option value="Operario">Operario</option>
                <option value="Especialización Tecnológica">Especialización Tecnológica</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Número de Ficha</label>
              <input
                type="text"
                required
                value={formData.fichaNumber}
                onChange={(e) => handleChange('fichaNumber', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40 font-mono"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Programa de Formación</label>
              <input
                type="text"
                required
                value={formData.programName}
                onChange={(e) => handleChange('programName', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Centro de Formación</label>
              <input
                type="text"
                required
                value={formData.trainingCenter}
                onChange={(e) => handleChange('trainingCenter', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Regional</label>
              <input
                type="text"
                required
                value={formData.regional}
                onChange={(e) => handleChange('regional', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-[#39A900] hover:bg-[#2d8500] text-white flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Ficha</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
