import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUZ78JJqHi3_s1ywI7POqt7I7I0ECcYdY",
  authDomain: "miniblog-15b16.firebaseapp.com",
  projectId: "miniblog-15b16",
  storageBucket: "miniblog-15b16.appspot.com",
  messagingSenderId: "56952887535",
  appId: "1:56952887535:web:bba0f5fa3679d3ec05e31a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export {db, auth};