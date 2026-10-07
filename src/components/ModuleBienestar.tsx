import React, { useState } from 'react';
import { Award, HeartHandshake, Activity, Music, Trophy, Users, DollarSign, ShieldCheck, ChevronRight, Check } from 'lucide-react';

interface ModuleBienestarProps {
  onStartQuiz: () => void;
  isCompleted: boolean;
}

export const ModuleBienestar: React.FC<ModuleBienestarProps> = ({ onStartQuiz, isCompleted }) => {
  const [selectedDimension, setSelectedDimension] = useState<number>(0);

  const DIMENSIONS = [
    {
      title: 'Salud Integral y Psicosocial',
      icon: Activity,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      short: 'Atención médica preventiva, enfermería y asesoría psicológica gratuita.',
      details: 'El SENA cuenta con profesionales en psicología y enfermería para acompañarte en momentos de crisis personal o estrés formativo. Todo el servicio es estrictamente confidencial y gratuito.'
    },
    {
      title: 'Deporte, Actividad Física y Torneos',
      icon: Trophy,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      short: 'Torneos intercentros de fútbol, voleibol, atletismo, ajedrez y crossfit.',
      details: 'Fomenta la disciplina y la salud física. Los mejores deportistas representan a sus Centros en los Juegos Nacionales de la Confraternidad de Aprendices SENA con todos los viáticos cubiertos.'
    },
    {
      title: 'Arte, Cultura y Expresión',
      icon: Music,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      short: 'Grupos de danza tradicional, teatro, música folclórica y ensambles.',
      details: 'Espacios extracurriculares para cultivar tu sensibilidad artística, pertenecer a los grupos representativos del Centro y presentarte en festivales nacionales de aprendices.'
    },
    {
      title: 'Liderazgo y Elección de Voceros',
      icon: Users,
      color: 'text-[#00324D]',
      bg: 'bg-slate-100',
      short: 'Elección de voceros de ficha y representantes generales de Centro.',
      details: 'Mecanismo democrático donde cada ficha elige a su vocero para articular solicitudes académicas con el equipo de instructores y coordinadores misionales.'
    },
    {
      title: 'Apoyos Socioeconómicos (Sostenimiento y FIC)',
      icon: DollarSign,
      color: 'text-[#39A900]',
      bg: 'bg-green-50',
      short: 'Auxilio mensual de sostenimiento para aprendices de estratos 1 y 2.',
      details: 'Convocatorias semestrales para aprendices en condición de vulnerabilidad socioeconómica que no tengan contrato de aprendizaje remunerado. Incluye el Fondo FIC para el sector construcción.'
    },
    {
      title: 'Monitorías Remuneradas',
      icon: ShieldCheck,
      color: 'text-[#0072CE]',
      bg: 'bg-sky-50',
      short: 'Estímulo económico para aprendices sobresalientes en ambientes y laboratorios.',
      details: 'Reconocimiento y retribución económica a quienes apoyan a instructores en la dinamización de laboratorios, bibliotecas, talleres y aulas especializadas.'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900]">
          <span>Módulo 04</span>
          <span aria-hidden="true">·</span>
          <span>Desarrollo Humano Integral</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Plan Nacional de Bienestar al Aprendiz y Liderazgo
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          En el SENA no estás solo: existe una estructura integral diseñada para acompañarte, proteger tu salud emocional, potenciar tus talentos artísticos y deportivos, y brindarte apoyo socioeconómico para culminar tu formación.
        </p>
      </section>

      {/* Interactive Dimensions Explorer */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dimensiones Estratégicas de Bienestar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explora las áreas que componen tu red de apoyo institucional dentro del Centro de Formación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIMENSIONS.map((dim, idx) => {
            const Icon = dim.icon;
            const isSelected = selectedDimension === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDimension(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/40 ring-2 ring-[#39A900]/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg ${dim.bg} dark:bg-slate-800 flex items-center justify-center ${dim.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {dim.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {dim.short}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Dimension Spotlight */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 space-y-2 transition-colors">
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider">
            <span>Dimensión Seleccionada:</span>
            <span>{DIMENSIONS[selectedDimension].title}</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {DIMENSIONS[selectedDimension].details}
          </p>
        </div>
      </section>

      {/* Leadership: Vocero de Ficha vs Representante de Centro */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Democracia y Liderazgo Aprendiz
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Conoce cómo se ejerce la voz y la representación estudiantil en las instancias colegiadas del SENA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#00324D] dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
                Nivel Grupo
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Vocero de Ficha</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              Elegido democráticamente por votación en su propia ficha durante el primer mes de formación. Representa al grupo ante instructores, el Coordinador Académico y Bienestar.
            </p>
            <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-700 pt-2">
              <span className="font-semibold text-slate-900 dark:text-white">Rol central:</span> Canalizar solicitudes académicas, mediar la convivencia y participar en asambleas de voceros.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#39A900] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
                Nivel Jornada / Centro
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Representante de Aprendices</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              Elegido por votación universal y secreta de los aprendices de cada jornada (diurna, nocturna, virtual, etc.). Integra el Comité de Evaluación y Seguimiento con voz y voto.
            </p>
            <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-700 pt-2">
              <span className="font-semibold text-slate-900 dark:text-white">Rol central:</span> Articular el plan de bienestar, vigilar presupuestos y defender los derechos estudiantiles.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 dark:bg-slate-800/40 space-y-3 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#00e5ff] bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/40">
                Acuerdo 0009 de 2024
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Vocerías Diferenciales</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              7 vocerías inclusivas reglamentadas en el Art. 7: Indígena, NARP, LGTBIQ+, Campesina, Con discapacidad, Mujer y de Grupo.
            </p>
            <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 border-t border-cyan-500/20 pt-2">
              <span className="font-semibold text-slate-900 dark:text-white">Rol central:</span> Asegurar ajustes razonables, no discriminación, equidad de género y pertinencia territorial.
            </div>
          </div>
        </div>
      </section>

      {/* Module Challenge / Evaluation CTA */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wide">
            <Award className="w-4 h-4" />
            <span>Reto de Apropiación Módulo 04</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Valida tus conocimientos de Bienestar y Liderazgo
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Responde 4 preguntas sobre las dimensiones de bienestar, apoyos socioeconómicos y la figura del vocero para obtener la insignia <strong>Líder de Comunidad</strong>.
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
              <span>Iniciar Evaluación Módulo 4</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </section>
    </div>
  );
};
