import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAedVGxPiXUNRkjWAsT8pEP3E7goG5fFsw',
  authDomain: 'projectssd-759df.firebaseapp.com',
  projectId: 'projectssd-759df',
  storageBucket: 'projectssd-759df.firebasestorage.app',
  messagingSenderId: '70644478224',
  appId: '1:70644478224:web:471dc853fb55f2cbd8f595',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
