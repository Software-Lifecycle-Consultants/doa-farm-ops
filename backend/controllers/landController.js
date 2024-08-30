const Land = require("../models/landModel");
const Crop = require("../models/cropModel");
require("dotenv").config();
const mongoose = require('mongoose');
const { deleteCrop } = require("./cropController");

const landController = {
  createLand: async (req, res) => {
    try {
      const {
        landName,
        district,
        dsDivision,
        landRent,
        irrigationMode,
        userId,
      } = req.body;

      /* TO be uncommented if this requirement comes in the future
      const ExistingLand = await Land.findOne({ landName });
      if (ExistingLand)
        return res.status(400).json({
          message: "Someone has a land with the same land Id.",
        });
      */

      if (!landName || !district || !dsDivision || !landRent || !irrigationMode)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const newLand = new Land({
        landName,
        district,
        dsDivision,
        landRent,
        irrigationMode,
        userId,
      });

      const savedLand = await newLand.save();
      if (savedLand) {
        res.status(200).json({
          _id: savedLand.id,
          userId: savedLand.userId,
          landName: savedLand.landName,
          district: savedLand.district,
          dsDivision: savedLand.dsDivision,
          landRent: savedLand.landRent,
          irrigationMode: savedLand.irrigationMode,
        });
      } else {
        return res.status(400).json({ msg: "Invalid land data" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateLand: async (req, res) => {
    try {
      const id = req.params.id;
      const { landName, district, dsDivision, landRent, irrigationMode } =
        req.body;
      console.log("update land name: " + landName);

      if (!landName || !district || !dsDivision || !landRent || !irrigationMode)
        return res.status(400).json({ msg: "Please fill in all fields." });

      await Land.findOneAndUpdate(
        { _id: id },
        { landName, district, dsDivision, landRent, irrigationMode }
      );
      res.json({
        message: "Land update success",
        data: { landName, district, dsDivision, landRent, irrigationMode },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  addCropToLand: async (req, res) => {
    try {
      const id = req.params.id;
      const {
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
      } = req.body;

      const ExistingCrop = await Crop.findOne({
        cropName: cropName,
      });
      const ExistingLand = await Land.findOne({ _id: id });
      if (ExistingCrop)
        return res.status(400).json({
          message: "Crop with this crop name already exists in the database.",
        });

      if (!ExistingLand) {
        return res.status(400).json({
          message: "Land not found in the database.",
        });
      }

      const newCrop = new Crop({
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
      });
      const newLandRes = await newCrop.save();
      console.log(" addCropToLand: newLandRes:", newLandRes);

      if (res) {
        res.json({
          message: "Crop was successfully added to land.",
          data: newCrop,
        });

        await Land.updateOne({ _id: id }, { $push: { crops: newCrop._id } });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  //The service that executes when a crop is added with a land
  addLandAndCrop: async (req, res) => {
    try {
      const {
        landName,
        district,
        dsDivision,
        landRent,
        irrigationMode,
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
      } = req.body;
      console.log("------req from FE-------", req.body);
      const existingLand = await Land.findOne({ landName });
      if (existingLand) {
        return res.status(400).json({
          message: "Someone has a land with the same land name.",
        });
      }

      const newLand = new Land({
        userId,
        landName,
        district,
        dsDivision,
        landRent,
        irrigationMode,
      });

      const savedLand = await newLand.save();

      const newCrop = new Crop({
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
        landId: savedLand._id, // Add landId and set it to savedLand's ID
        userId,
      });

      const savedCrop = await newCrop.save();

      res.status(200).json({
        message: "Land and crop details added successfully.",
        land: savedLand,
        crop: savedCrop,
      });

      await Land.updateOne(
        { _id: savedLand._id },
        { $push: { crops: savedCrop._id } }
      );
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteLand: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const id = req.params.id;

      const land = await Land.findById(id).session(session);
      if (!land) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: "Land not found" });
      }

      const crops = await Crop.find({ landId: id }).session(session);

      // Use deleteCrop for each associated crop
      for (const crop of crops) {
        await deleteCrop(null, null, crop._id, session);
      }

      // Delete the land
      await Land.findByIdAndDelete(id).session(session);

      await session.commitTransaction();
      session.endSession();

      res.json({ message: "Land and associated crops deleted successfully!" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error in deleteLand:", error);
      return res.status(500).json({ message: "An error occurred while deleting the land", error: error.message });
    }
  },
};

module.exports = landController;