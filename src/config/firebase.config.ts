import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAL35kXyI1Sj4I1Ial7q4H8DpwOtQfVJjc",
  authDomain: "helpuzzy-3956a.firebaseapp.com",
  projectId: "helpuzzy-3956a",
  storageBucket: "helpuzzy-3956a.appspot.com",
  messagingSenderId: "406474360503",
  appId: "1:406474360503:web:fc842e22b4e9c8b24cef32",
  measurementId: "G-P35NWN1CXS"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
