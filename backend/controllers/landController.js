const Land = require("../models/landModel");
const Crop = require("../models/cropModel");
require("dotenv").config();

const landController = {
  createLand: async (req, res) => {
    try {
      const {
        landId,
        landName,
        district,
        dsDivision,
        landRent,
        irrigationMode,
      } = req.body; 
      const ExistingLand = await Land.findOne({ landName });
      if (ExistingLand)
        return res.status(400).json({
          message:
            "Someone has a land with the same land Id.",
        });

      if (
        !landId ||
        !landName ||
        !district ||
        !dsDivision ||
        !landRent ||
        !irrigationMode 
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      const newLand = new Land({
        landId,
        landName,
        district,
        dsDivision,
        landRent,
        irrigationMode,
      });

      const account = await newLand.save();
      if (account) {
        res.status(200).json({
          _id: account.id,
          landId: account.landId,
          landName: account.landName,
          district: account.district,
          dsDivision: account.dsDivision,
          landRent: account.landRent,
          irrigationMode: account.irrigationMode,
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
      const { cropName, season, cropType, totalSoldQty, totalIncome, reservedQtyHome, reservedQtySeed, noOfPicks, isCultivationLoan, loanObtained } = req.body;

      const ExistingCrop = await Crop.findOne({
        cropName: cropName,
      });
      const ExistingLand = await Land.findOne({ _id: id });
      if (ExistingCrop)
        return res.status(400).json({
          message:
            "Crop with this crop name already exists in the database.",
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
        loanObtained
      });
      const newLandRes = await newCrop.save();
      console.log(" addCropToLand: newLandRes:", newLandRes);

      if (res) {
        res.json({
          message: "Crop was successfully added to land.",
          data: newCrop,
        });

        await Land.updateOne(
          { _id: id },
          { $push: { crops: newCrop._id } }
        );
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = landController;
