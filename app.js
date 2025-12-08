import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyDBaixqzu2Bgemqdw9mycZ-FHlbGer5fDg",
    authDomain: "shuttle-site-915e1.firebaseapp.com",
    projectId: "shuttle-site-915e1",
    storageBucket: "shuttle-site-915e1.app",
    messagingSenderId: "726821391442",
    appId: "1:726821391442:web:77cc38be770e574386e38b",
    measurementId: "G-NHGWQYHHHV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector('.carousel-track');
let x = 0;

function animateCarousel() {
    x -= 1; // adjust speed here
    const trackWidth = track.scrollWidth;

    // Reset smoothly so no jump is visible
    if (Math.abs(x) >= trackWidth / 2) {
        x = 0;
    }

    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animateCarousel);
}

animateCarousel();



/* ----------------- HERO TITLE FADE-IN ----------------- */
gsap.to(".hero-title", {
opacity: 1,
y: 0,
duration: 3.0,
ease: "power3.out",
scrollTrigger: { trigger: ".hero-section", start: "top 0%" }
});

/* ----------------- ABOUT SECTION FADE-IN ----------------- */
gsap.from(".about-container", {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 85%"
    }
});

gsap.from(".about-image img", {
    opacity: 0,
    y: 60,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 85%"
    }
});

// WHY CHOOSE US animation (in + out)
gsap.utils.toArray(".wcu-item").forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 70%",
            toggleActions: "play reverse play reverse"
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out"
    });
});

// SERVICE AREAS animation (in + out)
gsap.utils.toArray(".sa-item").forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 70%",
            toggleActions: "play reverse play reverse"
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out"
    });
});