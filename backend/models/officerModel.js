const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const officerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orgName: {
      type: String,
      required: true,
      trim: true,
    },
    orgAddress: {
      type: String,
      required: true,
      trim: true,
    },
    university: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Officer", officerSchema);