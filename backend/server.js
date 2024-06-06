const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
app.use(cors());
app.use(bodyParser.json());

// Hardcoded MongoDB connection string
const MONGODB_URL = 'mongodb://127.0.0.1:27017/doa';

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success!");
});

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Route imports
const userRoute = require("./routes/userRoute");
const cropRoute = require("./routes/cropRoute");
const landRoute = require("./routes/landRoute");

// Routes
app.use(userRoute);
app.use(cropRoute);
app.use(landRoute);
