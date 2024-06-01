const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const operationcostschema = new Schema({
  cropId: {
    type: String,
    required: true,
    trim: true,
  },
  majorOp: {
    type: String,
    required: true,
    trim: true,
  },
  subOp: {
    type: String,
    required: true,
    trim: true,
  },
  totalMachineryCosts: {
    type: Number,
    required: true,
    trim: true,
  },
  totalMaterialCosts: {
    type: Number,
    required: true,
  },
  totalLabourCosts: {
    type: String,
    required: true,
  },
  totalOperationCost: {
    type: String,
    required: true,
  },
});

module.exports = model("Operation Costs", operationcostschema);
