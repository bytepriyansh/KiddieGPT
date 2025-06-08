import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "tactiq-d0bce.firebaseapp.com",
    projectId: "tactiq-d0bce",
    storageBucket: "tactiq-d0bce.firebasestorage.app",
    messagingSenderId: "535944514987",
    appId: "1:535944514987:web:3d7dff6809703c306216ee",
    measurementId: "G-8EWQS0E8GR"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)