import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Multi-environment config
const getFirebaseConfig = () => {
  // Try environment variables first (for Vercel/Production)
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    console.log("Firebase: Using environment variables");
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID
    };
  }
  
  // For AI Studio local development, we'll try to use the window object or a global
  // @ts-ignore
  const localConfig = window.__FIREBASE_CONFIG__;
  if (localConfig && localConfig.apiKey) {
    console.log("Firebase: Using local fallback config");
    return localConfig;
  }

  console.warn("Firebase: No configuration found!");
  return {};
};

const firebaseConfig = getFirebaseConfig();

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
