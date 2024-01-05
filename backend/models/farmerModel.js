const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const farmerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    household: {
      type: String,
      required: true,
      trim: true,
    },
    orgName: {
      type: String,
      required: true,
      trim: true,
    },
    orgAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Farmer", farmerSchema);