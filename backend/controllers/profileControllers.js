const User = require("../models/User");

// Function to get the user's profile based on the authenticated user ID
exports.getProfile = async (req, res) => {
  try {
    // Retrieve the user from the database using the ID stored in the request (from JWT authentication)
   
    const user = await User.findById(req.user.id).select("-password");
    
    // If user is found, return the profile with a success status
    res.status(200).json({ user, status: true, msg: "Profile found successfully.." });
  }
  catch (err) {
    console.error(err);
    // If an error occurs during the process, return an internal server error response
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
