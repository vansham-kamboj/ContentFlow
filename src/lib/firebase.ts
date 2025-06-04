
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

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

const requiredEnvVars: (keyof typeof firebaseConfig)[] = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId', // appId is also crucial for initialization
];

const missingEnvVars = requiredEnvVars.filter(key => !firebaseConfig[key]);

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
    } catch (error) {
      console.error("Firebase Initialization Error: Failed to initialize Firebase app.", error);
      // If initializeApp itself throws, app will remain null.
    }
  } else {
    app = getApps()[0];
  }

  if (app) {
    try {
      db = getFirestore(app);
      authInstance = getAuth(app); // Renamed to authInstance to avoid conflict with export name
    } catch (error) {
      console.error("Firebase Initialization Error: Failed to initialize Firestore or Auth services.", error);
      // This is where auth/invalid-api-key would typically be caught if app initialized but config was bad
      db = null;
      authInstance = null;
    }
  } else {
    console.error("Firebase Initialization Error: Firebase app object is not available. Firestore and Auth services cannot be initialized.");
  }
}

// Export them, potentially as null if initialization failed
export { app, db, authInstance as auth };
