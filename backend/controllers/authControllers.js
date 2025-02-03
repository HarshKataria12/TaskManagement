const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const { validateEmail } = require("../utils/validation");

// Signup function to handle user registration
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if required fields are missing
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    // Ensure that the fields are of type 'string'
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Please send string values only" });
    }

    // Ensure password length is at least 4 characters
    if (password.length < 4) {
      return res.status(400).json({ msg: "Password length must be atleast 4 characters" });
    }

    // Validate the email format
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    // Check if the email is already registered
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    // Return success message upon successful account creation
    res.status(200).json({ msg: "Congratulations!! Account has been created for you.." });
  }
  catch (err) {
    console.error(err);
    // Catch any unexpected errors and return an internal server error response
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

// Login function to handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ status: false, msg: "Please enter all details!!" });
    }

    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });

    // Create an access token after successful login
    const token = createAccessToken({ id: user._id });
    
    // Remove the password field from the user object before sending the response
    delete user.password;

    // Return the success response with the token and user data
    res.status(200).json({ token, user, status: true, msg: "Login successful.." });
  }
  catch (err) {
    console.error(err);
    // Catch any unexpected errors and return an internal server error response
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
