const express = require('express');
const costController = require('../controllers/costController');

const costRoute = express.Router();

costRoute.post("/api/cost/add/", costController.addCost); //add cost

module.exports = costRoute; 