// server/middleware/auth.js
const admin = require("firebase-admin");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if user exists in our database
    let user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      // Create user if they don't exist
      user = new User({
        email: decodedToken.email,
        name: decodedToken.name || "VIT Student",
        firebaseUid: decodedToken.uid,
      });

      await user.save();
    }

    req.user = {
      id: user._id,
      email: user.email,
      firebaseUid: user.firebaseUid,
    };

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
