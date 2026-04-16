import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigRaw from '../firebase-applet-config.json';

const firebaseConfig = {
  ...firebaseConfigRaw,
  // Ensure we use the correct firestore database ID from config
};

const app = initializeApp(firebaseConfig);
// @ts-ignore - firestoreDatabaseId is a custom field in our config for getFirestore
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Connectivity check as per instructions
async function testConnection() {
  try {
    // Attempt to fetch a dummy doc to verify connection
    await getDocFromServer(doc(db, '_internal', 'connectivity_test'));
    console.log("Firebase connection established successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client appears to be offline or config is invalid.");
    }
    // We expect a "not found" or "permission denied" error if connected but doc doesn't exist/no permissions
    // which effectively confirms the SDK reached the server.
  }
}

testConnection();
