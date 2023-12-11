const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("MongoDB Connection Success!")
})

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//route imports
const userRoute = require("./routes/userRoute");
const cropRoute = require("./routes/cropRoute");
const landRoute = require("./routes/landRoute");
//routes
app.use(userRoute);
app.use(cropRoute);
app.use(landRoute);