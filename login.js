import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { auth } from "./firebase.js";

const loginForm = document.getElementById("login-form");
const loginMsg = document.getElementById("login-msg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // if (!cred.user.emailVerified) {
    //   await signOut(auth);
    //   loginMsg.textContent = "Please verify your email before logging in.";
    //   return;
    // }

    // Success: redirect
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    loginMsg.textContent = "Invalid email or password.";
  }
});

// FORGOT PASSWORD
window.resetPassword = async () => {
  const email = prompt("Enter your email address");
  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent.");
  } catch (err) {
    console.error(err);
    alert("Error sending password reset email.");
  }
};

// PASSWORD VISIBILITY TOGGLE
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    togglePassword.classList.toggle("fa-eye-slash");
  });
}
