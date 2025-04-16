const mongoose = require("mongoose");
const Product = require("../models/Product");
const data = require("./products.json");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(data);
    console.log("Data inserted");
    process.exit();
  })
  .catch(err => console.log(err));
