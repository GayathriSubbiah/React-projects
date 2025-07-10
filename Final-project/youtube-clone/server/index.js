const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const User = require('./models/User');
const Video = require('./models/Video');
const Comment = require('./models/Comment'); // ✅ FIXED

app.use(cors());
app.use(express.json());

// Serve static video files
app.use("/videos", express.static(path.join(__dirname, "public/videos"))); // ✅ For video playback
app.use("/api", require("./routes/auth"));

// Routes
const videoRoutes = require("./routes/videoRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

const authRoutes = require("./routes/userRoutes");
app.use("/api/users", authRoutes);
const channelRoutes = require("./routes/channelRoutes");
app.use("/api/channels", channelRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/youtubeclone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Auth APIs
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET, // ✅ must match .env
  { expiresIn: '3h' }
);

  res.json({ token, user });
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

app.get('/api/me', authenticate, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  res.json(user);
});

// Search API
app.get("/api/videos/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Query missing" });

  try {
    const videos = await Video.find({
      title: { $regex: q, $options: "i" }
    });
    res.json(videos);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Server
app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
