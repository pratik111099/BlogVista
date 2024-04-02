// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBj-5RRtzIuRwg1kzE1jxGtpxIO8dvm1NE",
    authDomain: "jpblogs-93f7a.firebaseapp.com",
    projectId: "jpblogs-93f7a",
    storageBucket: "jpblogs-93f7a.appspot.com",
    messagingSenderId: "481195402137",
    appId: "1:481195402137:web:23eb499c7338c2c2d4e908",
    measurementId: "G-QDPWQ8CKSQ",
    databaseURL: "https://jpblogs-93f7a-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
