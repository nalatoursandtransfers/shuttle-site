import { auth, db } from "./firebase.js";
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Redirect non-logged-in users
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Display user profile info
  document.getElementById("profile-name").textContent = user.displayName || "User";
  document.getElementById("profile-email").textContent = user.email;

  // Load user bookings
  const bookingsList = document.getElementById("bookings-list");
  bookingsList.innerHTML = "";
  const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    bookingsList.innerHTML = "<p>No bookings yet.</p>";
  } else {
    snapshot.forEach(doc => {
      const b = doc.data();
      const div = document.createElement("div");
      div.classList.add("booking-item");
      div.innerHTML = `
        <p><strong>Service:</strong> ${b.service}</p>
        <p><strong>Pickup:</strong> ${b.pickup}</p>
        <p><strong>Drop-off:</strong> ${b.dropoff}</p>
        <p><strong>Date & Time:</strong> ${b.date}</p>
        <p><strong>Passengers:</strong> ${b.passengers}</p>
        <p><strong>Notes:</strong> ${b.notes}</p>
        <hr>
      `;
      bookingsList.appendChild(div);
    });
  }
});

// EDIT PROFILE
const editBtn = document.getElementById("edit-profile");
const editFormContainer = document.getElementById("edit-form-container");
const editForm = document.getElementById("edit-profile-form");
const cancelEdit = document.getElementById("cancel-edit");
const editMsg = document.getElementById("edit-msg");

editBtn.addEventListener("click", () => {
  editFormContainer.style.display = "block";
  editBtn.style.display = "none";
  editForm["edit-name"].value = document.getElementById("profile-name").textContent;
  editForm["edit-email"].value = document.getElementById("profile-email").textContent;
});

cancelEdit.addEventListener("click", () => {
  editFormContainer.style.display = "none";
  editBtn.style.display = "inline-block";
  editMsg.textContent = "";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;

  await updateProfile(user, { displayName: editForm["edit-name"].value });

  const userDoc = doc(db, "users", user.uid);
  await updateDoc(userDoc, {
    name: editForm["edit-name"].value,
    email: editForm["edit-email"].value
  });

  document.getElementById("profile-name").textContent = editForm["edit-name"].value;
  document.getElementById("profile-email").textContent = editForm["edit-email"].value;
  editMsg.textContent = "Profile updated successfully!";
});
