const mongoose = require("mongoose");

// Function to validate if an email is in a valid format
const validateEmail = (email) => {
  return String(email)
    .toLowerCase() // Converts the email to lowercase to ensure case-insensitivity
    .match( // Matches the email with a regex pattern for a valid email address
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Function to validate if a given string is a valid MongoDB ObjectId
const validateObjectId = (string) => {
  return mongoose.Types.ObjectId.isValid(string); // Uses Mongoose's built-in validation method for ObjectId
}

module.exports = {
  validateEmail,
  validateObjectId,
}
