import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, query, where, getDocs } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const container = document.getElementById("bookings");

onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        container.innerHTML = "<p>No bookings yet.</p>";
        return;
    }

    snapshot.forEach(doc => {
        const b = doc.data();
        container.innerHTML += `
            <div class="booking-card">
                <p><strong>Date:</strong> ${b.date}</p>
                <p><strong>From:</strong> ${b.pickup}</p>
                <p><strong>To:</strong> ${b.dropoff}</p>
            </div>
        `;
    });
});