const express = require('express');
const userController = require('../controllers/userController');

const userRoute = express.Router();

userRoute.post("/api/data/", userController.createUser);

module.exports = userRoute;