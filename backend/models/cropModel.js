const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cropSchema = new Schema(
    {
      cropName: {
        type: String,
        required: true,
        trim: true,
      },
      season: {
          type: String,
          required: true,
          trim: true,
        },
      cropType: {
        type: String,
        required: true,
        trim: true,
      },
      totalSoldQty: {
        type: String,
        required: true,
        trim: true,
      },
      totalIncome: {
          type: String,
          required: true,
          trim: true,
      },
      reservedQtyHome: {
          type: String,
          required: true,
          trim: true,
      },
      reservedQtySeed: {
          type: String,
          required: true,
          trim: true,
      },
      noOfPicks: {
          type: String,
          required: true,
          trim: true,
      },
      isCultivationLoan: {
          type: String,
          required: true,
          trim: true,
      },
      loanObtained: {
          type: String,
          required: true,
          trim: true,
      },
      userId: {
           type: String,
           required: true,
           trim: true,
        },
      landId:{
            type: String,
            required: true,
            ref: 'Land',  // Assuming land data is stored in a Land model
        },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = model("Crop", cropSchema);
