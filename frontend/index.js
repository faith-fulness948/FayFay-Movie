
const fetchMovies = async () => {
  const loading = document.getElementById("loading");
  const loadError = document.getElementById("loadError");
  const movieContainer = document.querySelector("#movieContainer");

  try {
    // 1. Reset UI states before fetching
    loading.style.display = "block";
    loadError.style.display = "none";

    const res = await fetch("https://fayfay-movie.onrender.com/api/movies", {
      method: "GET",
      credentials: "include",
    });

    // 2. Check HTTP status before parsing JSON
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const movies = data?.data?.movies || [];

    // 3. Render HTML safely
    movieContainer.innerHTML = movies.map(movie => `
    <div class="card">

      <img src="${movie.poster}" alt="${movie.title}">

      <span class="movie-year">${movie.year}</span>

      <h3>${movie.title}</h3>

      <p>${movie.genre}</p>

      <p>${movie.synopsis}</p>

      <p><strong>Actors:</strong>${movie.actors}</p>

      <div class="movie-buttons">

        <a href="${movie.watchLink}" target="_blank">
            <button class="watch-btn">
                Watch
            </button>
        </a>

        <button
            class="save-btn"
            onclick="addToWatchlist('${movie._id}')">

            ⭐ Watchlist

        </button>

        <button
            class="fav-btn"
            onclick="addToFavorites('${movie._id}')">

            ❤️ Favorite

        </button>

      </div>

    </div>
    `).join("");

  } catch (error) {
    // 4. Handle errors and show error element
    console.error("Fetch Error:", error);
    loadError.style.display = "block";
  } finally {
    // 5. Always hide loading at the very end
    loading.style.display = "none";
  }
};


document.addEventListener("DOMContentLoaded", fetchMovies)

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
    loginForm.reset()
    
  } else {
    alert("Invalid credentials");
  }
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
};

const signupCloseBtn = document.querySelector("#signupCloseBtn");
signupCloseBtn.addEventListener("click", closeAllModals)

const loginCloseBtn = document.querySelector("#loginCloseBtn");
loginCloseBtn.addEventListener("click", closeAllModals)

// Fetch movies

// const fetchMovies = async () => {
//     try {
//         const res = await fetch("http://localhost:3000/api/movies", {
//             method: "GET",
//             // credentials: "include",
//             // headers: {
//             //     "Content-type": "application/json"
//             // }
//         });

//         const data = await res.json();

//         if(!res.ok){
//             throw new Error(data.message);
            
//         }

//         console.log(data.message);

//         alert(data.message)
        
//     } catch (error) {
//         console.error("Error:", error)
//         alert("Error while fetching movies:", error.message || "Cannot fetch movies!")
//     }
// };

// fetchMovies();



// const signup = async (data) => {
//     try {
//         const res = await fetch("http://localhost:3000/api/auth/signup", {
//             method: "POST",
//             credentials: "include",
//             headers: {
//                 "Content-type": "application/json"
//             },
//             body: JSON.stringify(data),
//         })

        
//         const receive = await res.json();
        
//         if(!res.ok){
//             throw new Error(receive.message);
            
//         }
//         console.log(receive.message);

//         // alert(receive.message)

//     } catch (error) {
//         console.error("Error:", error)
//         alert("Error while signing up:", error || "Cannot signup!")
//     }
// };

// const signupDetails = {
//     username: "Adepeju",
//     email: "ayodejiaronimo@gmail.com",
//     password: "12345678",
// }

// signup(signupDetails)

