import React, { useState, useEffect, useRef } from 'react';
import { ApprenticeProfile, ModuleId } from '../types/induction';
import {
  ReglamentoEvaluationQuestion,
  REGLAMENTO_SECTIONS_META,
  REGLAMENTO_UNIFIED_QUESTIONS,
  GamifiedLeaderboardEntry,
  getLeaderboard,
  saveLeaderboardEntry,
} from '../data/reglamentoEvaluationData';
import { recordApprenticeSubmission } from '../utils/submissionsManager';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Timer,
  Award,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Zap,
  Clock,
  Shield,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  User,
  Users,
  IdCard,
  Building,
  GraduationCap,
  X,
  Medal,
  Play,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface UnifiedReglamentoEvaluationModalProps {
  initialProfile: ApprenticeProfile;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: ApprenticeProfile, scorePercent: number) => void;
}

type Stage = 'data_entry' | 'in_quiz' | 'results_ranking';

export const UnifiedReglamentoEvaluationModal: React.FC<UnifiedReglamentoEvaluationModalProps> = ({
  initialProfile,
  isOpen,
  onClose,
  onComplete,
}) => {
  // Form profile state
  const [profile, setProfile] = useState<ApprenticeProfile>(initialProfile);

  // Stage state
  const [stage, setStage] = useState<Stage>('data_entry');

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Gamification Scores & Streak
  const [totalScore, setTotalScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedPointsThisQuestion, setEarnedPointsThisQuestion] = useState(0);
  const [speedBonusThisQuestion, setSpeedBonusThisQuestion] = useState(0);

  // Question answers history: questionId -> boolean
  const [answersHistory, setAnswersHistory] = useState<Record<string, { isCorrect: boolean; timeSeconds: number }>>({});

  // Chronometer / Timer state
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [questionSeconds, setQuestionSeconds] = useState(0);
  const timerIntervalRef = useRef<number | null>(null);

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState<GamifiedLeaderboardEntry[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);

  // Shake animation trigger for wrong answer
  const [isWrongShaking, setIsWrongShaking] = useState(false);

  // Sync profile when initialProfile changes
  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  // Handle global and per-question chronometer
  useEffect(() => {
    if (stage === 'in_quiz') {
      timerIntervalRef.current = window.setInterval(() => {
        setTotalSeconds(prev => prev + 1);
        setQuestionSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [stage]);

  // Load leaderboard when opened
  useEffect(() => {
    if (isOpen) {
      setLeaderboard(getLeaderboard());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const questions = REGLAMENTO_UNIFIED_QUESTIONS;
  const currentQ = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const currentSectionMeta = REGLAMENTO_SECTIONS_META.find(s => s.id === currentQ?.sectionId) || REGLAMENTO_SECTIONS_META[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || !profile.docNumber || !profile.fichaNumber) {
      alert('Por favor completa los datos obligatorios para comenzar la prueba.');
      return;
    }

    // Persist updated profile
    try {
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
    } catch {
      // Ignore
    }

    // Reset quiz state
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTotalScore(0);
    setStreakCount(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setTotalSeconds(0);
    setQuestionSeconds(0);
    setAnswersHistory({});
    setStage('in_quiz');
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    const timeTaken = questionSeconds;

    if (isCorrect) {
      // Base points: 100
      const basePoints = 100;
      // Speed bonus: up to +50 points if answered within 15 seconds
      const speedBonus = Math.max(10, Math.round(50 - timeTaken * 2));
      // Streak bonus: +20 points for each streak point above 1
      const newStreak = streakCount + 1;
      const streakBonus = newStreak > 1 ? (newStreak - 1) * 15 : 0;
      const totalEarned = basePoints + speedBonus + streakBonus;

      setEarnedPointsThisQuestion(totalEarned);
      setSpeedBonusThisQuestion(speedBonus);
      setTotalScore(prev => prev + totalEarned);
      setStreakCount(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount(prev => prev + 1);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Ignore
      }
    } else {
      // Wrong answer
      setStreakCount(0);
      setEarnedPointsThisQuestion(0);
      setSpeedBonusThisQuestion(0);

      // Trigger visual shake
      setIsWrongShaking(true);
      setTimeout(() => setIsWrongShaking(false), 500);
    }

    setAnswersHistory(prev => ({
      ...prev,
      [currentQ.id]: { isCorrect, timeSeconds: timeTaken },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setQuestionSeconds(0);
    } else {
      // Finished all 25 questions!
      finishEvaluation();
    }
  };

  const finishEvaluation = () => {
    const accuracy = Math.round((correctCount / totalQuestions) * 100);

    // Save to Leaderboard
    const entry: GamifiedLeaderboardEntry = {
      id: `lb-${Date.now()}`,
      name: profile.name,
      docNumber: profile.docNumber,
      fichaNumber: profile.fichaNumber,
      programName: profile.programName,
      regional: profile.regional,
      totalScore,
      totalTimeSeconds: totalSeconds,
      accuracyPercent: accuracy,
      correctAnswers: correctCount,
      totalQuestions,
      date: new Date().toLocaleDateString('es-CO'),
    };

    const updatedLeaderboard = saveLeaderboardEntry(entry);
    setLeaderboard(updatedLeaderboard);

    // Find ranking
    const rankIndex = updatedLeaderboard.findIndex(e => e.docNumber === profile.docNumber);
    setMyRank(rankIndex >= 0 ? rankIndex + 1 : null);

    // Record submission quietly into the instructor's queue
    recordApprenticeSubmission(profile, ['reglamento', 'identidad'], {
      moduleId: 'reglamento',
      correctCount,
      total: totalQuestions,
    });

    onComplete(profile, accuracy);
    setStage('results_ranking');

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch {
      // Ignore
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTotalScore(0);
    setStreakCount(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setTotalSeconds(0);
    setQuestionSeconds(0);
    setAnswersHistory({});
    setStage('in_quiz');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/85 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto flex flex-col max-h-[94vh] transition-colors">
        {/* Global Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shadow-xs">
              <SenaLogo className="w-6 h-6 text-[#39A900]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  Evaluación Unificada del Reglamento del Aprendiz
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Acuerdo 0009 de 2024
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                5 preguntas por sección · Cronómetro de velocidad · Ranking Gamificado
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* ETAPA 1: INGRESO Y CONFIRMACIÓN DE DATOS DEL APRENDIZ */}
        {/* ======================================================== */}
        {stage === 'data_entry' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#00324D] to-[#004e75] text-white flex items-center justify-between gap-4 shadow-md">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <Trophy className="w-4 h-4" />
                    <span>Desafío Institucional Cronometrado</span>
                  </span>
                  <h4 className="text-lg font-black tracking-tight">
                    Comprueba tu Dominio Normativo SENA
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Responde 25 preguntas (5 de cada sección). Gana puntos por responder bien, rápido y sin equivocarte para posicionarte en el ranking de tu ficha.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center shrink-0">
                  <Zap className="w-6 h-6 text-amber-300 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-200 mt-0.5">25 Preguntas</span>
                </div>
              </div>

              {/* Formulario de Datos Oficiales */}
              <form onSubmit={handleStartEvaluation} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <IdCard className="w-4 h-4 text-[#39A900]" />
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Datos del Aprendiz para Registro de Respuestas
                  </h5>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={profile.name}
                      onChange={e => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Ej. Juan Carlos Pérez"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Tipo Doc.
                      </label>
                      <select
                        value={profile.docType}
                        onChange={e => setProfile({ ...profile, docType: e.target.value as any })}
                        className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      >
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                        <option value="CE">CE</option>
                        <option value="PEP">PEP</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.docNumber}
                        onChange={e => setProfile({ ...profile, docNumber: e.target.value })}
                        placeholder="1020304050"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Número de Ficha *
                    </label>
                    <input
                      type="text"
                      required
                      value={profile.fichaNumber}
                      onChange={e => setProfile({ ...profile, fichaNumber: e.target.value })}
                      placeholder="2874102"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Correo Electrónico (MiSENA) *
                    </label>
                    <input
                      type="email"
                      required
                      value={profile.email}
                      onChange={e => setProfile({ ...profile, email: e.target.value })}
                      placeholder="correo@misena.edu.co"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Regional SENA
                    </label>
                    <input
                      type="text"
                      value={profile.regional}
                      onChange={e => setProfile({ ...profile, regional: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Programa de Formación
                    </label>
                    <input
                      type="text"
                      value={profile.programName}
                      onChange={e => setProfile({ ...profile, programName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>
                </div>

                {/* Banner de Secciones Incluidas */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Estructura de las 25 Preguntas:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px]">
                    {REGLAMENTO_SECTIONS_META.map((meta, i) => (
                      <div key={meta.id} className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-0.5">
                        <span className="font-bold text-[#39A900] block">Sección {i + 1}</span>
                        <span className="text-slate-600 dark:text-slate-400 line-clamp-1">{meta.articlesRange}</span>
                        <span className="text-[10px] font-mono text-slate-400">(5 preguntas)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 text-sm font-black text-white bg-[#39A900] hover:bg-[#2d8500] rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Iniciar Evaluación Cronometrada</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* ETAPA 2: EVALUACIÓN EN CURSO CON CRONÓMETRO Y GAMIFICACIÓN */}
        {/* ======================================================== */}
        {stage === 'in_quiz' && currentQ && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
            {/* Gamified HUD Bar: Timer, Score, Streak, Section */}
            <div className="p-4 rounded-2xl bg-[#00324D] text-white flex flex-wrap items-center justify-between gap-4 shadow-sm border border-cyan-500/20">
              {/* Section Badge & Question Counter */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>{currentSectionMeta.shortTitle}</span>
                  <span>·</span>
                  <span>{currentSectionMeta.articlesRange}</span>
                </div>
                <div className="text-sm font-extrabold flex items-center gap-2">
                  <span>Pregunta {currentQuestionIndex + 1} de {totalQuestions}</span>
                  <span className="text-xs text-slate-300 font-normal">
                    (Pregunta {currentQ.questionNumberInSection} de 5 de esta sección)
                  </span>
                </div>
              </div>

              {/* HUD Metrics */}
              <div className="flex items-center gap-4 text-xs font-mono">
                {/* Live Chronometer */}
                <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10" title="Tiempo total transcurrido">
                  <Timer className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="font-bold text-white text-sm">{formatTime(totalSeconds)}</span>
                </div>

                {/* Question Speed Stopwatch */}
                <div className="hidden sm:flex items-center gap-1.5 bg-black/20 px-2.5 py-1.5 rounded-xl text-slate-300 text-[11px]" title="Tiempo en esta pregunta">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{questionSeconds}s</span>
                </div>

                {/* Score */}
                <div className="flex items-center gap-1.5 bg-[#39A900]/20 px-3 py-1.5 rounded-xl border border-[#39A900]/40 text-[#39A900]">
                  <Trophy className="w-4 h-4" />
                  <span className="font-extrabold text-sm text-white">{totalScore}</span>
                  <span className="text-[10px] text-emerald-300">pts</span>
                </div>

                {/* Streak Badge */}
                {streakCount > 1 && (
                  <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-1.5 rounded-xl border border-amber-500/40 text-amber-300 animate-bounce">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-xs">{streakCount}x Racha</span>
                  </div>
                )}
              </div>
            </div>

            {/* Global Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Progreso General</span>
                <span className="font-mono font-bold text-[#39A900]">
                  {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#39A900] via-[#00e5ff] to-[#38bdf8] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className={`p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-5 ${isWrongShaking ? 'animate-bounce' : ''}`}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 border border-[#39A900]/30 font-mono">
                  {currentQ.articleReference}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let optionStyle =
                    'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#39A900] hover:bg-emerald-50/30';

                  if (isAnswered) {
                    if (isCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500/30';
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        'border-red-400 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-100 line-through ring-1 ring-red-400/40';
                    } else {
                      optionStyle =
                        'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${optionStyle} ${
                        !isAnswered ? 'active:scale-[0.99] cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* =================================================== */}
              {/* FEEDBACK & REFUERZOS INTERACTIVOS (POSITIVO Y FORMATIVO) */}
              {/* =================================================== */}
              {isAnswered && (
                <div className="pt-2 animate-fadeIn">
                  {selectedOption === currentQ.correctIndex ? (
                    /* REFUERZO POSITIVO */
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-emerald-950/60 dark:to-emerald-900/30 border border-emerald-500/40 text-emerald-950 dark:text-emerald-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-bold">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="text-xs font-black text-emerald-900 dark:text-emerald-200">
                              {currentQ.positiveReinforcement.title}
                            </h5>
                            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                              +{earnedPointsThisQuestion} puntos ganados (+{speedBonusThisQuestion} por rapidez)
                            </span>
                          </div>
                        </div>

                        {streakCount > 1 && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold">
                            🔥 Combo x{streakCount}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                        {currentQ.positiveReinforcement.message}
                      </p>

                      <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-emerald-500/20 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                        <strong>Fundamento legal:</strong> {currentQ.positiveReinforcement.normDetail}
                      </div>
                    </div>
                  ) : (
                    /* REFUERZO FORMATIVO (CORRECTIVO CON APRENDIZAJE) */
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50/60 dark:from-amber-950/50 dark:to-rose-950/30 border border-amber-500/40 text-amber-950 dark:text-amber-100 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-amber-900 dark:text-amber-200">
                            {currentQ.correctiveReinforcement.title}
                          </h5>
                          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                            Identifiquemos la norma para afianzar tu Saber
                          </span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1.5 leading-relaxed">
                        <p className="text-slate-700 dark:text-slate-300">
                          <strong className="text-amber-800 dark:text-amber-300">¿En qué fallaste?</strong>{' '}
                          {currentQ.correctiveReinforcement.whyWrong}
                        </p>
                        <p className="text-emerald-800 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
                          <strong>Regla oficial:</strong> {currentQ.correctiveReinforcement.correctNorm}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        💡 {currentQ.correctiveReinforcement.keyLearning}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Aciertos: <strong className="text-[#39A900]">{correctCount}</strong> de {currentQuestionIndex + 1}
              </div>

              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-black text-white bg-[#39A900] hover:bg-[#2d8500] rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>
                    {currentQuestionIndex + 1 === totalQuestions ? 'Ver Resultados y Ranking' : 'Siguiente Pregunta'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* ETAPA 3: RESULTADOS Y RANKING GAMIFICADO */}
        {/* ======================================================== */}
        {stage === 'results_ranking' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
            {/* Banner de Victoria & Puntaje */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#00324D] via-[#004e75] to-[#121836] text-white text-center space-y-4 shadow-xl border border-cyan-500/30 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-[#39A900] text-white mx-auto flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  ¡Prueba de Reglamento Concluida!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {profile.name}
                </h3>
                <p className="text-xs text-slate-300">
                  Ficha {profile.fichaNumber} · {profile.programName}
                </p>
              </div>

              {/* Grid de Métricas Finales */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="text-[10px] text-slate-300 block">Puntaje Total</span>
                  <span className="text-xl font-black text-amber-300">{totalScore}</span>
                  <span className="text-[10px] text-slate-300 block">pts</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="text-[10px] text-slate-300 block">Tiempo Total</span>
                  <span className="text-xl font-black text-cyan-300">{formatTime(totalSeconds)}</span>
                  <span className="text-[10px] text-slate-300 block">minutos</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="text-[10px] text-slate-300 block">Aciertos</span>
                  <span className="text-xl font-black text-[#39A900]">{correctCount}/25</span>
                  <span className="text-[10px] text-slate-300 block">{Math.round((correctCount / 25) * 100)}%</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="text-[10px] text-slate-300 block">Posición en Ranking</span>
                  <span className="text-xl font-black text-white">#{myRank || 1}</span>
                  <span className="text-[10px] text-emerald-300 block">de {leaderboard.length}</span>
                </div>
              </div>
            </div>

            {/* TABLA DE RANKING GAMIFICADO */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-amber-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Ranking Gamificado de Aprendices SENA
                  </h4>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Ordenado por Puntos y Velocidad
                </span>
              </div>

              {/* Podio Top 3 */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center pt-2">
                {/* 2º Puesto */}
                {leaderboard[1] && (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center">
                      🥈 2
                    </span>
                    <div className="my-1.5">
                      <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {leaderboard[1].name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">{leaderboard[1].fichaNumber}</div>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 font-mono">
                      {leaderboard[1].totalScore} pts
                    </span>
                  </div>
                )}

                {/* 1º Puesto */}
                {leaderboard[0] && (
                  <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/60 dark:from-amber-950/60 dark:to-amber-900/30 border-2 border-amber-400 flex flex-col items-center justify-between shadow-md">
                    <span className="w-8 h-8 rounded-full bg-amber-400 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      👑 1
                    </span>
                    <div className="my-1.5">
                      <div className="text-xs font-black text-amber-950 dark:text-amber-100 line-clamp-1">
                        {leaderboard[0].name}
                      </div>
                      <div className="text-[10px] font-mono text-amber-800 dark:text-amber-300">{leaderboard[0].fichaNumber}</div>
                    </div>
                    <span className="text-sm font-black text-amber-700 dark:text-amber-300 font-mono">
                      {leaderboard[0].totalScore} pts
                    </span>
                  </div>
                )}

                {/* 3º Puesto */}
                {leaderboard[2] && (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center">
                      🥉 3
                    </span>
                    <div className="my-1.5">
                      <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {leaderboard[2].name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">{leaderboard[2].fichaNumber}</div>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 font-mono">
                      {leaderboard[2].totalScore} pts
                    </span>
                  </div>
                )}
              </div>

              {/* Tabla de clasificación */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/80">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#00324D] text-white font-semibold">
                    <tr>
                      <th className="px-3 py-2.5 text-center">#</th>
                      <th className="px-3.5 py-2.5">Aprendiz</th>
                      <th className="px-3 py-2.5">Ficha</th>
                      <th className="px-3 py-2.5">Tiempo</th>
                      <th className="px-3 py-2.5">Aciertos</th>
                      <th className="px-3.5 py-2.5 text-right">Puntaje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 bg-white dark:bg-slate-800/40">
                    {leaderboard.map((item, index) => {
                      const isMe = item.docNumber === profile.docNumber;
                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors ${
                            isMe ? 'bg-emerald-50/80 dark:bg-emerald-950/40 font-semibold' : ''
                          }`}
                        >
                          <td className="px-3 py-2.5 text-center font-bold">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`}
                          </td>
                          <td className="px-3.5 py-2.5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-900 dark:text-white">{item.name}</span>
                              {isMe && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#39A900] text-white">
                                  Tú
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2.5 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {item.fichaNumber}
                          </td>
                          <td className="px-3 py-2.5 font-mono text-slate-500 whitespace-nowrap">
                            {formatTime(item.totalTimeSeconds)}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-slate-700 dark:text-slate-300 font-mono">
                            {item.correctAnswers}/25 ({item.accuracyPercent}%)
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono font-black text-[#39A900] whitespace-nowrap">
                            {item.totalScore} pts
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleRetryQuiz}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Intentar nuevamente para mejorar posición</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-black text-white bg-[#39A900] hover:bg-[#2d8500] rounded-xl shadow-md transition-all active:scale-95"
              >
                Volver a la Plataforma Institucional
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
