gsap.to("#bablu", {

    opacity: 1,

    duration: 2,

    delay: 1

})

setTimeout(() => {

    gsap.to("#loader", {

        opacity: 0,

        duration: 2,

        onComplete() {

            document.getElementById("loader")
                .style.display = "none"

            gsap.to(".paper", {

                opacity: 1,

                scale: 1,

                duration: 1.5,

                ease: "power4.out"

            })

        }

    })

}, 4500)

document
    .getElementById("begin")
    .onclick = () => {

        gsap.to(".paper", {

            opacity: 0,

            y: -80,

            duration: 1

        })

    }