import { auth } from '@/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendEmailVerification,
} from 'firebase/auth'

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const registerWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  await sendEmailVerification(userCredential.user)

  return userCredential
}

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export const logout = () => {
  return signOut(auth)
}
