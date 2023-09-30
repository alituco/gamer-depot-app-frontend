import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBXsIfy1oPQz1UVuLslil0RTeh_rOFdSWc",
  authDomain: "gamer-depot.firebaseapp.com",
  projectId: "gamer-depot",
  storageBucket: "gamer-depot.appspot.com",
  messagingSenderId: "580268968566",
  appId: "1:580268968566:web:79b7f4e0e38ea57836ad57",
  measurementId: "G-HXMDWKKG2Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };