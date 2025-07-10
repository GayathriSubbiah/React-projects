const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const Channel = require("../models/Channel");
const authenticate = require("../middleware/auth");

// ✅ GET a user's own channel
// GET currently logged-in user's channel
router.get("/me", authenticate, async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.userId });
    if (!channel) return res.status(404).json({ error: "No channel found" });

    res.json(channel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET channel info + videos
router.get("/:channelId", async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: "Channel not found" });

    const videos = await Video.find({ channelId: req.params.channelId });
    res.json({ channel, videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/channels
router.post("/", authenticate, async (req, res) => {
  try {
    const { name, handle } = req.body;

    // Ensure both are provided
    if (!name || !handle) {
      return res.status(400).json({ message: "Name and handle are required" });
    }

    // Check if handle already exists
    const existing = await Channel.findOne({ handle });
    if (existing) {
      return res.status(409).json({ message: "Handle already taken" });
    }

    const channel = new Channel({
      name,
      handle,
      owner: req.user.userId
    });

    await channel.save();
    res.status(201).json(channel);
  } catch (err) {
    console.error("Channel creation error:", err);
    res.status(500).json({ message: "Failed to create channel" });
  }
});

// ✅ DELETE a video from a channel
router.delete("/:channelId/video/:videoId", authenticate, async (req, res) => {
  const { channelId, videoId } = req.params;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel || channel.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await channel.videos.pull(videoId);
    await channel.save();
    await Video.findByIdAndDelete(videoId);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete video" });
  }
});
// PUT update your own channel’s metadata
router.put("/:channelId", authenticate, async (req, res) => {
  try {
    const { name, handle, description, avatar } = req.body;
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: "Channel not found" });
    if (channel.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (name)        channel.name        = name;
    if (handle)      channel.handle      = handle.toLowerCase().trim();
    if (description) channel.description = description;
    if (avatar)      channel.avatar      = avatar;

    await channel.save();
    res.json(channel);
  } catch (err) {
    console.error("Channel update error:", err);
    res.status(500).json({ error: "Failed to update channel" });
  }
});

// DELETE a video from your channel
router.delete("/:channelId/video/:videoId", authenticate, async (req, res) => {
  try {
    const { channelId, videoId } = req.params;
    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json({ error: "Channel not found" });
    if (channel.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // remove from channel.videos array
    channel.videos.pull(videoId);
    await channel.save();

    // delete the video doc itself
    await Video.findByIdAndDelete(videoId);

    res.json({ success: true });
  } catch (err) {
    console.error("Delete video error:", err);
    res.status(500).json({ error: "Failed to delete video" });
  }
});

module.exports = router;
