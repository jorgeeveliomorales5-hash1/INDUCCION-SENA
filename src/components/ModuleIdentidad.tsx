import React, { useState, useEffect } from 'react';
import { INSTITUTIONAL_IDENTITY } from '../data/senaData';
import { anthemPlayer } from '../utils/anthemAudio';
import { Play, Square, Award, Volume2, Calendar, User, Compass, ChevronRight, Check, Download } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import heroImage from '../assets/images/hero_sena_campus_1791319411643.jpg';

interface ModuleIdentidadProps {
  onStartQuiz: () => void;
  isCompleted: boolean;
}

export const ModuleIdentidad: React.FC<ModuleIdentidadProps> = ({ onStartQuiz, isCompleted }) => {
  const [selectedSymbolElement, setSelectedSymbolElement] = useState<'cafe' | 'rueda' | 'caduceo' | 'logosimbolo' | 'bandera'>('logosimbolo');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [currentStanza, setCurrentStanza] = useState<number>(0);

  useEffect(() => {
    return () => {
      anthemPlayer.stop();
    };
  }, []);

  const handleToggleAnthem = () => {
    if (isPlayingAnthem) {
      anthemPlayer.stop();
      setIsPlayingAnthem(false);
    } else {
      setIsPlayingAnthem(true);
      anthemPlayer.play(
        (stanzaIdx) => {
          setCurrentStanza(stanzaIdx);
        },
        () => {
          setIsPlayingAnthem(false);
        }
      );
    }
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header with Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-[#00324D] text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Ambiente de formación tecnológica SENA con aprendices"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00324D] via-[#00324D]/90 to-transparent" />
        </div>

        <div className="relative p-6 sm:p-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900]">
            <span>Módulo 01</span>
            <span aria-hidden="true">·</span>
            <span>Identidad & Símbolos</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            El Orgullo de Ser Aprendiz SENA: Raíces, Misión y Destino
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Desde su fundación en 1957, el Servicio Nacional de Aprendizaje transforma vidas formando a millones de colombianos en habilidades técnicas, tecnológicas y humanas para el progreso del país.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#39A900]" />
              <span>Fundado el 21 de junio de 1957</span>
            </div>
            <span aria-hidden="true" className="opacity-40">·</span>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#39A900]" />
              <span>Fundador: Rodolfo Martínez Tono</span>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-3 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#39A900]" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Misión Institucional</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
            {INSTITUTIONAL_IDENTITY.mision}
          </p>
          <div className="pt-2 text-xs text-slate-400 dark:text-slate-400 italic">
            Cumplimiento del mandato constitucional de invertir en el capital social y técnico de Colombia.
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-3 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0072CE]" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Visión de Futuro</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
            {INSTITUTIONAL_IDENTITY.vision}
          </p>
          <div className="pt-2 text-xs text-slate-400 dark:text-slate-400 italic">
            Liderazgo en formación dual, competencias digitales e innovación tecnológica aplicada.
          </div>
        </div>
      </section>

      {/* Interactive Símbolos SENA Explorer */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Anatomía de los Símbolos SENA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Haz clic en cada componente del Escudo, Logosímbolo o Bandera para descubrir el significado que portas como aprendiz.
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 overflow-x-auto">
            <button
              onClick={() => setSelectedSymbolElement('logosimbolo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedSymbolElement === 'logosimbolo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Logosímbolo
            </button>
            <button
              onClick={() => setSelectedSymbolElement('rueda')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedSymbolElement === 'rueda'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Industria (Piñón)
            </button>
            <button
              onClick={() => setSelectedSymbolElement('cafe')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedSymbolElement === 'cafe'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Campo (Hoja)
            </button>
            <button
              onClick={() => setSelectedSymbolElement('caduceo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedSymbolElement === 'caduceo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Servicios (Caduceo)
            </button>
            <button
              onClick={() => setSelectedSymbolElement('bandera')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedSymbolElement === 'bandera'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bandera
            </button>
          </div>
        </div>

        {/* Visual Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive SVG Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-xl relative min-h-[300px]">
            {selectedSymbolElement === 'logosimbolo' && (
              <div className="flex flex-col items-center animate-fadeIn text-center space-y-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <SenaLogo className="w-44 h-44 text-[#39A900] drop-shadow-xs" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                    Logosímbolo Institucional Oficial
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Vector oficial con cabeza, sigla S-E-N-A y aprendiz en marcha
                  </span>
                </div>
              </div>
            )}

            {selectedSymbolElement === 'rueda' && (
              <div className="flex flex-col items-center animate-fadeIn text-center space-y-4">
                <svg className="w-36 h-36 text-[#00324D] dark:text-slate-200" viewBox="0 0 100 100" fill="currentColor">
                  {/* Gear Wheel representation */}
                  <path d="M44 8 h12 v10 h-12 z M44 82 h12 v10 h-12 z M8 44 h10 v12 h-10 z M82 44 h10 v12 h-10 z" />
                  <path d="M18 24 l8-8 l8 8 l-8 8 z M66 72 l8-8 l8 8 l-8 8 z M74 24 l8 8 l-8 8 l-8-8 z M26 72 l8 8 l-8 8 l-8-8 z" />
                  <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="10" />
                  <circle cx="50" cy="50" r="14" fill="currentColor" />
                </svg>
                <span className="text-xs font-semibold text-[#00324D] dark:text-slate-300 uppercase tracking-wider">
                  Sector Secundario: Industria y Construcción
                </span>
              </div>
            )}

            {selectedSymbolElement === 'cafe' && (
              <div className="flex flex-col items-center animate-fadeIn text-center space-y-4">
                <svg className="w-36 h-36 text-[#15803d] dark:text-emerald-400" viewBox="0 0 100 100" fill="currentColor">
                  {/* Stylized coffee leaf */}
                  <path d="M50 15 C75 30 75 70 50 85 C25 70 25 30 50 15 Z" />
                  <path d="M50 20 L50 82" stroke="white" strokeWidth="2.5" />
                  <path d="M50 35 L62 42 M50 50 L64 57 M50 65 L60 71" stroke="white" strokeWidth="2" />
                  <path d="M50 35 L38 42 M50 50 L36 57 M50 65 L40 71" stroke="white" strokeWidth="2" />
                </svg>
                <span className="text-xs font-semibold text-[#15803d] dark:text-emerald-400 uppercase tracking-wider">
                  Sector Primario: Agropecuario y Campesino
                </span>
              </div>
            )}

            {selectedSymbolElement === 'caduceo' && (
              <div className="flex flex-col items-center animate-fadeIn text-center space-y-4">
                <svg className="w-36 h-36 text-[#0284c7] dark:text-sky-400" viewBox="0 0 100 100" fill="currentColor">
                  {/* Caduceus / Staff of Hermes */}
                  <line x1="50" y1="15" x2="50" y2="88" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="50" cy="18" r="7" />
                  {/* Wings */}
                  <path d="M50 26 C65 15 80 25 75 35 C68 40 55 35 50 35" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path d="M50 26 C35 15 20 25 25 35 C32 40 45 35 50 35" fill="none" stroke="currentColor" strokeWidth="4" />
                  {/* Entwined serpents */}
                  <path d="M35 45 Q50 55 65 65 Q50 75 35 85" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M65 45 Q50 55 35 65 Q50 75 65 85" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <span className="text-xs font-semibold text-[#0284c7] dark:text-sky-400 uppercase tracking-wider">
                  Sector Terciario: Comercio y Servicios
                </span>
              </div>
            )}

            {selectedSymbolElement === 'bandera' && (
              <div className="flex flex-col items-center animate-fadeIn text-center space-y-4">
                <div className="w-48 h-32 bg-white dark:bg-slate-200 border-2 border-slate-300 shadow-md rounded flex items-center justify-center p-2 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50">
                    <div className="text-[10px] font-bold text-[#00324D] text-center leading-tight">
                      ESCUDO<br />SENA
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Bandera Institucional
                </span>
              </div>
            )}
          </div>

          {/* Meaning & Deep Explanation Card */}
          <div className="lg:col-span-7 space-y-4">
            {selectedSymbolElement === 'logosimbolo' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 dark:border dark:border-[#39A900]/30 px-2.5 py-1 rounded">
                    Logosímbolo Institucional Oficial
                  </div>
                  <a
                    href="/sena-logo.svg"
                    download="logosimbolo-sena-oficial.svg"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                    title="Descargar vector oficial SVG"
                  >
                    <Download className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Descargar SVG</span>
                  </a>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  El Aprendiz en Marcha hacia el Futuro
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {INSTITUTIONAL_IDENTITY.simbolos.logosimbolo.descripcion}
                </p>

                {/* Anatomy breakdown of the vector logo */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-[#39A900] block">1. Círculo Superior</span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight">
                      La cabeza del aprendiz, simbolizando la plenitud del pensamiento crítico, intelecto y ética.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-[#39A900] block">2. Franja S-E-N-A</span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight">
                      La sigla institucional que respalda con calidad estatal la formación de los colombianos.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-[#39A900] block">3. Senderos y Marcha</span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight">
                      Brazos enérgicos y caminos convergentes de superación laboral y desarrollo técnico.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">Mensaje formativo:</span> Al portar el carné y uniforme con este símbolo, recuerdas que tu formación no es pasiva: eres el protagonista activo de tu transformación personal, laboral y social.
                </div>
              </div>
            )}

            {selectedSymbolElement === 'rueda' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00324D] dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                  Sector Industrial
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  La Rueda Dentada (Piñón de la Industria)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {INSTITUTIONAL_IDENTITY.simbolos.escudo.elementos[1].descripcion}
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">Campos formativos:</span> Automatización, Mecatrónica, Soldadura, Construcción, Electricidad, Redes y Mantenimiento electromecánico.
                </div>
              </div>
            )}

            {selectedSymbolElement === 'cafe' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#15803d] dark:text-emerald-400 bg-green-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">
                  Sector Agropecuario
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  La Hoja de Café (Fuerza del Campo Colombiano)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {INSTITUTIONAL_IDENTITY.simbolos.escudo.elementos[0].descripcion}
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">Campos formativos:</span> Producción Agropecuaria, Acuicultura, Caficultura de alta calidad, Biotecnología y Agroecología campesina (SENA Emprende Rural).
                </div>
              </div>
            )}

            {selectedSymbolElement === 'caduceo' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded">
                  Sector Comercio y Servicios
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  El Caduceo de Mercurio (Comercio y Tecnología)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {INSTITUTIONAL_IDENTITY.simbolos.escudo.elementos[2].descripcion}
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">Campos formativos:</span> Software, Contabilidad, Mercadeo, Gestión del Talento Humano, Turismo, Hotelería, Salud y Logística Global.
                </div>
              </div>
            )}

            {selectedSymbolElement === 'bandera' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                  Pabellón Institucional
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  La Bandera Blanca de la Paz Educativa
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {INSTITUTIONAL_IDENTITY.simbolos.bandera.descripcion}
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">Protocolo:</span> Se iza en todos los centros de formación junto con el pabellón nacional de Colombia en actos de graduación, inducción y conmemoraciones cívicas.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Himno del SENA Interactive Player */}
      <section className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              <Volume2 className="w-4 h-4" />
              <span>Himno Institucional del SENA</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Canto de Esperanza y Ardor por Colombia
            </h2>
            <p className="text-xs text-slate-400">
              Letra: Luis Alfredo Osorio · Música: Daniel Marlez
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleAnthem}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-md ${
                isPlayingAnthem
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-[#39A900] hover:bg-[#2d8500] text-white'
              }`}
            >
              {isPlayingAnthem ? (
                <>
                  <Square className="w-4 h-4" />
                  <span>Detener Himno</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Reproducir Himno Marcial</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Anthem Stanzas Interactive View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INSTITUTIONAL_IDENTITY.simbolos.himno.estrofas.map((estrofa, index) => {
            const isHighlighted = isPlayingAnthem && currentStanza === index;
            return (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all duration-300 border ${
                  isHighlighted
                    ? 'bg-[#39A900]/15 border-[#39A900] ring-2 ring-[#39A900]/40 text-white'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isHighlighted ? 'text-[#39A900]' : 'text-slate-400'}`}>
                    {estrofa.tipo}
                  </span>
                  {isHighlighted && (
                    <span className="w-2 h-2 rounded-full bg-[#39A900] animate-ping" />
                  )}
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm font-medium leading-relaxed italic">
                  {estrofa.versos.map((verso, vIdx) => (
                    <p key={vIdx} className={isHighlighted ? 'text-white' : 'text-slate-300'}>
                      "{verso}"
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Valores Institucionales */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Valores del Código de Integridad SENA
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Nuestra conducta como aprendices e instructores se fundamenta en principios éticos no negociables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSTITUTIONAL_IDENTITY.valores.map((val, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5 transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#39A900]/15 dark:bg-[#39A900]/25 text-[#39A900] text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{val.name}</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Module Challenge / Evaluation CTA */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wide">
            <Award className="w-4 h-4" />
            <span>Reto de Apropiación Módulo 01</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            ¿Listo para validar tu conocimiento institucional?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Responde 4 preguntas sobre la historia, misión y símbolos del SENA para ganar la insignia oficial <strong>Emblema Institucional</strong>.
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
              <span>Iniciar Evaluación Módulo 1</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </section>
    </div>
  );
};
