import { ApprenticeProfile, ModuleId, ApprenticeSubmission } from '../types/induction';
import { MODULES_INFO } from '../data/senaData';

export const ADMIN_EMAIL = 'jorgeeveliomorales5@gmail.com';
export const ADMIN_DEFAULT_PIN = 'SENA2024';
const SUBMISSIONS_STORAGE_KEY = 'sena_apprentice_submissions_v2';
const ADMIN_AUTH_KEY = 'sena_instructor_admin_session';

export const INITIAL_SEEDED_SUBMISSIONS: ApprenticeSubmission[] = [
  {
    id: 'sub-1020789456-2874102',
    timestamp: '06/10/2026, 09:30 a. m.',
    name: 'Alejandro Morales Rivera',
    docType: 'CC',
    docNumber: '1020789456',
    email: 'amorales.adso@misena.edu.co',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    programLevel: 'Tecnólogo',
    fichaNumber: '2874102',
    status: 'Completada (100%)',
    unlockedBadges: ['identidad', 'formacion', 'reglamento', 'bienestar', 'innovacion'],
    scorePercent: 100,
    verificationCode: 'SENA-IND-2874102-9456-2026',
    syncedToDrive: true,
    syncedAt: '06/10/2026, 09:35 a. m.',
    quizScores: {
      identidad: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
      formacion: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
      reglamento: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
      bienestar: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
      innovacion: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
    },
  },
  {
    id: 'sub-1033456789-2874102',
    timestamp: '06/10/2026, 11:15 a. m.',
    name: 'Valentina Gómez Restrepo',
    docType: 'CC',
    docNumber: '1033456789',
    email: 'vgomez.restrepo@misena.edu.co',
    regional: 'Regional Antioquia',
    trainingCenter: 'Centro de Formación en Diseño, Confección y Moda',
    programName: 'Desarrollo de Medios Gráficos Visuales',
    programLevel: 'Tecnólogo',
    fichaNumber: '2874102',
    status: 'Completada (100%)',
    unlockedBadges: ['identidad', 'formacion', 'reglamento', 'bienestar', 'innovacion'],
    scorePercent: 95,
    verificationCode: 'SENA-IND-2874102-6789-2026',
    syncedToDrive: true,
    syncedAt: '06/10/2026, 11:20 a. m.',
    quizScores: {
      identidad: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
      formacion: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
      reglamento: { passed: true, correctAnswers: 3, totalQuestions: 4, date: '06/10/2026' },
      bienestar: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
      innovacion: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '06/10/2026' },
    },
  },
  {
    id: 'sub-1098765432-2901234',
    timestamp: '07/10/2026, 08:45 a. m.',
    name: 'Carlos Andrés Benítez',
    docType: 'TI',
    docNumber: '1098765432',
    email: 'cbenitez@misena.edu.co',
    regional: 'Regional Santander',
    trainingCenter: 'Centro Industrial y del Desarrollo Tecnológico',
    programName: 'Mantenimiento Electromecánico Industrial',
    programLevel: 'Técnico',
    fichaNumber: '2901234',
    status: 'En progreso',
    unlockedBadges: ['identidad', 'formacion', 'reglamento'],
    scorePercent: 60,
    verificationCode: 'SENA-IND-2901234-5432-2026',
    syncedToDrive: false,
    quizScores: {
      identidad: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '07/10/2026' },
      formacion: { passed: true, correctAnswers: 3, totalQuestions: 4, date: '07/10/2026' },
      reglamento: { passed: true, correctAnswers: 4, totalQuestions: 4, date: '07/10/2026' },
    },
  },
];

export const getStoredSubmissions = (): ApprenticeSubmission[] => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_SUBMISSIONS));
      return INITIAL_SEEDED_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEEDED_SUBMISSIONS;
  }
};

export const saveSubmissions = (subs: ApprenticeSubmission[]): void => {
  try {
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(subs));
  } catch (err) {
    console.error('Error saving submissions:', err);
  }
};

export const recordApprenticeSubmission = (
  profile: ApprenticeProfile,
  unlockedBadges: string[],
  latestQuiz?: { moduleId: ModuleId; correctCount: number; total: number }
): ApprenticeSubmission => {
  const currentList = getStoredSubmissions();
  const submissionId = `sub-${profile.docNumber}-${profile.fichaNumber}`;
  const now = new Date();
  const timestamp = now.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const isCompleted = unlockedBadges.length >= MODULES_INFO.length;
  const scorePercent = Math.round((unlockedBadges.length / MODULES_INFO.length) * 100);
  const verificationCode = `SENA-IND-${profile.fichaNumber}-${profile.docNumber.slice(-4)}-${now.getFullYear()}`;

  const existingIdx = currentList.findIndex(s => s.id === submissionId);
  let updatedRecord: ApprenticeSubmission;

  if (existingIdx >= 0) {
    const prev = currentList[existingIdx];
    const prevScores = prev.quizScores || {};
    if (latestQuiz) {
      prevScores[latestQuiz.moduleId] = {
        passed: latestQuiz.correctCount >= 3,
        correctAnswers: latestQuiz.correctCount,
        totalQuestions: latestQuiz.total,
        date: now.toLocaleDateString('es-CO'),
      };
    }

    updatedRecord = {
      ...prev,
      timestamp,
      name: profile.name,
      docType: profile.docType,
      docNumber: profile.docNumber,
      email: profile.email,
      regional: profile.regional,
      trainingCenter: profile.trainingCenter,
      programName: profile.programName,
      programLevel: profile.programLevel,
      fichaNumber: profile.fichaNumber,
      status: isCompleted ? 'Completada (100%)' : 'En progreso',
      unlockedBadges,
      scorePercent,
      verificationCode,
      quizScores: prevScores,
      // Keep synced flag unless newly updated
      syncedToDrive: isCompleted && prev.status === 'Completada (100%)' ? prev.syncedToDrive : false,
    };
    currentList[existingIdx] = updatedRecord;
  } else {
    const quizScores: ApprenticeSubmission['quizScores'] = {};
    if (latestQuiz) {
      quizScores[latestQuiz.moduleId] = {
        passed: latestQuiz.correctCount >= 3,
        correctAnswers: latestQuiz.correctCount,
        totalQuestions: latestQuiz.total,
        date: now.toLocaleDateString('es-CO'),
      };
    }

    updatedRecord = {
      id: submissionId,
      timestamp,
      name: profile.name,
      docType: profile.docType,
      docNumber: profile.docNumber,
      email: profile.email,
      regional: profile.regional,
      trainingCenter: profile.trainingCenter,
      programName: profile.programName,
      programLevel: profile.programLevel,
      fichaNumber: profile.fichaNumber,
      status: isCompleted ? 'Completada (100%)' : 'En progreso',
      unlockedBadges,
      scorePercent,
      verificationCode,
      syncedToDrive: false,
      quizScores,
    };
    currentList.unshift(updatedRecord);
  }

  saveSubmissions(currentList);
  return updatedRecord;
};

export const markSubmissionSynced = (submissionId: string): void => {
  const currentList = getStoredSubmissions();
  const now = new Date().toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const updated = currentList.map(s => {
    if (s.id === submissionId) {
      return {
        ...s,
        syncedToDrive: true,
        syncedAt: now,
      };
    }
    return s;
  });

  saveSubmissions(updated);
};

export const isInstructorAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setInstructorAuthenticated = (status: boolean): void => {
  try {
    if (status) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch {
    // Ignore
  }
};
