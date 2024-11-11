import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRyH8KHQY0fXGmTASDJBC042nulM0c0aU",
  authDomain: "auth-moha-milon2-5006d.firebaseapp.com",
  projectId: "auth-moha-milon2-5006d",
  storageBucket: "auth-moha-milon2-5006d.firebasestorage.app",
  messagingSenderId: "646036962092",
  appId: "1:646036962092:web:f672a9ab7fdc9537bfca89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
