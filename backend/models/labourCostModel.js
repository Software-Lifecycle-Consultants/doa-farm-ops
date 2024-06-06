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
      type: Boolean,
      required: true,
      trim: true,
    },

    qty: {
      type: Number,
      required: true,
      trim: true,
    },
    dailyWage: {
      type: Number,
      required: true,
      trim: true,
    },
    foodCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Labour Costs", labourcostschema);
