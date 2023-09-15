// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9Rh-0i6NK7xDVJ1faTE66f4OvqdqWaVA",
  authDomain: "sneakers-2f0b9.firebaseapp.com",
  projectId: "sneakers-2f0b9",
  storageBucket: "sneakers-2f0b9.appspot.com",
  messagingSenderId: "535738818460",
  appId: "1:535738818460:web:b8ccd9c11256f8b269f259",
  measurementId: "G-MZZYT7YMGZ",
};

//to initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
