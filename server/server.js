// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");

// Load env variables
dotenv.config();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const app = express();

// Middleware
app.use(cors());
// In server.js
app.use('/api/posts', require('./routes/posts'));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Routes
app.use("/api/posts", require("./routes/posts"));
// app.use("/api/users", require("./routes/users"));

// Auth middleware
const auth = require("./middleware/auth");
app.get("/api/auth/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
