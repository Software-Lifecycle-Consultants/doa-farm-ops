const Land = require("../models/landModel");
const Crop = require("../models/cropModel");
const Operation = require("../models/operationCostsModel");
const Labour = require("../models/labourCostModel");
const Machinery = require("../models/machineryCostModel");
const Material = require("../models/materialCostModel");
const mongoose = require('mongoose');

const cropController = {
  
  addCrop: async (req, res) => {
    try {
          const { cropName, season, cropType, totalSoldQty, totalIncome, reservedQtyHome, reservedQtySeed, noOfPicks, isCultivationLoan, loanObtained, userId, landId } = req.body;
          console.log("addCrop:",
        cropName,
        season,
        cropType,
        totalSoldQty,
        totalIncome,
        reservedQtyHome,
        reservedQtySeed,
        noOfPicks,
        isCultivationLoan,
        loanObtained,
        userId,
        landId,
      );

      if (!cropName || !season || !cropType || !isCultivationLoan)
        return res.status(400).json({ msg: "Please fill mandatory fields." });

      const newCrop = new Crop({
        //landId,  //land Id should be saved
        cropName,
        season,
        cropType,
        totalSoldQty,
        totalIncome,
        reservedQtyHome,
        reservedQtySeed,
        noOfPicks,
        isCultivationLoan,
        loanObtained,
        userId,
        landId
      });

      const account = await newCrop.save();
      if (account) {
        res.status(200).json({
          _id: account.id,
          cropName: account.cropName,
          season: account.season,
          cropType: account.cropType,
          totalSoldQty: account.totalSoldQty,
          totalIncome: account.totalIncome,
          reservedQtyHome: account.reservedQtyHome,
          reservedQtySeed: account.reservedQtySeed,
          noOfPicks: account.noOfPicks,
          isCultivationLoan: account.isCultivationLoan,
          loanObtained: account.loanObtained,
          userId: account.userId,
          landId:account.landId
        });
      } else {
        return res.status(400).json({ msg: "Invalid crop data" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Get crop details by ID
  getCropByUserId: async (req, res) => {
    try {
      const userId = req.params.id;
      const crops = await Crop.find({ userId });
      if (!crops) {
        return res.status(404).json({ message: "Crop not found" });
      }
      cropDetails = {
        crops,
      };
      console.log("cropDetails-----------------", cropDetails);
      res.status(200).json(cropDetails);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  //Update crop by ID
  updateCrop: async (req, res) => {
    try {
      const id = req.params.id;
      const { cropName, season, cropType, totalSoldQty, totalIncome, reservedQtyHome, reservedQtySeed, noOfPicks, isCultivationLoan, loanObtained } = req.body;

      await Crop.findOneAndUpdate(
        { _id: id },
          { cropName, season, cropType, totalSoldQty, totalIncome, reservedQtyHome, reservedQtySeed, noOfPicks, isCultivationLoan, loanObtained }
      );

      const updatedCrop = await Crop.findById(id);

      if (!updatedCrop) {
        return res.status(404).json({ message: "Crop not found" });
      }

      // Send a single response with the updated data
      res.status(200).json({ message: "Crop details updated successfully.", data: updatedCrop });
      return;  // Added return statement to prevent further execution
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },


// Delete crop details by ID
  deleteCrop: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const id = req.params.id;
      
      // Delete cost details of the crop within the transaction
      await Labour.deleteMany({ cropId: id }, { session });
      await Machinery.deleteMany({ cropId: id }, { session });
      await Material.deleteMany({ cropId: id }, { session });
      await Operation.deleteOne({ cropId: id }, { session });

      // Delete the crop within the transaction
      const deletedCrop = await Crop.findByIdAndDelete(
        { _id: id },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      if (!deletedCrop) {
        return res.status(404).json({ message: "Crop not found" });
      }
      res.status(200).json({ message: "Crop deleted successfully", cropId: id });
    } catch (err) {
      // Rollback the transaction if any operation fails
      await session.abortTransaction();
      session.endSession();
      // Return the error response
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = cropController;
