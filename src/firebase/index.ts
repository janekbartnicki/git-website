// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbJKwczMd5jntY957cfFbWdggDwFoENQs",
  authDomain: "git-website-database.firebaseapp.com",
  projectId: "git-website-database",
  storageBucket: "git-website-database.appspot.com",
  messagingSenderId: "155283613049",
  appId: "1:155283613049:web:06989fb937fdfab32e7ba8",
  measurementId: "G-KSGPJ2KSRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
// const analytics = getAnalytics(app);

// console.log(products);
