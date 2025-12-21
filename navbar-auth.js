import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const authSection = document.getElementById("auth-section");

onAuthStateChanged(auth, (user) => {
    if (user) {
        authSection.innerHTML = `
            <span class="user-greeting">
                Hi, ${user.displayName || "User"}
            </span>
            <button id="logoutBtn" class="btn small">Logout</button>
        `;

        document.getElementById("logoutBtn").addEventListener("click", async () => {
            await signOut(auth);
            window.location.href = "index.html";
        });
    } else {
        authSection.innerHTML = `
            <a href="signup.html"><i class="fas fa-user"></i></a>
        `;
    }
});