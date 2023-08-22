// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStripePayments } from "@stripe/firestore-stripe-payments";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "git-website-database.firebaseapp.com",
  projectId: "git-website-database",
  storageBucket: "git-website-database.appspot.com",
  messagingSenderId: "155283613049",
  appId: '1:570543864038:web:c6f29609071e0b0ee62327',
  measurementId: "G-KSGPJ2KSRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();

export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'users'
})
// const analytics = getAnalytics(app);

// console.log(products);
