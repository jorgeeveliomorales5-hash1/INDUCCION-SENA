import React, { useState } from 'react';
import { ETAPAS_PRODUCTIVAS } from '../data/senaData';
import { Award, Briefcase, BookOpen, Layers, CheckCircle2, ChevronRight, Check, Database, Globe } from 'lucide-react';

interface ModuleFormacionProps {
  onStartQuiz: () => void;
  isCompleted: boolean;
}

export const ModuleFormacion: React.FC<ModuleFormacionProps> = ({ onStartQuiz, isCompleted }) => {
  const [selectedEtapaId, setSelectedEtapaId] = useState<string>('contrato_aprendizaje');

  const selectedEtapa = ETAPAS_PRODUCTIVAS.find(e => e.id === selectedEtapaId) || ETAPAS_PRODUCTIVAS[0];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900]">
          <span>Módulo 02</span>
          <span aria-hidden="true">·</span>
          <span>Pedagogía Institucional</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Formación Profesional Integral (FPI) y Ruta Productiva
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          En el SENA no memorizas teorías desconectadas: desarrollas competencias integrales a través de proyectos reales que resuelven necesidades concretas del sector productivo.
        </p>
      </section>

      {/* Triad of Competencies: Saber, Saber Hacer, Saber Ser */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            La Tríada de Competencias Laborales
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Un aprendiz SENA se distingue por el equilibrio perfecto entre conocimiento, destreza y calidad humana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-2 hover:border-[#39A900]/60 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Cognitivo
              </span>
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Saber (Conocimiento)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Apropiación de fundamentos técnicos, ciencias aplicadas, matemáticas, normativas y conceptos especializados de tu disciplina.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-2 hover:border-[#0072CE]/60 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                Procedimental
              </span>
              <Layers className="w-4 h-4 text-[#0072CE] dark:text-sky-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Saber Hacer (Habilidad)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Destreza técnica, manejo seguro de maquinaria, herramientas y software, y resolución metódica de problemas en talleres y ambientes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-2 hover:border-[#00324D]/60 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                Actitudinal y Ético
              </span>
              <Briefcase className="w-4 h-4 text-[#00324D] dark:text-slate-300" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Saber Ser (Actitud & Ética)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Puntualidad, liderazgo transformador, trabajo colaborativo, comunicación asertiva, empatía y respeto incondicional por la comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Proyecto Formativo y Fases */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Metodología del Proyecto Formativo
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A lo largo de tu programa desarrollarás un proyecto formativo guiado por las 4 fases pedagógicas institucionales:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#39A900]">01. Fase</span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Diagnóstico</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Análisis</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Identificación de la problemática empresarial o comunitaria, recolección de requisitos y estudio de viabilidad técnica.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0072CE] dark:text-sky-400">02. Fase</span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Diseño</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Planeación</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Estructuración de cronogramas, selección de tecnologías, arquitectura de soluciones y presupuestos operativos.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">03. Fase</span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Desarrollo</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ejecución</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Construcción del prototipo, fabricación de piezas, codificación de sistemas o implementación directa de la propuesta.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">04. Fase</span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Control</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Evaluación</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Pruebas de calidad, sustentación técnica ante instructores y empresarios, y medición de impacto social o productivo.
            </p>
          </div>
        </div>
      </section>

      {/* Explorador de Alternativas de Etapa Productiva */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Explorador de Alternativas de Etapa Productiva
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Al finalizar tu etapa lectiva, podrás certificar tus competencias mediante una de las 6 alternativas reglamentarias.
          </p>
        </div>

        {/* Alternative buttons selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ETAPAS_PRODUCTIVAS.map((etapa) => {
            const isSelected = selectedEtapaId === etapa.id;
            return (
              <button
                key={etapa.id}
                onClick={() => setSelectedEtapaId(etapa.id)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-[#00324D] dark:bg-emerald-950 dark:border-[#39A900]/50 text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isSelected ? 'text-[#39A900]' : 'text-slate-400'}`}>
                  {etapa.popularidad}
                </div>
                <div className="text-xs font-bold leading-tight line-clamp-2">
                  {etapa.titulo}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Alternative Detail Card */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700 pb-3">
            <div>
              <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider">
                {selectedEtapa.popularidad}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedEtapa.titulo}
              </h3>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-200 font-medium bg-white dark:bg-slate-800 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs self-start">
              Apoyo: <span className="font-semibold text-slate-900 dark:text-white">{selectedEtapa.apoyoEconomico}</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
            {selectedEtapa.descripcion}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white">Requisitos para aprobación:</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedEtapa.requisitos}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white">Ventajas clave:</span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {selectedEtapa.ventajas.map((v, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plataformas del Ecosistema Digital SENA */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Ecosistema de Plataformas Digitales
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Herramientas oficiales que utilizarás a diario durante toda tu vida académica y laboral en el SENA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#00324D] dark:text-slate-300" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">SofiaPlus (Gestión)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Portal maestro de registro de matrícula, consulta de juicios evaluativos (Aprobado / No aprobado), emisión de certificados oficiales y constancias académicas con código de verificación.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#39A900]" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zajuna / Territorio (LMS)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ambiente Virtual de Aprendizaje (LMS) donde interactúas con instructores, descargas guías de aprendizaje, participas en foros temáticos, subes evidencias y recibes retroalimentación.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#0072CE] dark:text-sky-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">APE (Agencia Pública de Empleo)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Plataforma pública y gratuita de intermediación laboral para registrar tu hoja de vida, postularte a vacantes empresariales en toda Colombia y convocatorias internacionales.
            </p>
          </div>
        </div>
      </section>

      {/* Module Challenge / Evaluation CTA */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wide">
            <Award className="w-4 h-4" />
            <span>Reto de Apropiación Módulo 02</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Valida tus conocimientos sobre el Modelo FPI
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Responde 4 preguntas sobre las competencias, etapas productivas y evaluación cualitativa para ganar la insignia <strong>Artífice del Aprendizaje</strong>.
          </p>
        </div>

        <button
          onClick={onStartQuiz}
          className={`px-5 py-3 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-sm shrink-0 whitespace-nowrap ${
            isCompleted
              ? 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white'
              : 'bg-[#39A900] hover:bg-[#2d8500] text-white'
          }`}
        >
          {isCompleted ? (
            <>
              <Check className="w-4 h-4 text-[#39A900]" />
              <span>Repetir Cuestionario</span>
            </>
          ) : (
            <>
              <span>Iniciar Evaluación Módulo 2</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </section>
    </div>
  );
};
