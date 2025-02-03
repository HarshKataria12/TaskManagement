const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken package to verify tokens
const User = require("../models/User"); // Importing the User model to check if the user exists
const { ACCESS_TOKEN_SECRET } = process.env; // Accessing the secret key for verifying the JWT

// Middleware to verify the access token
exports.verifyAccessToken = async (req, res, next) => {

  // Get the token from the request header. It's typically passed as "Authorization: Bearer <token>"
  const token = req.header("Authorization");

  // If no token is found, return a 400 (Bad Request) response with a message
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });

  let user;

  try {
    // Verify the token using the secret key from environment variables
    user = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    // If token verification fails, return a 401 (Unauthorized) response with an "Invalid token" message
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }

  try {
    // After verifying the token, find the user in the database based on the ID in the token payload
    user = await User.findById(user.id);

    // If the user is not found in the database, return a 401 (Unauthorized) response with a "User not found" message
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    // If everything is fine, attach the user object to the request object and move to the next middleware
    req.user = user;
    next();
  } catch (err) {
    // If there is an error fetching the user from the database, log the error and send a 500 (Internal Server Error) response
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
