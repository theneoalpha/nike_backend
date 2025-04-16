const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*', 
}));
app.use(express.json());


const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');


app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running on port', process.env.PORT || 3000);
    });
  })
  .catch((err) => console.log(err));
