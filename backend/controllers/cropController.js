const Crop = require("../models/cropModel");

const cropController = {

    addCrop: async (req, res) => {
        try {
          const { cropName, season, cropType, totalSoldQty, totalIncome, reservedQtyHome, reservedQtySeed, noOfPicks, isCultivationLoan, loanObtained } = req.body;
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
            loanObtained
          );
    
          if (!cropName || !season || !cropType || !isCultivationLoan)
            return res.status(400).json({ msg: "Please fill mandatory fields." });
    
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
              loanObtained: account.loanObtained
            });
          } else {
            return res.status(400).json({ msg: "Invalid crop data" });
          }
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      },
      
      
}

module.exports = cropController;