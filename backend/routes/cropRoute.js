const express = require('express');
const cropController = require('../controllers/cropController');

const cropRoute = express.Router();

cropRoute.post("/api/crop/add/", cropController.addCrop);

module.exports = cropRoute;