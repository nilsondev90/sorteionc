import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/home/home.pages';
import MetodoVFP from './pages/metodovfp/metodovfp.pages';

import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState, useContext } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

// Utilities
import { auth, db } from './config/firebase.config'
import { userConverter } from './converters/firestore.converters'
import { useAppSelector } from './hooks/redux.hooks'
import { loginUser, logoutUser } from './store/toolkit/user/user.slice'
import LoginPage from './pages/login/login.pages';
import SignUpPage from './pages/sign-up/sign-up.pages';

function App() {

  const [isInitializing, setIsInitializing] = useState(true)

  const dispatch = useDispatch()

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user

      if (isSigningOut) {
        dispatch(logoutUser())

        return setIsInitializing(false)
      }

      const isSigningIn = !isAuthenticated && user

      if (isSigningIn) {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users').withConverter(userConverter),
            where('id', '==', user.uid)
          )
        )

        const userFromFirestore = querySnapshot.docs[0]?.data()

        dispatch(loginUser(userFromFirestore))

        return setIsInitializing(false)
      }

      return setIsInitializing(false)
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metodovfp" element={<MetodoVFP />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
