import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHzZfgszrtsnD-Ppz9pMJhrTma-wjnUL0",
  authDomain: "ciii-d1fd8.firebaseapp.com",
  projectId: "ciii-d1fd8",
  storageBucket: "ciii-d1fd8.firebasestorage.app",
  messagingSenderId: "552773418442",
  appId: "1:552773418442:web:90d975e2172281e498e333",
  measurementId: "G-QZK8PL1J08"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);

export default app;
