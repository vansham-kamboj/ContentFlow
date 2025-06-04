
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

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
let authInstance: Auth | null = null;

// These keys are essential for Firebase to initialize core services, especially auth.
const requiredEnvVars: (keyof typeof firebaseConfig)[] = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId', // App ID is crucial for Firebase services
];

const missingEnvVars = requiredEnvVars.filter(key => {
  const value = firebaseConfig[key];
  return !value || value.trim() === ''; // Check for undefined, null, or empty string
});

if (missingEnvVars.length > 0) {
  console.error(
    `Firebase Initialization Error: The following required environment variables are missing or effectively empty: ${missingEnvVars.join(', ')}.`
  );
  console.error(
    'This means that when the application tried to read these values (e.g., `process.env.NEXT_PUBLIC_FIREBASE_API_KEY`), they were undefined or an empty string.'
  );
  console.error(
    'CRITICAL: Please ensure all of the following are true:'
  );
  console.error(
    '1. You have a file named exactly `.env` in the ROOT directory of your project (same level as `package.json`).'
  );
  console.error(
    '2. The `.env` file contains the correct variable names (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY=yourActualValue`) AND your actual, valid Firebase project credentials.'
  );
  console.error(
    '3. You have completely STOPPED and then RESTARTED your Next.js development server (e.g., `npm run dev`) AFTER saving any changes to the `.env` file. This is essential for Next.js to load the variables.'
  );
  console.error(
    '4. There are no typos in your variable names or values in the .env file.'
  );
} else {
  if (getApps().length === 0) {
    try {
      app = initializeApp(firebaseConfig);
      console.log("Firebase app initialized successfully.");
    } catch (error) {
      console.error("Firebase Initialization Error: Failed to initialize Firebase app object.", error);
      // If initializeApp itself throws, app will remain null.
    }
  } else {
    app = getApps()[0];
    console.log("Using existing Firebase app instance.");
  }

  if (app) {
    try {
      db = getFirestore(app);
      authInstance = getAuth(app); // This is where auth/invalid-api-key often occurs if keys are bad
      console.log("Firestore and Auth services obtained.");
    } catch (error) {
      console.error("Firebase Initialization Error: Failed to initialize Firestore or Auth services.", error);
      // This is where auth/invalid-api-key would typically be caught if app initialized but config was bad
      db = null;
      authInstance = null;
    }
  } else if (missingEnvVars.length === 0) { 
    // This case should ideally not be reached if missingEnvVars is empty,
    // as initializeApp should succeed or throw.
    console.error("Firebase Initialization Error: Firebase app object is not available, but all required env vars were reported as present. This indicates an unexpected issue during initializeApp.");
  }
}

// Export them, potentially as null if initialization failed
export { app, db, authInstance as auth };
