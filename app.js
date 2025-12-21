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

/* ----------------- WHY CHOOSE US ----------------- */
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

/* ----------------- SERVICE AREAS ----------------- */
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