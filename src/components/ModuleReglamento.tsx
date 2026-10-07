import React, { useState } from 'react';
import { REGLAMENTO_HIGHLIGHTS, CASE_STUDIES } from '../data/senaData';
import {
  Award,
  Scale,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Check,
  Search,
  Users,
  ShieldCheck,
  FileText,
  UserCheck,
  Sparkles,
  Info,
  Trophy,
  Timer,
  Zap,
} from 'lucide-react';

interface ModuleReglamentoProps {
  onStartQuiz: () => void;
  onStartUnifiedEvaluation?: () => void;
  isCompleted: boolean;
}

type TabKey =
  | 'derechos'
  | 'deberes'
  | 'prohibiciones'
  | 'representatividad'
  | 'desercion_novedades'
  | 'medidas'
  | 'casos';

export const ModuleReglamento: React.FC<ModuleReglamentoProps> = ({
  onStartQuiz,
  onStartUnifiedEvaluation,
  isCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('derechos');
  const [searchTerm, setSearchTerm] = useState('');
  const [caseAnswers, setCaseAnswers] = useState<Record<string, number>>({});

  const filteredDerechos = REGLAMENTO_HIGHLIGHTS.derechos.filter(d =>
    d.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.articulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeberes = REGLAMENTO_HIGHLIGHTS.deberes.filter(d =>
    d.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.articulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProhibiciones = REGLAMENTO_HIGHLIGHTS.prohibiciones.filter(p =>
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.articulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCaseOption = (caseId: string, optionIdx: number) => {
    setCaseAnswers(prev => ({ ...prev, [caseId]: optionIdx }));
  };

  return (
    <div className="space-y-10">
      {/* Header Institucional del Nuevo Acuerdo */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900]">
            <span>Módulo 03</span>
            <span aria-hidden="true">·</span>
            <span>Normativa y Convivencia Institucional</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
            Acuerdo 0009 del 05 de Noviembre de 2024
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Reglamento del Aprendiz SENA: Acuerdo 0009 de 2024
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
            Adoptado por el Consejo Directivo Nacional del SENA, este nuevo reglamento{' '}
            <strong className="text-slate-900 dark:text-white">
              deroga en su totalidad los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024
            </strong>. Incorpora estándares constitucionales de inclusión, enfoque diferencial, garantías para estudiantes gestantes y cuidadores (Ley 2394 de 2024) y rutas contra el acoso sexual (Ley 2365 de 2024).
          </p>
        </div>

        {/* Banner de considerandos y principios clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block">24 Derechos</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Artículo 5</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block">24 Deberes</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Artículo 8</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block">14 Prohibiciones</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Artículo 9</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block">7 Vocerías Diferenciales</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Artículo 7</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('derechos')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'derechos'
                ? 'bg-[#121836] text-[#00e5ff] border border-cyan-500/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            01. Derechos (Art. 5)
          </button>
          <button
            onClick={() => setActiveTab('deberes')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'deberes'
                ? 'bg-[#121836] text-[#00e5ff] border border-cyan-500/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            02. Deberes (Art. 8)
          </button>
          <button
            onClick={() => setActiveTab('prohibiciones')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'prohibiciones'
                ? 'bg-[#121836] text-[#00e5ff] border border-cyan-500/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            03. Prohibiciones (Art. 9)
          </button>
          <button
            onClick={() => setActiveTab('representatividad')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'representatividad'
                ? 'bg-[#121836] text-[#00e5ff] border border-cyan-500/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            04. Enfoque Diferencial (Art. 7)
          </button>
          <button
            onClick={() => setActiveTab('desercion_novedades')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'desercion_novedades'
                ? 'bg-[#121836] text-[#00e5ff] border border-cyan-500/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            05. Novedades & Deserción
          </button>
          <button
            onClick={() => setActiveTab('medidas')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'medidas'
                ? 'bg-[#121836] text-[#00e5ff] border border-cyan-500/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            06. Medidas & Debido Proceso
          </button>
          <button
            onClick={() => setActiveTab('casos')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'casos'
                ? 'bg-[#39A900] text-white shadow-sm ring-2 ring-[#39A900]/30'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800'
            }`}
          >
            Simulador de Casos Reales (2024)
          </button>
        </div>
      </section>

      {/* Tab: DERECHOS (Art. 5) */}
      {activeTab === 'derechos' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#39A900] uppercase">Capítulo II · Artículo 5</span>
                <span className="text-xs text-slate-400">({REGLAMENTO_HIGHLIGHTS.derechos.length} Derechos)</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Derechos Fundamentales del Aprendiz SENA
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Garantías inalienables que respaldan tu proceso de formación profesional integral, dignidad y permanencia.
              </p>
            </div>

            {/* Quick search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar derecho (ej. EPP, 8 días, acoso)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDerechos.map((der, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 hover:border-[#39A900]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#0072CE] dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                    {der.articulo}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{der.titulo}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {der.detalle}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab: DEBERES (Art. 8) */}
      {activeTab === 'deberes' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#0072CE] uppercase">Capítulo III · Artículo 8</span>
                <span className="text-xs text-slate-400">({REGLAMENTO_HIGHLIGHTS.deberes.length} Deberes)</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Deberes del Aprendiz SENA
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Compromisos éticos y ciudadanos para salvaguardar la formación de calidad y la convivencia institucional.
              </p>
            </div>

            {/* Quick search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar deber (ej. uniforme, 5 días, EPP)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40"
              />
            </div>
          </div>

          {/* Destaque de la innovación clave de Uniformes en 2024 */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200">
              <Info className="w-4 h-4 text-[#39A900]" />
              <span>Innovación del Acuerdo 0009 de 2024 en Uniformes (Art. 8 Num. 20)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Queda expresamente prohibido exigir marcas o proveedores específicos de uniformes. Asimismo,{' '}
              <strong>la falta de recursos económicos para el uniforme de diario jamás impedirá el acceso a las clases</strong>.
              El porte obligatorio estricto se mantiene exclusivamente para los Elementos de Protección Personal (EPP) por normas de seguridad industrial y salud en el trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDeberes.map((deb, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 hover:border-[#0072CE]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#00324D] dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {deb.articulo}
                  </span>
                  <Scale className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{deb.titulo}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {deb.detalle}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab: PROHIBICIONES (Art. 9) */}
      {activeTab === 'prohibiciones' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-rose-600 uppercase">Capítulo III · Artículo 9</span>
                <span className="text-xs text-slate-400">({REGLAMENTO_HIGHLIGHTS.prohibiciones.length} Prohibiciones)</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Prohibiciones Expresas en el SENA
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Conductas que vulneran los principios institucionales y dan lugar a procesos disciplinarios formales.
              </p>
            </div>

            {/* Quick search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar prohibición (ej. plagio, armas, alcohol)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProhibiciones.map((pro, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/20 space-y-2 hover:border-rose-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded">
                    {pro.articulo}
                  </span>
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{pro.titulo}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {pro.detalle}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab: REPRESENTATIVIDAD Y ENFOQUE DIFERENCIAL (Art. 7) */}
      {activeTab === 'representatividad' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase">Capítulo II · Artículo 7</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Democracia Estudiantil y Vocerías de Enfoque Diferencial
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              El Acuerdo 0009 de 2024 amplió los mecanismos de representación democrática para garantizar voz efectiva a todas las diversidades territoriales y poblaciones de especial protección.
            </p>
          </div>

          {/* Dos columnas: Representantes por Jornada y Vocerías Diferenciales */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Columna 1: Representantes por Jornada y Modalidad */}
            <div className="lg:col-span-5 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0072CE]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Representantes por Jornada y Modalidad
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Elegidos democráticamente mediante voto secreto por los aprendices de cada respectiva jornada y modalidad:
              </p>
              <div className="space-y-1.5">
                {REGLAMENTO_HIGHLIGHTS.representatividad.representantesJornadas.map((jornada, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
                  >
                    <span>{jornada}</span>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">Voto Electrónico</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna 2: 7 Vocerías de Enfoque Diferencial */}
            <div className="lg:col-span-7 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#39A900]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Vocerías con Enfoque Diferencial e Inclusión
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Espacios colegiados que articulan solicitudes con la Subdirección de Centro y Bienestar:
              </p>
              <div className="space-y-2">
                {REGLAMENTO_HIGHLIGHTS.representatividad.voceriasEnfoqueDiferencial.map((voc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#39A900] dark:text-emerald-400">
                        {voc.cargo}
                      </span>
                      <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">
                        Acuerdo 2024
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                      {voc.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab: NOVEDADES & DESERCIÓN (Art. 18, 30 y 31) */}
      {activeTab === 'desercion_novedades' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase">Capítulo IV · Artículos 18, 30 y 31</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Régimen de Novedades y Causales de Deserción
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Conoce los procedimientos para gestionar tu ruta formativa y los umbrales precisos que evitan la pérdida de matrícula.
            </p>
          </div>

          {/* Grid: 4 Novedades vs Causales de Deserción */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Novedades académicas */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0072CE]" />
                Novedades durante la Formación (Art. 18)
              </h3>
              <div className="space-y-2.5">
                {REGLAMENTO_HIGHLIGHTS.novedadesYDesercion.novedades.map((nov, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 space-y-1"
                  >
                    <span className="font-bold text-xs text-[#0072CE] dark:text-sky-400 block">
                      {nov.tipo}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {nov.condicion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Causales de Deserción */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Causales Explícitas de Deserción (Art. 30)
              </h3>
              <div className="space-y-2.5">
                {REGLAMENTO_HIGHLIGHTS.novedadesYDesercion.desercionCausales.map((cau, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/30 space-y-1"
                  >
                    <span className="font-bold text-xs text-rose-800 dark:text-rose-300 block">
                      {cau.modalidad}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cau.causal}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-rose-100/70 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 rounded-xl text-xs text-rose-900 dark:text-rose-200 leading-relaxed">
                <strong>Consecuencia:</strong> {REGLAMENTO_HIGHLIGHTS.novedadesYDesercion.consecuenciaDesercion}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab: MEDIDAS FORMATIVAS & DEBIDO PROCESO */}
      {activeTab === 'medidas' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Ruta Formativa: De la Corrección Pedagógica a las Sanciones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              El SENA prioriza la pedagogía restaurativa y el fortalecimiento socioemocional sobre el castigo punitivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REGLAMENTO_HIGHLIGHTS.medidasFormativas.map((med, idx) => {
              const isSanction = idx >= 2;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border space-y-2.5 transition-colors ${
                    isSanction
                      ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSanction
                          ? 'text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60'
                          : 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60'
                      }`}
                    >
                      {med.alcance}
                    </span>
                    {isSanction ? (
                      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <Scale className="w-4 h-4 text-[#39A900]" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{med.tipo}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                    {med.detalle}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-lg text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              Garantía Constitucional del Debido Proceso (Art. 5 Num. 10 y Art. 16)
            </span>
            <p className="leading-relaxed">
              Ningún aprendiz puede ser sancionado de manera automática. Todo trámite exige notificación previa por escrito, traslado de cargos, audiencia en el Comité de Evaluación y Seguimiento, derecho a rendir descargos y aportar pruebas, y recurso de apelación ante el Subdirector de Centro en los términos de ley.
            </p>
          </div>
        </section>
      )}

      {/* Tab: SIMULADOR DE CASOS REALES (2024) */}
      {activeTab === 'casos' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-8 transition-colors">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>Simulador Interactivo de Convivencia · Acuerdo 0009 de 2024</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Dilemas Éticos y Casos Prácticos de Aplicación Normativa
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Analiza situaciones cotidianas del entorno SENA y selecciona la respuesta ajustada a derecho conforme al nuevo acuerdo.
            </p>
          </div>

          <div className="space-y-6">
            {CASE_STUDIES.map((c, caseIndex) => {
              const selectedIdx = caseAnswers[c.id];
              const isAnswered = selectedIdx !== undefined;

              return (
                <div
                  key={c.id}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/40 space-y-4 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      Caso {caseIndex + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{c.title}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 leading-relaxed italic">
                    "{c.context}"
                  </p>

                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {c.question}
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {c.options.map((opt, optIdx) => {
                      const isSelected = selectedIdx === optIdx;
                      let optionClasses =
                        'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200';

                      if (isAnswered) {
                        if (opt.isCorrect) {
                          optionClasses =
                            'border-emerald-500 dark:border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-medium';
                        } else if (isSelected && !opt.isCorrect) {
                          optionClasses =
                            'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
                        } else {
                          optionClasses =
                            'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-400 dark:text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectCaseOption(c.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${optionClasses}`}
                        >
                          <span className="font-mono font-bold mt-0.5">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="flex-1 leading-relaxed">{opt.text}</span>
                          {isAnswered && opt.isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {isAnswered && isSelected && !opt.isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pedagogical Feedback */}
                  {isAnswered && (
                    <div
                      className={`p-3.5 rounded-lg border text-xs space-y-1 animate-fadeIn ${
                        c.options[selectedIdx].isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>Fundamentación Institucional:</span>
                        <span className="font-mono text-[11px] underline">
                          {c.options[selectedIdx].articleReference}
                        </span>
                      </div>
                      <p className="leading-relaxed">{c.options[selectedIdx].feedback}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Module Challenge / Evaluation CTA */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#39A900] bg-emerald-100/70 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 uppercase tracking-wide">
            <Trophy className="w-3.5 h-3.5" />
            <span>Evaluación Unificada Cronometrada</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Gran Desafío del Reglamento (25 Preguntas · Ranking Gamificado)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Presenta la evaluación oficial completa: <strong>5 preguntas de cada una de las 5 secciones</strong> con cronómetro de respuesta, refuerzos pedagógicos inmediatos, bonificaciones de velocidad y tabla de posiciones.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onStartUnifiedEvaluation || onStartQuiz}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 transition-all shadow-md bg-[#39A900] hover:bg-[#2d8500] text-white active:scale-95"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Iniciar Reto Gamificado (25 Preguntas)</span>
          </button>
        </div>
      </section>
    </div>
  );
};
