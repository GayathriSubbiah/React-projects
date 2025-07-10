const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require("../middleware/auth");

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, avatar } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed, avatar });
  await user.save();
  res.json(user);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json("Invalid credentials");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json("Invalid credentials");

  const token = jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET, // ✅ no fallback
  { expiresIn: "3h" }
);

  res.json({ token, user });
});

// GET /api/users/me
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("_id name email");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching current user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
