const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const landSchema = new Schema(
  {
    landId: {
      type: String,
      required: true,
    },
    landName: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    dsDivision: {
      type: String,
      required: true,
      trim: true,
    },
    landRent: {
      type: String,
      required: true,
      trim: true,
    },
    irrigationMode: {
      type: String,
      required: true,
    },
    crops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Crop",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Land", landSchema);
