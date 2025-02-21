const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const { validateEmail } = require("../utils/validation");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, msg: "Please fill all the fields." });
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ success: false, msg: "Invalid input types. Expected strings." });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, msg: "Password must be at least 6 characters long." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, msg: "Invalid email format." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "Email is already registered." });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      msg: "Account successfully created.",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Please enter all details." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, msg: "Email is not registered." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: "Incorrect password." });
    }

    // Generate token
    const token = createAccessToken({ id: user._id });

    // Remove password before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      msg: "Login successful.",
      token,
      user: userResponse,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};
