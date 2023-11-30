const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//route imports
const userRoute = require("./routes/userRoute");

//routes
app.use(userRoute);