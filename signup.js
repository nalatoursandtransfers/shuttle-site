import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

const form = document.getElementById("signup-form");
const errBox = document.getElementById("signup-error");

// Prevent already-verified users from accessing signup
onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified) {
    window.location.href = "index.html";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (!name || !email || !password || !confirm) {
    errBox.textContent = "Please fill in all fields.";
    return;
  }

  if (password !== confirm) {
    errBox.textContent = "Passwords do not match.";
    return;
  }

  try {
    // Create account
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name
    await updateProfile(userCred.user, { displayName: name });

    // Save user to Firestore
    await setDoc(doc(db, "users", userCred.user.uid), {
      name,
      email,
      createdAt: new Date()
    });

    // Send verification email
    await sendEmailVerification(userCred.user);

    // Log user out until verified
    await signOut(auth);

    errBox.style.color = "green";
    errBox.textContent =
      "Verification email sent. Please verify your email before logging in.";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2500);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      errBox.textContent = "This email is already registered. Please log in.";
    } else if (error.code === "auth/weak-password") {
      errBox.textContent = "Password must be at least 6 characters.";
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