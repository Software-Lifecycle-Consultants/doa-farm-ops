const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
        type: String,
        required: true,
      },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    nic: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);