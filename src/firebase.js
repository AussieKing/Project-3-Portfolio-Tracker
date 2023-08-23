import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './config/firebaseConfig';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);  // this is the entry point between the app and firebase

const auth = getAuth(firebaseApp); 
const db = getFirestore(firebaseApp);

export { auth, db };