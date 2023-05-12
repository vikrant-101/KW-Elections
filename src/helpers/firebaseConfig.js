// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIxqQrEnU18bW--EWpFph19N6q7LgdUDw",
  authDomain: "kwelections.firebaseapp.com",
  projectId: "kwelections",
  storageBucket: "kwelections.appspot.com",
  messagingSenderId: "596066924767",
  appId: "1:596066924767:web:8d58e8c310fd54c846916a",
  measurementId: "G-9DXF74V1HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
