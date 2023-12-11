const express = require("express");
const landController = require("../controllers/landController");

const landRoute = express.Router();

landRoute.post("/api/land/create", landController.createLand);

landRoute.put(
    "/api/land/addCrop/:id",
    landController.addCropToLand
  );

module.exports = landRoute; 