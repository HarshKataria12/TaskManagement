// Importing the jsonwebtoken package to handle JWT operations
const jwt = require("jsonwebtoken");
// Accessing the secret key from the environment variables
const { ACCESS_TOKEN_SECRET } = process.env;

// Function to create an access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15d" // Set the token expiration time (15 days in this case)
  });
};

// Export the function to be used elsewhere in the application
module.exports = { createAccessToken };
