// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4Y_1YxL_npd0Hm4WDFjdhQMyi5OQNiPM",
  authDomain: "top-food-cca3d.firebaseapp.com",
  projectId: "top-food-cca3d",
  storageBucket: "top-food-cca3d.firebasestorage.app",
  messagingSenderId: "528302964785",
  appId: "1:528302964785:web:f2b65e2681f1eb1c41d510",
  measurementId: "G-777C8Z89YH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app;
