// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyADKqVtvZLiEWImu-yeFfPdu-kehDY7FHo",
    authDomain: "ecomiti-chat-app.firebaseapp.com",
    projectId: "ecomiti-chat-app",
    storageBucket: "ecomiti-chat-app.appspot.com",
    messagingSenderId: "712547389295",
    appId: "1:712547389295:web:00cf6afdc223b7aff7229a",
    measurementId: "G-L1MB8C9CEE"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);