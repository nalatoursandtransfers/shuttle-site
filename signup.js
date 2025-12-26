import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// If already logged in, prevent access to signup page
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "index.html"; // redirect logged-in users
    }
});

const form = document.getElementById("signup-form");
const errBox = document.getElementById("signup-error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!name || !email || !password) {
        errBox.textContent = "Please fill in all fields.";
        return;
    }

    try {
        // CREATE USER ACCOUNT
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        // UPDATE DISPLAY NAME
        await updateProfile(userCred.user, { displayName: name });

        // ADD USER TO FIRESTORE
        await setDoc(doc(db, "users", userCred.user.uid), {
            name,
            email,
            createdAt: new Date()
        });

        // SUCCESS: REDIRECT
        window.location.href = "index.html";

    } catch (error) {
        // SHOW FRIENDLY ERROR MESSAGE
        if (error.code === "auth/email-already-in-use") {
            errBox.textContent = "This email is already registered. Please login.";
        } else if (error.code === "auth/invalid-email") {
            errBox.textContent = "Invalid email address.";
        } else if (error.code === "auth/weak-password") {
            errBox.textContent = "Password should be at least 6 characters.";
        } else {
            errBox.textContent = error.message;
        }
    }
});

// PASSWORD VISIBILITY TOGGLE
const toggle = document.getElementById("togglePassword");
const pwd = document.getElementById("signup-password");

if (toggle && pwd) {
    toggle.addEventListener("click", () => {
        pwd.type = pwd.type === "password" ? "text" : "password";
        toggle.classList.toggle("fa-eye-slash");
    });
}

errBox.style.color = "green";
errBox.textContent = "Account created successfully! Redirecting...";

setTimeout(() => {
    window.location.href = "index.html";
}, 1500);