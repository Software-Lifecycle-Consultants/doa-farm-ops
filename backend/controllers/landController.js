const Land = require("../models/landModel");
require("dotenv").config();

const landController = {
  createLand: async (req, res) => {
    try {
      const {
        landId,
        landName,
        district,
        dsdivison,
        landRent,
        irrigationMode,
      } = req.body; 
      const ExistingLand = await Land.findOne({ landId });
      if (ExistingLand)
        return res.status(400).json({
          message:
            "Someone has a land with the same land Id.",
        });

      if (
        !landId ||
        !landName ||
        !district ||
        !dsdivison ||
        !landRent ||
        !irrigationMode 
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      const newLand = new Land({
        landId,
        landName,
        district,
        dsdivison,
        landRent,
        irrigationMode,
      });
      await newLand.save();
      res.json({
        message: "Land successfully created",
        data: newLand,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = landController;
