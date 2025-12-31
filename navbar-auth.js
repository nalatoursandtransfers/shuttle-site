import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const authSection = document.getElementById("auth-section");

if (authSection) {
    onAuthStateChanged(auth, (user) => {
    if (user) {
        authSection.innerHTML = `
            <a href="profile.html" class="nav-user">
                Hi, ${user.displayName || "User"}
            </a>
            <a href="#" id="logoutBtn" class="nav-link">
                Logout
            </a>
        `;

        document
        .getElementById("logoutBtn")
        .addEventListener("click", async (e) => {
            e.preventDefault();
            await signOut(auth);
            window.location.href = "index.html";
        });

    } else {
        authSection.innerHTML = `
            <a href="signup.html" class="nav-link">
                <i class="fas fa-user"></i>
            </a>
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
