export type ModuleId = 'identidad' | 'formacion' | 'reglamento' | 'bienestar' | 'innovacion';

export interface ApprenticeProfile {
  name: string;
  docType: 'CC' | 'TI' | 'CE' | 'PEP';
  docNumber: string;
  regional: string;
  trainingCenter: string;
  programName: string;
  programLevel: 'Técnico' | 'Tecnólogo' | 'Operario' | 'Especialización Tecnológica';
  fichaNumber: string;
  email: string;
  startDate: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  context: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    articleReference: string;
    feedback: string;
  }[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  moduleId: ModuleId;
  unlockedAt?: string;
}

export interface ModuleData {
  id: ModuleId;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  badgeName: string;
  badgeIcon: string;
  estimatedMinutes: number;
}

export interface ApprenticeSubmission {
  id: string;
  timestamp: string;
  name: string;
  docType: string;
  docNumber: string;
  email: string;
  regional: string;
  trainingCenter: string;
  programName: string;
  programLevel: string;
  fichaNumber: string;
  status: 'Completada (100%)' | 'En progreso';
  unlockedBadges: string[];
  scorePercent: number;
  verificationCode: string;
  syncedToDrive: boolean;
  syncedAt?: string;
  quizScores?: {
    [key in ModuleId]?: {
      passed: boolean;
      correctAnswers: number;
      totalQuestions: number;
      date: string;
    };
  };
}

