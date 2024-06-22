import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBPQZmMHqX5hhFaHbpW5FiEz2qoJIJCwLc",
    authDomain: "rnw-react-app.firebaseapp.com",
    projectId: "rnw-react-app",
    storageBucket: "rnw-react-app.appspot.com",
    messagingSenderId: "531126010321",
    appId: "1:531126010321:web:f9e2715431bb8c014420f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
