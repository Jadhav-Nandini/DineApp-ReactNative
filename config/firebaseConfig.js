// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFWrIas_okRr8lf86feHkh8SkuE1SIG7Y",
  authDomain: "dine-app-react-native.firebaseapp.com",
  projectId: "dine-app-react-native",
  storageBucket: "dine-app-react-native.firebasestorage.app",
  messagingSenderId: "136650515601",
  appId: "1:136650515601:web:46570a58deaf94ad7f8b30",
  measurementId: "G-QXPQ5DQC1T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);