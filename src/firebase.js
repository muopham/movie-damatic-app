import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClck2IdhDMz0VPl5AgUEhmebgkA1aKIbE",
  authDomain: "dramatic-movie.firebaseapp.com",
  projectId: "dramatic-movie",
  storageBucket: "dramatic-movie.appspot.com",
  messagingSenderId: "874611822796",
  appId: "1:874611822796:web:d4e82b883c122a2b2ff269",
  measurementId: "G-TQ2L3SN3W3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
