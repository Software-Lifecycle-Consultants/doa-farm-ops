const express = require('express');
const cropController = require('../controllers/cropController');

const cropRoute = express.Router();

cropRoute.post("/api/crop/add/", cropController.addCrop);
cropRoute.get("/api/get/crops/:id", cropController.getCropByUserId);
cropRoute.delete("/api/crop/delete/:id", cropController.deleteCrop);

module.exports = cropRoute;
