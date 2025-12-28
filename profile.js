import { auth, db } from "./firebase.js";
import { onAuthStateChanged, updateProfile, updateEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
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

  try {
    // 1️⃣ Update display name
    await updateProfile(user, { displayName: editForm["edit-name"].value });

    // 2️⃣ Update email in Firebase Auth if it changed
    if (editForm["edit-email"].value !== user.email) {
      await updateEmail(user, editForm["edit-email"].value);
    }

    // 3️⃣ Update Firestore document
    const userDoc = doc(db, "users", user.uid);
    await updateDoc(userDoc, {
      name: editForm["edit-name"].value,
      email: editForm["edit-email"].value
    });

    // 4️⃣ Immediately update the UI
    document.getElementById("profile-name").textContent = editForm["edit-name"].value;
    document.getElementById("profile-email").textContent = editForm["edit-email"].value;

    // 5️⃣ Update auth-section nav greeting if present
    const authGreeting = document.querySelector(".user-greeting");
    if (authGreeting) authGreeting.textContent = `Hi, ${editForm["edit-name"].value}`;

    editMsg.textContent = "Profile updated successfully!";

    // Hide edit form
    editFormContainer.style.display = "none";
    editBtn.style.display = "inline-block";

  } catch (err) {
    console.error(err);
    if (err.code === "auth/requires-recent-login") {
      editMsg.textContent = "Please log out and log in again to update your email.";
    } else {
      editMsg.textContent = "Error updating profile. Please try again.";
    }
  }
});