import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDtrzZq9DzojmeU7aNYI29bGbTDp1gjTDM',
  authDomain: 'winkeltje-ece47.firebaseapp.com',
  projectId: 'winkeltje-ece47',
  storageBucket: 'winkeltje-ece47.appspot.com',
  messagingSenderId: '912919056358',
  appId: '1:912919056358:web:ff01bee4be18416b3fd027',
  measurementId: 'G-FG9EFTC7VH'
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef
}
