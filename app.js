import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBaixqzu2Bgemqdw9mycZ-FHlbGer5fDg",
    authDomain: "shuttle-site-915e1.firebaseapp.com",
    projectId: "shuttle-site-915e1",
    storageBucket: "shuttle-site-915e1.firebasestorage.app",
    messagingSenderId: "726821391442",
    appId: "1:726821391442:web:77cc38be770e574386e38b",
    measurementId: "G-NHGWQYHHHV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    const authArea = document.getElementById("auth-area");
    if (user) {
        authArea.textContent = `Hello, ${user.email} | `;
    } else {
        authArea.textContent = '';
    }
});

const btnBook = document.getElementById("btn-book");

if (btnBook) {
    btnBook.addEventListener("click", async () => {
        const pickup = document.getElementById("pickup").value.trim();
        const dropoff = document.getElementById("dropoff").value.trim();
        const when = document.getElementById("when").value;
        const passengers = document.getElementById("passengers").value;
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

const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const name = document.getElementById("signup-name").value.trim();

        if (!email || !password || !name) {
            return alert("Please fill in all fields.");
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });

            alert("Signup successful!");
            window.location.href = "index.html";
        } catch (error) {
            alert("Error during signup: " + error.message);
        }
    });
}

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "index.html";
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    });
}

