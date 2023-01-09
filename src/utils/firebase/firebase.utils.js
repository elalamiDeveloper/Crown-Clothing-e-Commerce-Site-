import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCNVVotgqo-DpYBjQS5qV6Cna5XyKwhv8M',
  authDomain: 'crwn-clothing-db-970a4.firebaseapp.com',
  projectId: 'crwn-clothing-db-970a4',
  storageBucket: 'crwn-clothing-db-970a4.appspot.com',
  messagingSenderId: '1062391396718',
  appId: '1:1062391396718:web:4296e2ef168029dd1a297f',
};
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    const signUp = await signInWithEmailAndPassword(auth, email, password);
    console.log('Success Connection');
    return signUp;
  } catch (err) {
    if (err.code === 'auth/wrong-password') alert('Wrong Password !!!');
    if (err.code === 'auth/user-not-found')
      alert('User not found, Can you change email !!!');
  }
};

const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log('error creating the user', err);
    }
  }

  return userDocRef;
};

const signOutUser = async () => await signOut(auth);

const onAuthStateChangedListener = (
  callback,
  errorCallback,
  completedCallback
) => onAuthStateChanged(auth, callback);

export {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signOutUser,
  onAuthStateChangedListener,
};
