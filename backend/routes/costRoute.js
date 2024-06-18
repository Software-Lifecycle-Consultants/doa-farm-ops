const express = require('express');
const costController = require('../controllers/costController');

const costRoute = express.Router();

costRoute.post("/api/cost/add/", costController.addCost); //add cost
costRoute.get("/api/get/cost/:id", costController.getCostByCropId); //fetch cost by cropId

module.exports = costRoute; 