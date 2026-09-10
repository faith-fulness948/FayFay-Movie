/* =====================================================
   HAMBURGER MENU
===================================================== */

const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});

console.log("POST MOVIE PAGE:", window.location.origin);

fetch("https://fayfay-movie.onrender.com/api/auth/me", {
    method: "GET",
    credentials: "include"
})
.then(res => res.json())
.then(data => {
    console.log("POST MOVIE /ME:", data);
})
.catch(error => {
    console.error("POST MOVIE AUTH ERROR:", error);
});

/* Close menu when a link is clicked */

const navLinks = document.querySelectorAll(".nav-links a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* =====================================================
   POST MOVIE
===================================================== */

const movieForm = document.querySelector("#movieForm");

const message = document.querySelector("#message");

const postBtn = document.querySelector("#post-btn");


movieForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    /* Get form values */

    const title =
        document.querySelector("#title")
        .value
        .trim();


    const genre =
        document.querySelector("#genre")
        .value;


    const type =
        document.querySelector("#type")
        .value;


    const year =
        Number(
            document.querySelector("#year")
            .value
        );


    const actors =
        document.querySelector("#actors")
        .value
        .split(",")
        .map(actor => actor.trim())
        .filter(actor => actor !== "");


    const synopsis =
        document.querySelector("#synopsis")
        .value
        .trim();


    const poster =
        document.querySelector("#poster")
        .files[0];


    /* Make sure poster exists */

    if (!poster) {

        message.style.display = "block";

        message.style.color = "#ff4d4d";

        message.style.background =
            "rgba(255, 77, 77, 0.1)";

        message.textContent =
            "Please select a poster image.";

        return;
    }


    /* Disable button */

    postBtn.disabled = true;

    postBtn.textContent = "Posting...";


    /* Hide old message */

    message.style.display = "none";


    try {

        /* Create FormData */

        const formData = new FormData();


        formData.append("title", title);

        formData.append("genre", genre);

        formData.append("type", type);

        formData.append("year", year);

        formData.append(
            "actors",
            JSON.stringify(actors)
        );

        formData.append("synopsis", synopsis);

        formData.append("poster", poster);


        /* Send to backend */

        const response = await fetch(
            "https://fayfay-movie.onrender.com/api/movies",
            {
                method: "POST",

                credentials: "include",

                body: formData
            }
        );


        const data = await response.json();

        console.log(
            "POST MOVIE RESPONSE:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to post movie"
            );

        }


        /* SUCCESS */

        message.style.display = "block";

        message.style.color = "#4caf50";

        message.style.background =
            "rgba(76, 175, 80, 0.1)";

        message.textContent =
            "🎉 Movie posted successfully!";


        /* Clear form */

        movieForm.reset();


    } catch (error) {

        console.error(
            "Post movie error:",
            error
        );


        message.style.display = "block";

        message.style.color = "#ff4d4d";

        message.style.background =
            "rgba(255, 77, 77, 0.1)";

        message.textContent =
            error.message ||
            "Something went wrong.";

    } finally {

        postBtn.disabled = false;

        postBtn.textContent =
            "Post Movie";

    }

});