import React from 'react';
import { Award, Lightbulb, Rocket, Globe2, Cpu, CheckCircle2, ChevronRight, Check } from 'lucide-react';

interface ModuleInnovacionProps {
  onStartQuiz: () => void;
  isCompleted: boolean;
}

export const ModuleInnovacion: React.FC<ModuleInnovacionProps> = ({ onStartQuiz, isCompleted }) => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900]">
          <span>Módulo 05</span>
          <span aria-hidden="true">·</span>
          <span>Investigación & Emprendimiento</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          SENNOVA, TecnoParques, Fondo Emprender y WorldSkills
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          El SENA es el mayor motor de ciencia aplicada y emprendimiento de Colombia. Aquí tus ideas pueden transformarse en patentes, prototipos de alta tecnología, empresas viables o medallas mundiales.
        </p>
      </section>

      {/* SENNOVA Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-3 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-[#39A900]">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">TecnoParques SENA</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
            Red de aceleración tecnológica con laboratorios de última generación en 4 líneas: Biotecnología y Nanotecnología, Electrónica y Telecomunicaciones, Ingeniería y Diseño, y Tecnologías Virtuales. Totalmente gratuito para aprendices e innovadores colombianos.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-3 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-800 flex items-center justify-center text-[#0072CE]">
            <Rocket className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Fondo Emprender</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
            El fondo de capital semilla más grande de Latinoamérica. Financia proyectos empresariales con recursos no reembolsables (condonables al 100% si se cumplen los indicadores del plan de negocio y generación de empleo formal).
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-3 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-amber-600">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">WorldSkills Internacional</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
            La competencia olímpica donde los aprendices más destacados de cada habilidad técnica compiten a nivel nacional y mundial (Lyon, Shanghái, Abu Dabi) frente a más de 85 naciones, alcanzando los más altos estándares globales.
          </p>
        </div>
      </section>

      {/* Semilleros de Investigación SENNOVA */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            ¿Cómo vincularte a un Semillero de Investigación?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Durante tu etapa lectiva puedes formar parte de proyectos científicos avalados por MinCiencias.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="font-mono text-xs font-bold text-[#39A900]">01. Acercamiento</div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Contacta a tu Gestor</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Pregunta en la Coordinación Académica por el Gestor SENNOVA de tu Centro de Formación.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="font-mono text-xs font-bold text-[#0072CE] dark:text-sky-400">02. Inscripción</div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Semillero Afín</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Elige una línea de investigación vinculada con tu programa formativo o interés tecnológico.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">03. Desarrollo</div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Prototipado Real</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Formula el proyecto junto con instructores investigadores y accede a laboratorios especializados.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 transition-colors">
            <div className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">04. Beneficio</div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pasantía y Mérito</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tu participación puede convalidarse como alternativa de Etapa Productiva y enriquecer tu currículum.
            </p>
          </div>
        </div>
      </section>

      {/* Module Challenge / Evaluation CTA */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wide">
            <Award className="w-4 h-4" />
            <span>Reto de Apropiación Módulo 05</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Valida tus conocimientos de Innovación y SENNOVA
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Supera el cuestionario final para obtener la insignia <strong>Pionero de Innovación</strong> y completar el 100% de tu inducción.
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
              <span>Iniciar Evaluación Módulo 5</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </section>
    </div>
  );
};
