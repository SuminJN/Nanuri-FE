// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Q3V0cSYhwBI19d3367xwPpkbWHGz40U",
  authDomain: "nanuri-21b7e.firebaseapp.com",
  projectId: "nanuri-21b7e",
  storageBucket: "nanuri-21b7e.firebasestorage.app",
  messagingSenderId: "804510998278",
  appId: "1:804510998278:web:0f258fc5f7cd76ec060887",
  measurementId: "G-7B2HX132HX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
