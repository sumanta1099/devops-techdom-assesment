const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const cloudinary = require('cloudinary');
const mongoose = require("mongoose");

dotenv.config();
const port = process.env.PORT;

////////------ cloudinary -------//////////
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: true
}));

//////-----connection with database-----//////
mongoose.connect(process.env.DB)
  .then(() => {
    console.log("MongoDB connected successfully");

    // After MongoDB is connected, start the Express server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  });

////////--------routes--------/////////
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//////////--------api----------/////////
app.use("/api", userRoutes);
app.use("/api", blogRoutes);

app.get("/", (req, res) => {
    res.send("Express : backend");
});

app.post("/", (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));
    res.status(200).send(req.body);
});
