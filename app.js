import { auth, db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

gsap.registerPlugin(ScrollTrigger);

/* ----------------- CAROUSEL ----------------- */
const track = document.querySelector('.carousel-track');

if (track) {
    let x = 0;

    function animateCarousel() {
        x -= 1;
        const trackWidth = track.scrollWidth;

        if (Math.abs(x) >= trackWidth / 2) {
            x = 0;
        }

        track.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(animateCarousel);
    }

    animateCarousel();
}

/* ----------------- HERO TITLE FADE-IN ----------------- */
if (document.querySelector(".hero-title")) {
    gsap.to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top 0%"
        }
    });
}

/* ----------------- ABOUT SECTION ----------------- */
gsap.utils.toArray(".about-container").forEach(container => {
    gsap.from(container, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: container,
            start: "top 85%"
        }
    });
});

/* ----------------- SERVICE AREAS ----------------- */
gsap.utils.toArray(".sa-item").forEach((item, i) => {
    gsap.fromTo(
        item,
        {
            opacity: 0,
            x: -40
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 70%",
                toggleActions: "play reverse play reverse"
            }
        }
    );
});

/* ----------------- WHY CHOOSE US ----------------- */
gsap.utils.toArray(".wcu-item").forEach((item, i) => {
    gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 75%",
                toggleActions: "play reverse play reverse"
            }
        }
    );
});

/* ----------------- HOW IT WORKS ----------------- */
const howSteps = [
    {
        number: 'Step 1',
        title: 'Request a Booking',
        desc: 'Choose your service and send us your travel details.'
    },
    {
        number: 'Step 2',
        title: 'Get Confirmation',
        desc: 'We confirm availability and pricing quickly.'
    },
    {
        number: 'Step 3',
        title: 'Enjoy the Ride',
        desc: 'We pick you up on time and get you there safely.'
    }
];

let howCurrentStep = 0;

const howNumberBlock = document.getElementById('step-number');
const howDetailsBlock = document.getElementById('step-details');
const howNextBtn = document.getElementById('next-step');
const howPrevBtn = document.getElementById('prev-step');

function animateStepChange(direction = 1) {
    const tl = gsap.timeline();

    // Animate OUT
    tl.to([howNumberBlock, howDetailsBlock], {
        opacity: 0,
        x: direction * -40,
        duration: 0.85,
        ease: "power2.in"
    });

    // Update content
    tl.add(() => {
        howNumberBlock.innerHTML = `<h3>${howSteps[howCurrentStep].number}</h3>`;
        howDetailsBlock.innerHTML = `
            <h3>${howSteps[howCurrentStep].title}</h3>
            <p>${howSteps[howCurrentStep].desc}</p>
        `;
    });

    // Animate IN
    tl.fromTo(
        [howNumberBlock, howDetailsBlock],
        { opacity: 0, x: direction * 40 },
        {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out"
        }
    );
}

howNextBtn?.addEventListener('click', () => {
    howCurrentStep = (howCurrentStep + 1) % howSteps.length;
    animateStepChange(1);
});

howPrevBtn?.addEventListener('click', () => {
    howCurrentStep = (howCurrentStep - 1 + howSteps.length) % howSteps.length;
    animateStepChange(-1);
});

/* ----------------- CREATE A QUOTATION ----------------- */
/* Card entrance */
gsap.to(".booking-card", {
    scrollTrigger: {
        trigger: ".booking-card",
        start: "top 80%"
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
});

/* Form fields stagger */
gsap.to(".form-group", {
    scrollTrigger: {
        trigger: ".booking-card",
        start: "top 75%"
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.08,
    delay: 0.2,
    ease: "power2.out"
});

/* Button entrance (last, intentional) */
gsap.to(".btn-primary", {
    scrollTrigger: {
        trigger: ".booking-card",
        start: "top 75%"
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.8,
    ease: "power2.out"
});

setTimeout(() => {
    document.querySelector(".booking-card")?.style.setProperty("opacity", "1");
}, 1000);

const steps = document.querySelectorAll(".step");
const progressBar = document.querySelector(".progress-bar");
const stepLabel = document.querySelector(".step-label");
const nextBtn = document.getElementById("btn-book");

// Helper to switch steps
function goToStep(stepIndex) {
    steps.forEach((step, i) => step.classList.toggle("active", i === stepIndex));
    progressBar.style.width = `${(stepIndex + 1) * 33}%`;
    stepLabel.textContent = `Step ${stepIndex + 1} of 3`;
}

nextBtn.addEventListener("click", async () => {
    // Ensure user is logged in
    if (!auth.currentUser) {
        alert("You must be logged in to request a booking.");
        return;
    }

    // Get values from form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const pickup = document.getElementById("pickup").value.trim();
    const dropoff = document.getElementById("dropoff").value.trim();
    const date = document.getElementById("when").value;
    const passengers = document.getElementById("passengers").value;
    const notes = document.getElementById("notes").value.trim();

    // Basic validation
    if (!name || !email || !service || !pickup || !dropoff || !date) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        // Save booking to Firestore
        await addDoc(collection(db, "bookings"), {
            userId: auth.currentUser.uid,
            name,
            email,
            service,
            pickup,
            dropoff,
            date,
            passengers,
            notes,
            createdAt: new Date()
        });

        console.log("Booking saved successfully!");

        // Fill summary
        document.getElementById("sum-name").textContent = name;
        document.getElementById("sum-email").textContent = email;

        // Step 2: Show summary
        goToStep(1);

        // Optional: Automatically go to step 3 after 3 seconds
        setTimeout(() => {
            goToStep(2);
        }, 3000);

    } catch (err) {
        console.error("Error saving booking:", err);
        alert("There was an error saving your booking. Please try again.");
    }
});