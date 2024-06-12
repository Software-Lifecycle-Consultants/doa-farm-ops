const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const materialcostSchema = new Schema(
  {
    cropId: {
      type: String,
      required: true,
    },
    operationCostId: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
      trim: true,
    },
    qtyUsed: {
      type: Number,
      required: true,
      trim: true,
    },
    materialCost: {
      type: Number,
      required: true,
      trim: true,
    },
    TotalmaterialCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Material Cost", materialcostSchema);
