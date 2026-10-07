import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ApprenticeProfile } from '../types/induction';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

// Provider with required Google Workspace Scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
// Hint prompt to pick account
provider.setCustomParameters({
  prompt: 'select_account',
});

// Flag to avoid clearing token prematurely during popup
let isSigningIn = false;
// In-memory cache for OAuth access token (never in localStorage per security guidelines)
let cachedAccessToken: string | null = null;

export const SPREADSHEET_TITLE = 'Registro de Aprendices - Inducción SENA';
export const SHEET_TAB_NAME = 'Aprendices Inducción';

export interface SheetApprenticeRecord {
  rowNumber?: number;
  registeredAt: string;
  name: string;
  docType: string;
  docNumber: string;
  email: string;
  regional: string;
  trainingCenter: string;
  programName: string;
  programLevel: string;
  fichaNumber: string;
  status: string;
  modulesApproved: string;
  verificationCode: string;
}

export interface SpreadsheetInfo {
  id: string;
  name: string;
  webViewLink: string;
}

/**
 * Initialize Firebase Auth listener.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else if (!user) {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Google Sign-in with Workspace scopes.
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await firebaseSignOut(auth);
  cachedAccessToken = null;
};

/**
 * Find existing spreadsheet in user's Google Drive.
 */
export const findExistingSpreadsheet = async (token: string): Promise<SpreadsheetInfo | null> => {
  const query = encodeURIComponent(`name='${SPREADSHEET_TITLE}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&pageSize=5`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error al buscar hoja de cálculo en Drive:', errorText);
    throw new Error(`Error en Google Drive API: ${res.status}`);
  }

  const data = await res.json();
  if (data.files && data.files.length > 0) {
    const file = data.files[0];
    return {
      id: file.id,
      name: file.name,
      webViewLink: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
    };
  }

  return null;
};

/**
 * Create a new styled Google Sheet in user's Drive with official SENA headers.
 */
export const createInductionSpreadsheet = async (token: string): Promise<SpreadsheetInfo> => {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets';

  const body = {
    properties: {
      title: SPREADSHEET_TITLE,
    },
    sheets: [
      {
        properties: {
          title: SHEET_TAB_NAME,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'Fecha y Hora' } },
                  { userEnteredValue: { stringValue: 'Nombre del Aprendiz' } },
                  { userEnteredValue: { stringValue: 'Tipo Doc.' } },
                  { userEnteredValue: { stringValue: 'Número Doc.' } },
                  { userEnteredValue: { stringValue: 'Correo Electrónico' } },
                  { userEnteredValue: { stringValue: 'Regional SENA' } },
                  { userEnteredValue: { stringValue: 'Centro de Formación' } },
                  { userEnteredValue: { stringValue: 'Programa de Formación' } },
                  { userEnteredValue: { stringValue: 'Nivel' } },
                  { userEnteredValue: { stringValue: 'Ficha No.' } },
                  { userEnteredValue: { stringValue: 'Estado Inducción' } },
                  { userEnteredValue: { stringValue: 'Módulos Aprobados' } },
                  { userEnteredValue: { stringValue: 'Código Constancia' } },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Error al crear hoja de cálculo:', errText);
    throw new Error(`No se pudo crear la hoja de cálculo en Drive: ${res.status}`);
  }

  const created = await res.json();
  const spreadsheetId = created.spreadsheetId;

  // Apply styling to header (SENA institutional green #39A900 background and bold white text)
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.2235, // #39
                    green: 0.6627, // #A9
                    blue: 0.0, // #00
                  },
                  textFormat: {
                    foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                    bold: true,
                    fontSize: 10,
                  },
                  horizontalAlignment: 'CENTER',
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
            },
          },
        ],
      }),
    });
  } catch (styleErr) {
    console.warn('Could not apply header styling, file created successfully anyway:', styleErr);
  }

  return {
    id: spreadsheetId,
    name: SPREADSHEET_TITLE,
    webViewLink: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
};

/**
 * Ensures the spreadsheet exists; if not, creates it.
 */
export const getOrCreateSpreadsheet = async (token: string): Promise<SpreadsheetInfo> => {
  const existing = await findExistingSpreadsheet(token);
  if (existing) {
    return existing;
  }
  return await createInductionSpreadsheet(token);
};

/**
 * Appends a new apprentice record row to the spreadsheet.
 */
export const appendApprenticeRecord = async (
  token: string,
  spreadsheetId: string,
  profile: ApprenticeProfile,
  unlockedBadges: string[],
  totalModules: number
): Promise<{ updatedRange: string; record: SheetApprenticeRecord }> => {
  const now = new Date();
  const formattedDate = now.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const isCompleted = unlockedBadges.length >= totalModules;
  const status = isCompleted ? 'Completada (100%)' : `En Progreso (${unlockedBadges.length}/${totalModules})`;
  const modulesText = `${unlockedBadges.length}/${totalModules} [${unlockedBadges.join(', ')}]`;
  const verificationCode = `SENA-IND-${profile.fichaNumber}-${profile.docNumber.slice(-4)}-${now.getFullYear()}`;

  const rowValues = [
    formattedDate,
    profile.name,
    profile.docType,
    profile.docNumber,
    profile.email,
    profile.regional,
    profile.trainingCenter,
    profile.programName,
    profile.programLevel,
    profile.fichaNumber,
    status,
    modulesText,
    verificationCode,
  ];

  const range = `'${SHEET_TAB_NAME}'!A1`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Error al registrar aprendiz en Google Sheets:', errText);
    throw new Error(`Error al escribir en Google Sheets: ${res.status}`);
  }

  const result = await res.json();

  const record: SheetApprenticeRecord = {
    registeredAt: formattedDate,
    name: profile.name,
    docType: profile.docType,
    docNumber: profile.docNumber,
    email: profile.email,
    regional: profile.regional,
    trainingCenter: profile.trainingCenter,
    programName: profile.programName,
    programLevel: profile.programLevel,
    fichaNumber: profile.fichaNumber,
    status,
    modulesApproved: modulesText,
    verificationCode,
  };

  return {
    updatedRange: result.updates?.updatedRange || '',
    record,
  };
};

/**
 * Fetch all registered apprentices from the spreadsheet.
 */
export const fetchApprenticeRecords = async (
  token: string,
  spreadsheetId: string
): Promise<SheetApprenticeRecord[]> => {
  const range = `'${SHEET_TAB_NAME}'!A2:M1000`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Error al consultar registros de la hoja:', errText);
    throw new Error(`Error al leer hoja de cálculo: ${res.status}`);
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];

  return rows.map((row, index) => ({
    rowNumber: index + 2,
    registeredAt: row[0] || '—',
    name: row[1] || '—',
    docType: row[2] || '—',
    docNumber: row[3] || '—',
    email: row[4] || '—',
    regional: row[5] || '—',
    trainingCenter: row[6] || '—',
    programName: row[7] || '—',
    programLevel: row[8] || '—',
    fichaNumber: row[9] || '—',
    status: row[10] || '—',
    modulesApproved: row[11] || '—',
    verificationCode: row[12] || '—',
  }));
};
