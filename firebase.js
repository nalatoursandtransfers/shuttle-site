// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBaixqzu2Bgemqdw9mycZ-FHlbGer5fDg",
    authDomain: "shuttle-site-915e1.firebaseapp.com",
    projectId: "shuttle-site-915e1",
    storageBucket: "shuttle-site-915e1.app",
    messagingSenderId: "726821391442",
    appId: "1:726821391442:web:77cc38be770e574386e38b",
    measurementId: "G-NHGWQYHHHV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)