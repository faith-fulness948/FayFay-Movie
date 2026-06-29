
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
        <h3>${movie.title}</h3>
        <p class="movie-year">${movie.year}</p>
        <p class="movie-genre">${movie.genre}</p>
        <p class="actors"><strong>Actors:</strong> ${movie.actors.join(", ")}</p>
        <p class="synopsis">${movie.synopsis}</p>
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


// console.log(fetchMovies());



// Sign in form pop-up logic 
const signIn = document.querySelector("#sign-in");
const login = document.querySelector("#login")
const modalWrapper = document.querySelector("#modal-wrapper");
const modal = document.querySelector("#modal");
const identifier = document.querySelector("#identifier").value.trim();
const password = document.querySelector("#password").value;
const message = document.querySelector("#message")



signIn.addEventListener("click", () => {
    modalWrapper.style.display = "block"; 
    modal.classList.add("popup-animate");
})



login.addEventListener("click", () => {
    if (!password || !identifier) {
        message.textContent = "Please fill in all fields.";
        message.style.display = "block";

        setTimeout(() => {
            message.style.display = "none";
        
        }, 4000);


        return;
    } 
    
    login()
})





// close modal
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
    modalWrapper.style.display = "none";
    modal.classList.add("popdown-animate")
    
})

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

