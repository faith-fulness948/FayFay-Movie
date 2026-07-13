import express from 'express'; // importing the express framework
import "dotenv/config" // parsing environment variables
import cors from "cors"; // cross-origin sharing
import cookieparser from "cookie-parser"
import colors from 'colors' // adding colors to the terminal
import connectDB from './config/connectDB.js'; // database connection
import movieRouter from './routes/movie.route.js'; // movie routes import
import authRouter from './routes/auth.route.js'; // auth routes import
import dashboardRouter from './routes/dashboard.route.js';
import watchlistRoutes from './routes/watchlist.route.js';
import favoriteRoutes from './routes/favorite.route.js';



const app = express(); // initializing the express app
const PORT = process.env.PORT || 3000; // PORT


// Middlewares
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://127.0.0.1:5501", "https://fayfay-movie.netlify.app"],
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(cookieparser())
app.use(express.json()); // parsing JSON object to the server


// Routes
app.use("/", express.static('public')); // Root Route
app.use("/api/movies", movieRouter); // Movie Route
app.use("/api/auth", authRouter); // Auth route
app.use("/api/dashboard", dashboardRouter); // Dashboard route
app.use("/api/watchlist", watchlistRoutes); // Watchlist route
app.use("/api/favorites", favoriteRoutes); // Favorite route

// Route Error 404 handler 
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.url}`
    });
});



// connect to database
connectDB().then(() => {
    // starting the server
    app.listen(PORT, () => {
        console.log(colors.america(`Server is listening at ${PORT}`));
        
    });
});
