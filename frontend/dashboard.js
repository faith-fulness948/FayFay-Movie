// =========================
// Logged-in User
// =========================

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("username").textContent = user.username;
}

// =========================
// Dashboard Data
// =========================

let watchlist = [];
let favorites = [];
let recentlyViewed = [];

// =========================
// Update Dashboard Stats
// =========================

function updateStats() {

    document.getElementById("savedCount").textContent =
        watchlist.length;

    document.getElementById("favoriteCount").textContent =
        favorites.length;

    document.getElementById("historyCount").textContent =
        recentlyViewed.length;

}

// =========================
// Render Watchlist
// =========================

function renderWatchlist() {

    const container = document.getElementById("watchlist");

    if (watchlist.length === 0) {

        container.innerHTML = `
            <p>No movies in your watchlist.</p>
        `;

        return;

    }

    container.innerHTML = watchlist.map(movie => `

        <div class="movie-card">

            <img src="${movie.poster}" alt="${movie.title}">

            <h3>${movie.title}</h3>

            <button onclick="removeWatchlist('${movie._id}')">
                Remove
            </button>

        </div>

    `).join("");

}

// =========================
// Render Favorites
// =========================

function renderFavorites() {

    const container = document.getElementById("favorites");

    if (favorites.length === 0) {

        container.innerHTML = `
            <p>No favourite movies yet.</p>
        `;

        return;

    }

    container.innerHTML = favorites.map(movie => `

        <div class="movie-card">

            <img src="${movie.poster}" alt="${movie.title}">

            <h3>${movie.title}</h3>

            <button onclick="removeFavorite('${movie._id}')">
                Remove
            </button>

        </div>

    `).join("");

}

// =========================
// Remove Watchlist
// =========================

function removeWatchlist(id){

    watchlist = watchlist.filter(movie => movie._id !== id);

    renderWatchlist();

    updateStats();

}

// =========================
// Remove Favorite
// =========================

function removeFavorite(id){

    favorites = favorites.filter(movie => movie._id !== id);

    renderFavorites();

    updateStats();

}

// =========================
// Search
// =========================

const search = document.getElementById("search");

search.addEventListener("input",(e)=>{

    const value = e.target.value.toLowerCase();

    const cards = document.querySelectorAll(".movie-card");

    cards.forEach(card=>{

        const title = card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(value)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});

// =========================
// Logout
// =========================

function logout(){

    localStorage.removeItem("user");

    window.location.href="index.html";

}

// =========================
// Logout Button
// =========================

const logoutBtn = document.querySelector(".sidebar li:last-child");

logoutBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    logout();

});

// =========================
// Start Dashboard
// =========================

updateStats();

renderWatchlist();

renderFavorites();

async function fetchDashboard() {

    try {

        const res = await fetch(
            "https://fayfay-movie.onrender.com/api/dashboard",
            {
                credentials: "include"
            }
        );

        const data = await res.json();

        watchlist = data.dashboard.watchlist.map(item => item.movie);

        favorites = data.dashboard.favorites.map(item => item.movie);

        updateStats();

        renderWatchlist();

        renderFavorites();

    } catch (error) {

        console.error(error);

    }

}

fetchDashboard();