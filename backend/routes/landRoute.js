const express = require("express");
const landController = require("../controllers/landController");

const landRoute = express.Router();

landRoute.post("/api/land/create", landController.createLand);

landRoute.put("/api/land/updateLand/:id", landController.updateLand);

landRoute.put(
    "/api/land/addCrop/:id",
    landController.addCropToLand
  );

landRoute.post("/api/landAndCrop/add", landController.addLandAndCrop);

landRoute.delete("/api/land/deleteLand/:id", landController.deleteLand);

module.exports = landRoute; 