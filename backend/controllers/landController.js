const Land = require("../models/landModel");
const Crop = require("../models/cropModel");
require("dotenv").config();

const landController = {
  createLand: async (req, res) => {
    try {
      const {
        landName,
        district,
        dsDivision,
        landRent,
        irrigationMode,
      } = req.body;
      console.log("land name: " + landName);
      const ExistingLand = await Land.findOne({ landName });
      if (ExistingLand)
        return res.status(400).json({
          message: "Someone has a land with the same land Id.",
        });

      if (!landName || !district || !dsDivision || !landRent || !irrigationMode)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const newLand = new Land({
        landName,
        district,
        dsDivision,
        landRent,
        irrigationMode,
      });

      const savedLand = await newLand.save();
      if (savedLand) {
        res.status(200).json({
          _id: savedLand.id,
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

  addLandAndCrop: async (req, res) => {
    try {
      const {
        landId,
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
      } = req.body;

      const existingLand = await Land.findOne({ landName });
      if (existingLand) {
        return res.status(400).json({
          message: "Someone has a land with the same land name.",
        });
      }

      const newLand = new Land({
        landId,
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
};

module.exports = landController;
