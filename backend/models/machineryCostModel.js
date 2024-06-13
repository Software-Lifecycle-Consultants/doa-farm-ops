const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const machinerycostSchema = new Schema(
  {
    cropId: {
      type: String,
      required: true,
    },
    operationCostId: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
      trim: true,
    },
    isOwned: {
      type: String,
      required: true,
      trim: true,
    },
    noUsed: {
      type: Number,
      required: true,
      trim: true,
    },
    days: {
      type: Number,
      required: true,
      trim: true,
    },
    machineryCost: {
      type: Number,
      required: true,
    },
    TotalmachineryCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Machinery Cost", machinerycostSchema);
