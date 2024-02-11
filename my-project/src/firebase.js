// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-99914.firebaseapp.com",
  projectId: "mern-project-99914",
  storageBucket: "mern-project-99914.appspot.com",
  messagingSenderId: "1061209287496",
  appId: "1:1061209287496:web:91635852c8e0ab5251617d"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);