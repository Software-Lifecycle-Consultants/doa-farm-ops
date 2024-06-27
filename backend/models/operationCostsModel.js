const { FormatListNumbered } = require("@mui/icons-material");
const mongoose = require("mongoose");
const { number } = require("react-i18next/icu.macro");
const { Schema, model } = mongoose;

const operationcostschema = new Schema(
  {
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
      type: Number,
      required: true,
    },
    totalOperationCosts: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Operation Costs", operationcostschema);
