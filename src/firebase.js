import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDKga7fW3xvPsvQjFkJoaszPGk5yiaXsnM",
  authDomain: "devdeakin-412c0.firebaseapp.com",
  projectId: "devdeakin-412c0",
  storageBucket: "devdeakin-412c0.appspot.com",
  messagingSenderId: "439593689033",
  appId: "1:439593689033:web:acc22d6cf644658c269218",
  measurementId: "G-Z7MYBHVBHV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, doc, setDoc };
