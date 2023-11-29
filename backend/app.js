const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/data', (req, res) => {
    // Access posted data from the request body
    const user="user@gmail.com"
    const password="111222"
    const { userName, userPassword } = req.body;
    if (user===userName && password===userPassword) {
        res.json({ message: `${userName}` });
    } else {
        res.json({ message: `Incorrect username or password` });
    }
    
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});