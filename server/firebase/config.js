// src/firebase/config.js
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWfyEnXdCkXMgtx_mk4DUs_mHO_Zv5nNU",
  authDomain: "hostel-roommate-finder.firebaseapp.com",
  projectId: "hostel-roommate-finder",
  storageBucket: "hostel-roommate-finder.firebasestorage.app",
  messagingSenderId: "650317866850",
  appId: "1:650317866850:web:a9584e6c565b7e871d6e3b",
  measurementId: "G-XPVH47RY0R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
