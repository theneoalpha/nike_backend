const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


router.post("/logout", (req, res) => {
  
  res.json({ msg: "Logged out successfully" });
});

module.exports = router;
