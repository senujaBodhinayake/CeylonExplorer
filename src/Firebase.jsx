import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYKXuycfYRrIoR74yaeD4RgfUqPgHuYSA",
  authDomain: "ceylon-explorer-7ca51.firebaseapp.com",
  projectId: "ceylon-explorer-7ca51",
  storageBucket: "ceylon-explorer-7ca51.firebasestorage.app",
  messagingSenderId: "783380995965",
  appId: "1:783380995965:web:1decbe2d68c086dbcaf614"
  
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };