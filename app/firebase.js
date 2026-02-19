// app/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmYwHTA0uZroo1LsJ7Txl7BKRxoHhu5gc",
  authDomain: "schoolportalapp-78835.firebaseapp.com",
  projectId: "schoolportalapp-78835",
  storageBucket: "schoolportalapp-78835.firebasestorage.app",
  messagingSenderId: "570442381542",
  appId: "1:570442381542:web:b2bc9d0ae90d6d7414a327",
  measurementId: "G-30NGHXBMF9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);