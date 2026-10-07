import React, { useState } from 'react';
import { ModuleId } from '../types/induction';
import { MODULE_QUIZZES, MODULES_INFO } from '../data/senaData';
import { X, CheckCircle2, XCircle, Award, ChevronRight, RotateCcw } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import confetti from 'canvas-confetti';

interface ModuleQuizModalProps {
  moduleId: ModuleId;
  onClose: () => void;
  onPassed: (modId: ModuleId) => void;
}

export const ModuleQuizModal: React.FC<ModuleQuizModalProps> = ({
  moduleId,
  onClose,
  onPassed,
}) => {
  const moduleInfo = MODULES_INFO.find(m => m.id === moduleId) || MODULES_INFO[0];
  const questions = MODULE_QUIZZES[moduleId] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const passed = correctCount + (selectedOption === currentQ.correctIndex ? 0 : 0) >= 3;
      if (passed) {
        onPassed(moduleId);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore if canvas-confetti is not loaded
        }
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const isPassed = correctCount >= 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-colors">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-[#39A900]/30 flex items-center justify-center p-1 shrink-0">
              <SenaLogo className="w-full h-full text-[#39A900]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider">
                <span>Evaluación de Apropiación</span>
                <span aria-hidden="true">·</span>
                <span>Módulo {moduleInfo.number}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{moduleInfo.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!isFinished ? (
            <>
              {/* Progress Tracker */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Pregunta {currentIndex + 1} de {totalQuestions}</span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">{correctCount} aciertos</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#39A900] h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {currentQ.question}
                </h4>

                {/* Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/70 text-slate-700 dark:text-slate-200';

                    if (isAnswered) {
                      if (optIdx === currentQ.correctIndex) {
                        optionStyle = 'border-emerald-500 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold';
                      } else if (isSelected && optIdx !== currentQ.correctIndex) {
                        optionStyle = 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
                      } else {
                        optionStyle = 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                      >
                        <span className="font-mono font-bold mt-0.5 shrink-0">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                        {isAnswered && optIdx === currentQ.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {isAnswered && isSelected && optIdx !== currentQ.correctIndex && (
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs space-y-1 animate-fadeIn">
                    <span className="font-bold text-slate-900 dark:text-white">Sustentación institucional:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-4">
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                isPassed ? 'bg-emerald-100 dark:bg-emerald-950 text-[#39A900]' : 'bg-rose-100 dark:bg-rose-950 text-rose-600'
              }`}>
                {isPassed ? <Award className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isPassed ? '¡Felicitaciones, Aprendiz!' : 'Puedes hacerlo mejor'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {isPassed
                    ? `Has aprobado satisfactoriamente con ${correctCount} de ${totalQuestions} respuestas correctas.`
                    : `Obtuviste ${correctCount} de ${totalQuestions}. Necesitas al menos 3 aciertos (75%) para desbloquear la insignia.`}
                </p>
              </div>

              {isPassed && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl inline-flex items-center gap-3 text-left">
                  <div className="w-11 h-11 rounded-lg bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 p-1 flex items-center justify-center shrink-0 shadow-xs">
                    <SenaLogo className="w-full h-full text-[#39A900]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Insignia Institucional Desbloqueada</div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{moduleInfo.badgeName}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {!isFinished ? (
            <>
              <button
                onClick={onClose}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
              >
                Salir
              </button>

              <button
                disabled={!isAnswered}
                onClick={handleNext}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isAnswered
                    ? 'bg-[#39A900] hover:bg-[#2d8500] text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>{currentIndex + 1 === totalQuestions ? 'Ver Resultados' : 'Siguiente'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {isPassed ? (
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-lg text-xs font-bold bg-[#39A900] hover:bg-[#2d8500] text-white transition-all shadow-sm"
                >
                  Continuar con la Inducción
                </button>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={onClose}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
                  >
                    Cerrar por ahora
                  </button>
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white flex items-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reintentar Evaluación</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
