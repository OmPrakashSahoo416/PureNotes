import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAueAJFpHeMLbDttxibG-QlTNGXka1op9s",
    authDomain: "notes-app-185ca.firebaseapp.com",
    projectId: "notes-app-185ca",
    storageBucket: "notes-app-185ca.appspot.com",
    messagingSenderId: "92187718397",
    appId: "1:92187718397:web:087664580362acb39c0494"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};


