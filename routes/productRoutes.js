const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/men", async (req, res) => {
  const menItems = await Product.find({ category: "men" });
  res.json(menItems);
});

router.get("/women", async (req, res) => {
  const womenItems = await Product.find({ category: "women" });
  res.json(womenItems);
});

router.get("/kids", async (req, res) => {
  const kidsItems = await Product.find({ category: "kids" });
  res.json(kidsItems);
});

module.exports = router;
