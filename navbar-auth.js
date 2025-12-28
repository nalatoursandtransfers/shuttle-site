import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const authSection = document.getElementById("auth-section");

if (authSection) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            authSection.innerHTML = `
                <span class="user-greeting">
                    Hi, ${user.displayName || "User"}
                </span>
                <a href="profile.html" class="btn small">Profile</a>
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
}

// Get all nav links
  const navLinks = document.querySelectorAll('header nav a');

  // Get current page file name
  const currentPage = window.location.pathname.split("/").pop();

  // Loop through links and add 'active' to the matching one
  navLinks.forEach(link => {
    if(link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
