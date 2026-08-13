/* =====================================================
   PASSWORD
===================================================== */


/*
    CHANGE THIS.

    This is the password you will give her.

    Example:

    "bablu"

*/

const SECRET_PASSWORD = "bablu";


const passwordScreen =
    document.getElementById("passwordScreen");

const passwordInput =
    document.getElementById("passwordInput");

const unlockButton =
    document.getElementById("unlockButton");

const passwordError =
    document.getElementById("passwordError");

const mainWebsite =
    document.getElementById("mainWebsite");



function unlockWebsite() {

    const enteredPassword =
        passwordInput.value
            .trim()
            .toLowerCase();


    if (
        enteredPassword ===
        SECRET_PASSWORD.toLowerCase()
    ) {

        passwordError.classList.remove(
            "show"
        );


        passwordScreen.style.transition =
            "opacity 1s ease";


        passwordScreen.style.opacity = "0";


        setTimeout(() => {

            passwordScreen.classList.add(
                "hidden"
            );

            mainWebsite.classList.remove(
                "hidden"
            );

            window.scrollTo(0, 0);

            startMusic();

        }, 1000);


    } else {

        passwordError.classList.add(
            "show"
        );


        passwordInput.value = "";


        passwordInput.focus();

    }

}



unlockButton.addEventListener(
    "click",
    unlockWebsite
);



passwordInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            unlockWebsite();

        }

    }
);



/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById(
        "birthdayMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const musicIcon =
    document.getElementById(
        "musicIcon"
    );



function startMusic() {

    music.play()
        .then(() => {

            musicButton.classList.add(
                "playing"
            );

            musicIcon.textContent = "♫";

        })
        .catch(() => {

            /*
                Browser blocked autoplay.

                She can press the music button.
            */

            console.log(
                "Autoplay blocked."
            );

        });

}



musicButton.addEventListener(
    "click",
    function () {

        if (music.paused) {

            music.play();

            musicButton.classList.add(
                "playing"
            );

            musicIcon.textContent = "♫";

        } else {

            music.pause();

            musicButton.classList.remove(
                "playing"
            );

            musicIcon.textContent = "🔇";

        }

    }
);



/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".scrap-photo, .thing-card, .letter-paper"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        observer.observe(element);

    }
);



/* =====================================================
   PHOTO PROTECTION
===================================================== */

document
    .querySelectorAll("img")
    .forEach(
        image => {

            image.addEventListener(
                "dragstart",
                event => {

                    event.preventDefault();

                }
            );

        }
    );