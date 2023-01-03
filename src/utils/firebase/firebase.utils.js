import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCNVVotgqo-DpYBjQS5qV6Cna5XyKwhv8M',
  authDomain: 'crwn-clothing-db-970a4.firebaseapp.com',
  projectId: 'crwn-clothing-db-970a4',
  storageBucket: 'crwn-clothing-db-970a4.appspot.com',
  messagingSenderId: '1062391396718',
  appId: '1:1062391396718:web:4296e2ef168029dd1a297f',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log('error creating the user', err);
    }
  }

  return userDocRef;
};

export { auth, signInWithGooglePopup, db, createUserDocumentFromAuth };
