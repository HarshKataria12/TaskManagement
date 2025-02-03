const mongoose = require("mongoose"); // Importing mongoose to define the schema

// Defining the User schema
const userSchema = new mongoose.Schema({
  // User's name (must be a string and is required)
  name: {
    type: String, // The name will be stored as a string
    required: [true, "Please enter your name"], // Name is a required field
    trim: true, // This will remove any extra spaces from the start and end of the name
  },

  // User's email (must be a string, is required, and must be unique)
  email: {
    type: String, // The email will be stored as a string
    required: [true, "Please enter your email"], // Email is a required field
    trim: true, // This will remove any extra spaces from the start and end of the email
    unique: true, // The email must be unique across all users
  },

  // User's password (must be a string and is required)
  password: {
    type: String, // The password will be stored as a string
    required: [true, "Please enter your password"], // Password is a required field
  },

  // The time when the user joined (defaults to the current date/time)
  joiningTime: {
    type: Date, // The joining time will be stored as a Date
    default: Date.now, // Defaults to the current date and time
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields to the user
});

// Create a mongoose model based on the user schema
const User = mongoose.model("User", userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
