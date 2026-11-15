import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyBYwIszncVzLT_VFPt965kpm5Pu32vPX-E",
  authDomain: "ictgc-club.firebaseapp.com",
  projectId: "ictgc-club",
  storageBucket: "ictgc-club.firebasestorage.app",
  messagingSenderId: "121934416271",
  appId: "1:121934416271:web:a03c81920f31c3436b23fa",
  measurementId: "G-B5CJH5LXDY"
};

// Initialize Firebase for SSR / Client safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics client-only safe initialization
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};
