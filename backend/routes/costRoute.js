const express = require('express');
const costController = require('../controllers/costController');

const costRoute = express.Router();

costRoute.post("/api/cost/add/", costController.addCost); //add cost
costRoute.get("/api/get/cost/:id", costController.getCostByCropId); //fetch cost by cropId
costRoute.delete("/api/cost/delete/:id", costController.deleteCost); //delete cost by costId

module.exports = costRoute; 