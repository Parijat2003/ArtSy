// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJf1mRF0U4vJO4mj2Ns6eR8l5tcrrhwNA",
  authDomain: "myecom-f8237.firebaseapp.com",
  projectId: "myecom-f8237",
  storageBucket: "myecom-f8237.appspot.com",
  messagingSenderId: "35765688158",
  appId: "1:35765688158:web:a074a12c5b5b93cbcb21cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB =getFirestore(app);
const auth = getAuth(app);
export {fireDB, auth};