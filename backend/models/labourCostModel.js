const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const labourcostschema = new Schema(
  {
    cropId: {
      type: String,
      required: true,
    },
    operationCostId: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    isHired: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    dailyWage: {
      type: Number,
      required: true,
      trim: true,
    },
    foodCostPerDay: {
      type: Number,
      required: true,
    },
    TotallabourCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Labour Costs", labourcostschema);
