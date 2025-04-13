// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHzZfgszrtsnD-Ppz9pMJhrTma-wjnUL0",
  authDomain: "ciii-d1fd8.firebaseapp.com",
  projectId: "ciii-d1fd8",
  storageBucket: "ciii-d1fd8.firebasestorage.app",
  messagingSenderId: "552773418442",
  appId: "1:552773418442:web:90d975e2172281e498e333",
  measurementId: "G-QZK8PL1J08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
