// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-c0d75.firebaseapp.com",
  projectId: "pet-adopt-c0d75",
  storageBucket: "pet-adopt-c0d75.appspot.com",
  messagingSenderId: "1032949836434",
  appId: "1:1032949836434:web:daaa782f0d4d38974b944b",
  measurementId: "G-M8K1THWS1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const auth = getAuth(app);

export { auth };
//const analytics = getAnalytics(app);