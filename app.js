import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "REPLACE_API_KEY",
    authDomain: "REPLACE_AUTH_DOMAIN",
    projectId: "REPLACE_PROJECT_ID",
    storageBucket: "REPLACE_STORAGE_BUCKET",
    messagingSenderId: "REPLACE_SENDER_ID",
    appId: "REPLACE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

if (btnBook) {
    btnBook.addEventListener("click", async () => {
        const pickup = document.getElementById("pickup").value.trim();
        const dropoff = document.getElementById("dropoff").value.trim();
        const when = document.getElementById("when").value();
        const passengers = document.getElementById("passengers").value();
        const notes = document.getElementById("notes").value;

        if (!auth.currentUser) return alert("You must be logged in to make a booking.");
        if (!pickup || !dropoff || !when) return alert("Please fill in all required fields.");

        await addDoc(collection(db, "bookings"), {
            uid: auth.currentUser.uid,
            pickup, dropoff, when, passengers, notes,
            createdAt: new Date().toISOString()
        });

        alert("Booking successful!");
        document.getElementById("booking-form").reset();
    });
}

const btnContact = document.getElementById("btn-contact");
if (btnContact) {
    btnContact.addEventListener("click", async () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const status = document.getElementById("contact-status");

        if (!name || !email || !message) return status.textContent = "Please fill in all fields.";

        await addDoc(collection(db, "contacts"), { name, email, message, createdAt: new Date().toISOString() });
        status.textContent = "Message sent successfully!";
    });
}