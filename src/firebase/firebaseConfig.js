// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

export { auth };
