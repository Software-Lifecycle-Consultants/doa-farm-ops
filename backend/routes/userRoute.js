const express = require('express');
const userController = require('../controllers/userController');

const userRoute = express.Router();

userRoute.post("/api/user/register/", userController.createUser);
userRoute.post("/api/user/login/", userController.login);

module.exports = userRoute;