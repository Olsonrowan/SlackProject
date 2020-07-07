
import { auth } from '../services/firebase'
import React, { useState, useEffect } from 'react'
import { app } from '../services/firebase'

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password)
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password)
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider()
  return auth().signInWithPopup()
}
export function signout() {
  return auth().signOut()
}

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) =>{
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() =>{
    app.auth().onAuthStateChanged(setCurrentUser);
}, []);

return (
  <AuthContext.Provider
  value={{
    currentUser
  }}
  >
    {children}
  </AuthContext.Provider>
);
};
