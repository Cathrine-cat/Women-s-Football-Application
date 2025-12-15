import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

// Save or update user profile
export const saveUserProfile = async (uid, profile) => {
  await setDoc(doc(db, 'users', uid), profile, { merge: true })
}

// Fetch user profile
export const getUserProfile = async (uid) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  }
  return null
}
