// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCQw0UDBc_2Y4hQ9vhZi3oGmEWmJCw6Tv8',
  authDomain: 'cordana-13bd2.firebaseapp.com',
  projectId: 'cordana-13bd2',
  storageBucket: 'cordana-13bd2.appspot.com',
  messagingSenderId: '1018172736070',
  appId: '1:1018172736070:web:7a3fba6cfca25187084047',
  measurementId: 'G-4G3EBYYDE6',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
const authentication = getAuth(app)
export { app, db, storage, authentication }

// const analytics = getAnalytics(app);
