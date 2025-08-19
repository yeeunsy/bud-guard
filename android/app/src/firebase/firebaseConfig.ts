// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfw5wWhNGZCF0nU12olRgGBWyrlYYlIVs",
  authDomain: "com.budguard.app",
  projectId: "bud-guard",
  storageBucket: "bud-guard.firebasestorage.app",
  messagingSenderId: "1097366144912",
  appId: "1:1097366144912:android:f33320d3323341690a9515"
  // measurementId: "G-4SSDYG9GFK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
