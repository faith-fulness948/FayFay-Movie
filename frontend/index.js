let currentUser = null;
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});

let allMovies = []

document.getElementById("films-link").addEventListener("click", () => {
    displayMovies(allMovies);
});

const fetchMovies = async () => {
  const loading = document.getElementById("loading");
  const loadError = document.getElementById("loadError");

  try {
    loading.style.display = "block";
    loadError.style.display = "none";

    const res = await fetch("https://fayfay-movie.onrender.com/api/movies", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // Store all movies and series globally
    allMovies = data?.data?.movies || [];
    const titles = allMovies.map(movie => movie.title);

    // Display everything initially
    displayMovies(allMovies);

  } catch (error) {
    console.error("Fetch Error:", error);
    loadError.style.display = "block";

  } finally {
    loading.style.display = "none";
  }
};

function displayMovies(movies) {

    const movieContainer = document.querySelector("#movieContainer");


    if (!movies.length) {

        movieContainer.innerHTML = `
            <p class="no-movies">
                No movies found.
            </p>
        `;

        return;
    }


    movieContainer.innerHTML = movies.map(movie => `

        <article
            class="card movie-card"
            data-id="${movie._id}"
        >

            <div class="poster-container">

                ${
                    movie.poster
                    ? `
                        <img
                            src="${movie.poster}"
                            alt="${movie.title} poster"
                            loading="lazy"
                        >
                    `
                    : `
                        <div class="poster-placeholder">
                            No Poster
                        </div>
                    `
                }

                <span class="movie-year">
                    ${movie.year}
                </span>

            </div>


            <div class="card-info">

              <h3>
                ${movie.title}
              </h3>

              <p>
                ${movie.genre} • ${movie.type}
              </p>

              ${
                currentUser?.role === "admin"
                ?` 
                  <div class = "admin-movie-buttons">
                    <button class="edit-movie-btn" data-id="${movie._id}">
                     Edit
                    </button>
                    <button class="delete-movie-btn" data-id="${movie._id}">
                     Delete
                    </button>
                  </div>
                `
                : ""
              }


            </div>

        </article>

    `).join("");


    // Add click event to every movie card

    const movieCards = document.querySelectorAll(".movie-card");


    movieCards.forEach(card => {

        card.addEventListener("click", () => {

            const movieId =
                card.dataset.id;


            const movie =
                allMovies.find(
                    movie => movie._id === movieId
                );


            if (movie) {

                openMovieModal(movie);

            }

        });

        document.querySelectorAll(".edit-movie-btn").forEach(button => {

            button.addEventListener("click", (e) => {

                e.stopPropagation();

                const movieId = button.dataset.id;

                const movie = allMovies.find(
                    movie => movie._id === movieId
                );

                if (movie) {
                    openEditMovieModal(movie);
                }

            });

        });


        document.querySelectorAll(".delete-movie-btn").forEach(button => {

            button.addEventListener("click", async (e) => {

                e.stopPropagation();

                const movieId = button.dataset.id;

                await deleteMovie(movieId);

            });

        }); 

    });

}

const movieModalWrapper =
    document.querySelector("#movie-modal-wrapper");

const movieModalClose =
    document.querySelector("#movie-modal-close");

const modalPoster =
    document.querySelector("#modal-poster");

const modalTitle =
    document.querySelector("#modal-title");

const modalYear =
    document.querySelector("#modal-year");

const modalType =
    document.querySelector("#modal-type");

const modalGenre =
    document.querySelector("#modal-genre");

const modalSynopsis =
    document.querySelector("#modal-synopsis");

const modalActors =
    document.querySelector("#modal-actors");

const modalTrailer =
    document.querySelector("#modal-trailer");

const modalWatch =
    document.querySelector("#modal-watch");

const modalWatchlist =
    document.querySelector("#modal-watchlist");

const modalFavorite =
    document.querySelector("#modal-favorite");


let selectedMovie = null;


function openMovieModal(movie) {

    selectedMovie = movie;


    modalPoster.src =
        movie.poster || "";


    modalPoster.alt =
        `${movie.title} poster`;


    modalTitle.textContent =
        movie.title;


    modalYear.textContent =
        movie.year;


    modalType.textContent =
        movie.type;


    modalGenre.textContent =
        movie.genre;


    modalSynopsis.textContent =
        movie.synopsis || "No synopsis available.";


    modalActors.textContent =
        movie.actors?.join(", ") ||
        "No actors listed.";


    movieModalWrapper.style.display =
        "flex";


    document.body.style.overflow =
        "hidden";

}

modalTrailer.addEventListener("click", () => {

    if (!selectedMovie) return;

    watchTrailer(selectedMovie.title);

});


modalWatch.addEventListener("click", () => {

    if (!selectedMovie) return;

    whereToWatch(selectedMovie.title);

});


modalWatchlist.addEventListener("click", () => {

    if (!selectedMovie) return;

    addToWatchlist(selectedMovie._id);

});


modalFavorite.addEventListener("click", () => {

    if (!selectedMovie) return;

    addToFavorites(selectedMovie._id);

});

function closeMovieModal() {

    movieModalWrapper.style.display =
        "none";

    document.body.style.overflow =
        "";

    selectedMovie = null;

}


movieModalClose.addEventListener(
    "click",
    closeMovieModal
);

movieModalWrapper.addEventListener("click", (e) => {

    if (e.target === movieModalWrapper) {

        closeMovieModal();

    }

});

document.addEventListener("keydown", (e) => {

    if (
        e.key === "Escape" &&
        movieModalWrapper.style.display === "flex"
    ) {

        closeMovieModal();

    }

});

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");

function searchMovies() {

    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();

    const filteredMovies = allMovies.filter(movie => {

        const title = movie.title.toLowerCase();
        return title.includes(searchTerm) 
    });

    displayMovies(filteredMovies);
}

searchInput.addEventListener("input", searchMovies);

searchBtn.addEventListener("click", searchMovies);

function watchTrailer(title) {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " official trailer")}`;

    window.open(url, "_blank");
}


function whereToWatch(title) {
    const url = `https://www.justwatch.com/ng/search?q=${encodeURIComponent(title)}`;

    window.open(url, "_blank");
}
const categoryCards = document.querySelectorAll(".box");
categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const genre = card.dataset.genre;

        const filteredMovies = allMovies.filter(movie =>
            movie.genre === genre
        );

        displayMovies(filteredMovies);

    });

});

const moviesLink = document.querySelector("#movies-link");
const seriesLink = document.querySelector("#series-link");

moviesLink.addEventListener("click", () => {
  const moviesOnly = allMovies.filter(movie => movie.type === "Movie");

  displayMovies(moviesOnly);
});

seriesLink.addEventListener("click", () => {
  const seriesOnly = allMovies.filter(movie => movie.type === "Series");

  displayMovies(seriesOnly);
});




async function addToWatchlist(movieId){

    try{

        const res = await fetch(

            "https://fayfay-movie.onrender.com/api/watchlist",

            {

                method:"POST",

                credentials:"include",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    movieId

                })

            }

        );

        const data = await res.json();

        alert(data.message);

    }

    catch(error){

        console.error(error);

    }

}
async function addToFavorites(movieId){

    try{

        const res = await fetch(

            "https://fayfay-movie.onrender.com/api/favorites",

            {

                method:"POST",

                credentials:"include",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    movieId

                })

            }

        );

        const data = await res.json();

        alert(data.message);

    }

    catch(error){

        console.error(error);

    }

}


// console.log(fetchMovies());



// Sign in form pop-up logic 
const signUp = document.querySelector("#sign-up");
const loginForm = document.querySelector("#loginForm")
const modalWrapper = document.querySelector("#modal-wrapper");
const loginMessage = document.querySelector("#login-message")


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = document.querySelector("#identifier").value.trim();
  const password = document.querySelector("#password").value;
  
  const response = await fetch("https://fayfay-movie.onrender.com/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      identifier: identifier,
      password: password
    })
  });

  const data = await response.json();

  if (data.success) {
    alert("Successfully logged in");
    showLoggedInUser(data.data.user);
    loginForm.reset()
    
  } else {
    alert("Invalid credentials");
  }
});

const checkAuth = async () => {
  try {
    const response = await fetch(
      "https://fayfay-movie.onrender.com/api/auth/me",
      {
        method: "GET",
        credentials: "include"
      }
    );

    if (!response.ok) {
      showLoggedOutUser();
      return;
    }

    const data = await response.json();
    console.log("ME RESPONSE:", data);

    if (data.success) {
      showLoggedInUser(data.user);
    } else {
      showLoggedOutUser();
    }

  } catch (error) {
    console.error("Auth check error:", error);
    showLoggedOutUser();
  }
};

const showLoggedInUser = (user) => {

    currentUser = user;

    document.getElementById("logged-out-buttons").style.display = "none";

    document.getElementById("logged-in-user").style.display = "flex";

    document.getElementById("nav-username").textContent =
        `👤 ${user.username}`;

    const dashboardLink =
        document.getElementById("dashboard-link");

    if (user.isVerified === true) {
        dashboardLink.style.display = "block";
    } else {
        dashboardLink.style.display = "none";
    }

    const postMovieLink =
        document.getElementById("post-movie-link");

    if (user.role === "admin") {
        postMovieLink.style.display = "block";
    } else {
        postMovieLink.style.display = "none";
    }

    // Refresh movie cards so admin buttons appear
    displayMovies(allMovies);
};

const showLoggedOutUser = () => {

   
  document.getElementById("logged-out-buttons").style.display = "flex";

  document.getElementById("logged-in-user").style.display = "none";
  // Hide dashboard
  document.getElementById("dashboard-link").style.display = "none";
  // Hide admin link
  document.getElementById("post-movie-link").style.display = "none";

   currentUser = null;
   displayMovies(allMovies)
};

document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    const response = await fetch(
      "https://fayfay-movie.onrender.com/api/auth/logout",
      {
        method: "POST",
        credentials: "include"
      }
    );

    const data = await response.json();

    if (data.success) {
      showLoggedOutUser();
      alert("Logged out successfully");
    }

  } catch (error) {
    console.error("Logout error:", error);
  }

  currentUser = null;
  displayMovies(allMovies)
});
const loginPassword = document.querySelector("#password");
const toggleLoginPassword = document.querySelector("#toggleLoginPassword");

const loginIcon = toggleLoginPassword.querySelector("i");

toggleLoginPassword.addEventListener("click", () => {

  if (loginPassword.type === "password") {
    loginPassword.type = "text";
    loginIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
      loginPassword.type = "password";
      loginIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
});

const signupForm = document.querySelector("#signupForm");
const signupMessage = document.querySelector("#signup-message");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#pass-word").value;

    // Reset message
    signupMessage.style.display = "block";

    // Username validation
    if (username.length < 3) {
        signupMessage.textContent = "Username must be at least 3 characters";
        signupMessage.style.color = "red";
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        signupMessage.textContent = "Enter a valid email address";
        signupMessage.style.color = "red";
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!passwordRegex.test(password)) {
        signupMessage.textContent = "Password must contain uppercase, number and special character";
        signupMessage.style.color = "red";
        return;
    }

    // If everything passes
    try {
        const response = await fetch("https://fayfay-movie.onrender.com/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {
            signupMessage.textContent = "Signup successful!";
            signupMessage.style.color = "green";

            localStorage.setItem("verificationEmail", email);

            window.location.href = "/verify.html";

            signupForm.reset();

            setTimeout(() => {
                signupMessage.style.display = "none";
            }, 3000);

        } else {
            signupMessage.textContent = data.message || "Signup failed";
            signupMessage.style.color = "red";
        }

    } catch (error) {
        signupMessage.textContent = "Something went wrong";
        signupMessage.style.color = "red";
        console.error(error);
    }
});

const signupPassword = document.querySelector("#pass-word");
const toggleSignupPassword = document.querySelector("#toggleSignupPassword");

const signupIcon = toggleSignupPassword.querySelector("i");

toggleSignupPassword.addEventListener("click", () => {

    if (signupPassword.type === "password") {
        signupPassword.type = "text";

        // change eye → eye slash
        signupIcon.classList.replace("fa-eye", "fa-eye-slash");

    } else {
        signupPassword.type = "password";

        // change eye slash → eye
        signupIcon.classList.replace("fa-eye-slash", "fa-eye");
    }

});
const modalLogin = document.querySelector("#modal-login");
const modalSignup = document.querySelector("#modal-signup")

const signIn = document.querySelector("#sign-in");
signIn.addEventListener("click", () => {
    modalWrapper.style.display = "block"; 
    modalSignup.style.display = "none";
    modalLogin.style.display = "block"
    modalLogin.classList.add("popup-animate");
})

signUp.addEventListener("click", () =>{
  modalWrapper.style.display = "block";
  modalLogin.style.display = 'none';
  modalSignup.style.display = "block"
  modalSignup.classList.add("popup-animate")
})

const loginBtn = document.querySelector("#login")
loginBtn.addEventListener("click", () => {
  const identifier = document.querySelector("#identifier").value.trim();
  const password = document.querySelector("#password").value;
  if (!password || !identifier) {
    loginMessage.textContent = "Please fill in all fields.";
    loginMessage.style.display = "block";

    setTimeout(() => {
        loginMessage.style.display = "none";
        
    }, 4000);


    return;
  } 
})

const signupTrigger = document.querySelector("#signup-trigger");

signupTrigger.addEventListener("click", () => {
  modalWrapper.style.display = "block";
  modalLogin.style.display = 'none';
  modalSignup.style.display = "block"
  modalSignup.classList.add("popup-animate")
  
});

const loginTrigger = document.querySelector("#login-trigger");

loginTrigger.addEventListener("click", () => {
  modalWrapper.style.display = "block";
  modalSignup.style.display = 'none';
  modalLogin.style.display = "block"
  modalLogin.classList.add("popup-animate")
  
});



function closeAllModals() {
    modalWrapper.style.display = "none";
    modalLogin.style.display = "none";
    modalSignup.style.display = "none";

    modalLogin.classList.remove("popup-animate");
    modalSignup.classList.remove("popup-animate");

    modalLogin.classList.remove("popdown-animate");
    modalSignup.classList.remove("popdown-animate");

    signupForm.reset()
    loginForm.reset()
};

const signupCloseBtn = document.querySelector("#signupCloseBtn");
signupCloseBtn.addEventListener("click", closeAllModals)

const loginCloseBtn = document.querySelector("#loginCloseBtn");
loginCloseBtn.addEventListener("click", closeAllModals)

document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    checkAuth();
});

const editModalWrapper =
    document.querySelector("#edit-modal-wrapper");

const editModalClose =
    document.querySelector("#edit-modal-close");

const editMovieForm =
    document.querySelector("#editMovieForm");


function openEditMovieModal(movie) {

    document.querySelector("#edit-movie-id").value =
        movie._id;

    document.querySelector("#edit-title").value =
        movie.title || "";

    document.querySelector("#edit-genre").value =
        movie.genre || "";

    document.querySelector("#edit-year").value =
        movie.year || "";

    document.querySelector("#edit-type").value =
        movie.type || "Movie";

    document.querySelector("#edit-synopsis").value =
        movie.synopsis || "";

    document.querySelector("#edit-actors").value =
        movie.actors?.join(", ") || "";

    document.querySelector("#edit-poster").value = "";

    editModalWrapper.style.display = "flex";

    document.body.style.overflow = "hidden";
}

editMovieForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const movieId = document.querySelector("#edit-movie-id").value;

    const formData = new FormData();

    formData.append(
        "title",
        document.querySelector("#edit-title").value.trim()
    );

    formData.append(
        "genre",
        document.querySelector("#edit-genre").value.trim()
    );

    formData.append(
        "year",
        document.querySelector("#edit-year").value
    );

    formData.append(
        "type",
        document.querySelector("#edit-type").value
    );

    formData.append(
        "synopsis",
        document.querySelector("#edit-synopsis").value.trim()
    );

    // Convert actors from:
    // Actor 1, Actor 2, Actor 3
    // into an array
    const actors = document.querySelector("#edit-actors").value
        .split(",")
        .map(actor => actor.trim())
        .filter(actor => actor !== "");

    formData.append("actors", JSON.stringify(actors));

    // Add poster ONLY if a new one was selected
    const posterInput = document.querySelector("#edit-poster");

    if (posterInput.files.length > 0) {
        formData.append("poster", posterInput.files[0]);
    }

    try {
        const response = await fetch(
            `https://fayfay-movie.onrender.com/api/movies/${movieId}`,
            {
                method: "PUT",
                credentials: "include",
                body: formData
            }
        );

        const data = await response.json();

        console.log("UPDATE RESPONSE:", data);

        if (!response.ok) {
            alert(data.message || "Failed to update movie");
            return;
        }

        alert("Movie updated successfully!");

        // Update the movie in our local array
        const index = allMovies.findIndex(
            movie => movie._id === movieId
        );

        if (index !== -1) {
            allMovies[index] = data.data.movie;
        }

        // Close edit modal
        editModalWrapper.style.display = "none";
        document.body.style.overflow = "";

        // Refresh movie cards
        displayMovies(allMovies);

    } catch (error) {
        console.error("Update movie error:", error);

        alert("Something went wrong while updating the movie.");
    }
});

editModalClose.addEventListener("click", () => {

    editModalWrapper.style.display = "none";

    document.body.style.overflow = "";

});

editModalWrapper.addEventListener("click", (e) => {

    if (e.target === editModalWrapper) {

        editModalWrapper.style.display = "none";

        document.body.style.overflow = "";

    }

});

editModalWrapper.addEventListener("click", (e) => {

    if (e.target === editModalWrapper) {

        editModalWrapper.style.display = "none";

        document.body.style.overflow = "";

    }

});

async function deleteMovie(movieId) {

    const movie = allMovies.find(
        movie => movie._id === movieId
    );

    if (!movie) return;


    const confirmed = confirm(
        `Are you sure you want to delete "${movie.title}"?`
    );


    if (!confirmed) return;


    try {

        const response = await fetch(
            `https://fayfay-movie.onrender.com/api/movies/${movieId}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(data.message || "Failed to delete movie");

            return;

        }


        alert("Movie deleted successfully!");


        allMovies = allMovies.filter(
            movie => movie._id !== movieId
        );


        displayMovies(allMovies);


    } catch (error) {

        console.error("Delete movie error:", error);

        alert("Something went wrong while deleting the movie.");

    }

}