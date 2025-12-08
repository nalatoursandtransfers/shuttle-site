gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector('.carousel-track');
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