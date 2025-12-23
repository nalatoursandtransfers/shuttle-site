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
const steps = [
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

let currentStep = 0;

const numberBlock = document.getElementById('step-number');
const detailsBlock = document.getElementById('step-details');
const nextBtn = document.getElementById('next-step');
const prevBtn = document.getElementById('prev-step');

function animateStepChange(direction = 1) {
    const tl = gsap.timeline();

    // Animate OUT
    tl.to([numberBlock, detailsBlock], {
        opacity: 0,
        x: direction * -40,
        duration: 0.85,
        ease: "power2.in"
    });

    // Update content
    tl.add(() => {
        numberBlock.innerHTML = `<h3>${steps[currentStep].number}</h3>`;
        detailsBlock.innerHTML = `
            <h3>${steps[currentStep].title}</h3>
            <p>${steps[currentStep].desc}</p>
        `;
    });

    // Animate IN
    tl.fromTo(
        [numberBlock, detailsBlock],
        { opacity: 0, x: direction * 40 },
        {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out"
        }
    );
}

nextBtn.addEventListener('click', () => {
    currentStep = (currentStep + 1) % steps.length;
    animateStepChange(1);
});

prevBtn.addEventListener('click', () => {
    currentStep = (currentStep - 1 + steps.length) % steps.length;
    animateStepChange(-1);
});