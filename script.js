// Loader Header Animation
gsap.to("#bablu", {
    opacity: 1,
    duration: 2,
    delay: 0.8
});

// Wait for user click on loader to proceed
const loader = document.getElementById("loader");
loader.style.cursor = "pointer";

loader.addEventListener("click", () => {
    // Prevent double-clicks
    loader.style.pointerEvents = "none";

    gsap.to("#loader", {
        opacity: 0,
        duration: 1.8,
        onComplete() {
            loader.style.display = "none";

            gsap.to(".main-card", {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power4.out"
            });
        }
    });
});

// Audio Setup
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
let isMusicPlaying = false;

function playAudio() {
    if (bgMusic && !isMusicPlaying) {
        bgMusic.volume = 0.6;
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.remove("paused");
            musicToggle.classList.add("playing");
        }).catch(err => {
            console.log("Audio autoplay prevented by browser:", err);
        });
    }
}

function toggleAudio() {
    if (!bgMusic) return;
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("paused");
    } else {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.remove("paused");
            musicToggle.classList.add("playing");
        });
    }
}

if (musicToggle) {
    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleAudio();
    });
}

// Falling Petals Generator
const petalsContainer = document.getElementById("petals");
const PETAL_COUNT = 30;

function createPetal() {
    if (!petalsContainer) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");

    const size = Math.random() * 25 + 18; // 18px to 43px
    const startX = Math.random() * window.innerWidth;
    const startOpacity = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
    const startRotation = Math.random() * 360;

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${startX}px`;
    petal.style.top = `-50px`;
    petal.style.opacity = startOpacity;

    petalsContainer.appendChild(petal);

    const fallDuration = Math.random() * 6 + 6; // 6s to 12s
    const swayDistance = (Math.random() - 0.5) * 200; // -100px to +100px
    const endRotation = startRotation + (Math.random() * 720 - 360);

    gsap.to(petal, {
        y: window.innerHeight + 80,
        x: `+=${swayDistance}`,
        rotation: endRotation,
        duration: fallDuration,
        ease: "none",
        onComplete: () => {
            petal.remove();
            createPetal();
        }
    });
}

// Spawn initial set of falling petals gradually
for (let i = 0; i < PETAL_COUNT; i++) {
    setTimeout(createPetal, i * 250);
}

// Interactive Card Switching
const beginBtn = document.getElementById("begin");
const replayBtn = document.getElementById("replay");
const mainCard = document.querySelector(".main-card");
const surpriseCard = document.querySelector(".surprise-card");

if (beginBtn) {
    beginBtn.addEventListener("click", () => {
        playAudio();

        // Burst of extra petals on click!
        for (let i = 0; i < 15; i++) {
            setTimeout(createPetal, i * 80);
        }

        gsap.to(mainCard, {
            opacity: 0,
            y: -60,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.in",
            onComplete() {
                mainCard.classList.add("hidden");
                surpriseCard.classList.remove("hidden");
                
                gsap.fromTo(surpriseCard, 
                    { opacity: 0, y: 60, scale: 0.85 },
                    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
                );
            }
        });
    });
}

if (replayBtn) {
    replayBtn.addEventListener("click", () => {
        // Burst of extra petals
        for (let i = 0; i < 15; i++) {
            setTimeout(createPetal, i * 80);
        }

        gsap.to(surpriseCard, {
            opacity: 0,
            y: -60,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.in",
            onComplete() {
                surpriseCard.classList.add("hidden");
                mainCard.classList.remove("hidden");

                gsap.fromTo(mainCard,
                    { opacity: 0, y: 60, scale: 0.85 },
                    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
                );
            }
        });
    });
}