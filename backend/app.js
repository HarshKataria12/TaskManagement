// Import necessary modules
const express = require("express"); // Framework for building the server
const mongoose = require("mongoose"); // MongoDB object modeling
const path = require("path"); // Handle file paths
const cors = require("cors"); // Middleware for CORS (cross-origin resource sharing)
require("dotenv").config(); // Load environment variables from .env file

// Import route handlers
const authRoutes = require("./routes/authRoutes"); // Authentication routes
const taskRoutes = require("./routes/taskRoutes"); // Task management routes
const profileRoutes = require("./routes/profileRoutes"); // Profile routes

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Allow requests from the frontend on localhost:3000
app.use(cors({
  origin: "http://localhost:3000",
}));

// Get MongoDB URI from environment variable
const mongoUrl = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected successfully")) // Success message
  .catch(err => {
    console.error("MongoDB connection error:", err); // Error message
    process.exit(1); // Exit if connection fails
  });

// Use the route handlers for different API endpoints
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/tasks", taskRoutes); // Task routes
app.use("/api/profile", profileRoutes); // Profile routes

// Serve the frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build"))); // Serve static files
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))); // Serve the index.html for all other routes
}

// Set the port for the server and start listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`); // Log the port the server is running on
});
