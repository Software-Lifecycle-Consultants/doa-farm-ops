const express = require('express');
const cropController = require('../controllers/cropController');

const cropRoute = express.Router();

cropRoute.post("/api/crop/add/", cropController.addCrop); //add crop
cropRoute.get("/api/get/crops/:id", cropController.getCropByUserId); //fetch crop by userId
cropRoute.delete("/api/crop/delete/:id", cropController.deleteCrop); //delete crop
cropRoute.put("/api/crop/update/:id", cropController.updateCrop); //update crop

module.exports = cropRoute;
