
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Log the raw environment variables as seen by this module
console.log("--- Firebase Environment Variable Check (src/lib/firebase.ts) ---");
console.log(`Attempting to read NEXT_PUBLIC_FIREBASE_API_KEY: ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`);
console.log(`Attempting to read NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`);
console.log(`Attempting to read NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
console.log(`Attempting to read NEXT_PUBLIC_FIREBASE_APP_ID: ${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`);
console.log(`Attempting to read NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`);
console.log(`Attempting to read NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`);
console.log(`Attempting to read NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: ${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`);
console.log("--------------------------------------------------------------------");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

// These keys are essential for Firebase to initialize core services.
const requiredEnvVars: (keyof typeof firebaseConfig)[] = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId',
];

const missingEnvVars = requiredEnvVars.filter(key => {
  const value = firebaseConfig[key];
  return !value || value.trim() === '';
});

if (missingEnvVars.length > 0) {
  console.error(
    `Firebase Initialization Error: The following required environment variables are missing or empty in your .env file: ${missingEnvVars.join(', ')}.`
  );
  console.error(
    'Please ensure your .env file is correctly populated with variables prefixed with NEXT_PUBLIC_ (e.g., NEXT_PUBLIC_FIREBASE_API_KEY) and that you have restarted your development server.'
  );
} else {
  if (getApps().length === 0) {
    try {
      app = initializeApp(firebaseConfig);
      console.log("Firebase app initialized successfully.");
    } catch (error) {
      console.error("Firebase Initialization Error: Failed to initialize Firebase app object.", error);
    }
  } else {
    app = getApps()[0];
    console.log("Using existing Firebase app instance.");
  }

  if (app) {
    try {
      db = getFirestore(app);
      console.log("Firestore service obtained.");
    } catch (error) {
      console.error("Firebase Initialization Error: Failed to initialize Firestore service.", error);
      db = null;
    }
  } else if (missingEnvVars.length === 0) {
    console.error("Firebase Initialization Error: Firebase app object is not available, but all required env vars were reported as present. This indicates an unexpected issue during initializeApp.");
  }
}

export { app, db };
