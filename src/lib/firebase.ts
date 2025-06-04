
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
// Import other Firebase services like getFirestore if needed in the future

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

let app: FirebaseApp;
let auth: Auth;
// let db; // Firestore instance

// Check for missing environment variables
const requiredEnvVars: (keyof typeof firebaseConfig)[] = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId',
];
const missingEnvVars = requiredEnvVars.filter(key => !firebaseConfig[key]);

if (missingEnvVars.length > 0) {
  const errorMessage = `Firebase Initialization Error: The following required environment variables are missing or empty in your .env file: ${missingEnvVars.join(', ')}.`;
  console.error(errorMessage);
  console.error(
    'Please ensure your .env file is correctly populated with variables prefixed with NEXT_PUBLIC_ (e.g., NEXT_PUBLIC_FIREBASE_API_KEY) and that you have restarted your development server.'
  );
  // If essential keys are missing, we might not want to proceed with initialization,
  // or Firebase will throw an error anyway. The console error above will be the primary indicator.
}


if (typeof window !== 'undefined' && getApps().length === 0) {
  if (missingEnvVars.length === 0) { // Only initialize if all required vars are present
    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      // db = getFirestore(app); // Initialize Firestore if you re-add it
      console.log('Firebase initialized successfully.');
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      // Potentially re-throw or handle this error to prevent app from breaking further
      // For now, just logging it.
    }
  } else {
    // Create dummy app/auth objects or throw an error to make it clear Firebase isn't usable
    // This path should ideally not be hit if the console errors are heeded.
    app = {} as FirebaseApp; // Avoids further errors if app is accessed before proper init
    auth = {} as Auth;
    console.warn('Firebase could not be initialized due to missing environment variables.');
  }
} else if (getApps().length > 0) {
  app = getApps()[0];
  auth = getAuth(app);
  // db = getFirestore(app);
} else {
  // This case is for server-side rendering, which we might not use with Firebase Auth directly
  // but good to have a placeholder. Or handle as an error if client-side only.
  // For now, create dummy objects to prevent undefined errors if accessed SSR.
  app = {} as FirebaseApp;
  auth = {} as Auth;
}


export { app, auth }; // Export db if you re-add it
