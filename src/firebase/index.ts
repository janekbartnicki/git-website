// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcUPZhJWy5K1sWqaVl0g0ljQTX8LYWb9w",
  authDomain: "git-database.firebaseapp.com",
  projectId: "git-database",
  storageBucket: "git-database.appspot.com",
  messagingSenderId: "570543864038",
  appId: "1:570543864038:web:c6f29609071e0b0ee62327",
  measurementId: "G-QWS7Y1NXZN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

// console.log(products);
