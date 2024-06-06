const Labour = require("../models/labourCostModel");
const Material = require("../models/materialCostModel");
const Machinery = require("../models/machineryCostModel");
const Operation = require("../models/operationCostsModel");

const costController = {
  addCost: async (req, res) => {
    try {
      const {
        cropId,
        majorOp,
        subOp,
        labourCostDetails,
        machineryCostDetails,
        materialCostDetails,
        // operationCostDetails,
      } = req.body;

      console.log("req.body", req.body);

      let labourresponseData = {};
      let materialresponseData = {};
      let machineryresponseData = {};

      if (
        !labourCostDetails ||
        !machineryCostDetails ||
        !materialCostDetails
        // !operationCostDetails
      )
        return res.status(400).json({ msg: "Please fill mandatory fields." });

      // const { cropId, majorOp, subOp } = operationCostDetails;

      if (!cropId || !majorOp || !subOp) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      // // Create new operation cost
      // const newOperationCost = new Operation({
      //   cropId,
      //   majorOp,
      //   subOp,

      //   ///////////////// total cost adding part///////////////////////////
      // });

      // // Save operation cost
      // const savedOperationCost = await newOperationCost.save();
      // const operationCostId = savedOperationCost.id;

      // if (savedOperationCost) {
      //   res.status(200).json({
      //     _id: savedOperationCost.id,
      //     cropId: savedOperationCost.cropId,
      //     majorOp: savedOperationCost.majorOp,
      //     subOp: savedOperationCost.subOp,
      //     // totalMachineryCosts: savedOperationCost.totalMachineryCosts,
      //     // totalMaterialCosts: savedOperationCost.totalMaterialCosts,
      //     // totalLabourCosts: savedOperationCost.totalLabourCosts,
      //     // totalOperationCost: savedOperationCost.totalOperationCost,
      //   });
      // } else {
      //   return res.status(400).json({ msg: "Invalid operation cost data" });
      // }

      ///////////////     Labour Cost    /////////////////////

      for (const labourdetails of labourCostDetails) {
        const { gender, isHired, qty, dailyWage, foodCost } = labourdetails;

        if (!gender || !isHired || !qty || !dailyWage || !foodCost) {
          return res.status(400).json({ msg: "Please fill in all fields." });
        }
      }

      // Create new labour costs
      await Labour.insertMany(
        labourCostDetails.map((details) => ({
          cropId,
          ...details,
        }))
      )
        .then((docs) => {
          // docs contains the documents inserted with added _id fields
          console.log("Labaour documents inserted to Collection");

          // Create the labourCost array
          const labourCost = docs.map((doc) => ({
            _id: doc._id,
            cropId: doc.cropId,
            gender: doc.gender,
            isHired: doc.isHired,
            qty: doc.qty,
            dailyWage: doc.dailyWage,
            foodCost: doc.foodCost,
          }));

          // Create the response data
          labourresponseData = labourCost;
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({ msg: "Error saving labour cost data to the database." });
        });

      ///////////////   Material Cost   /////////////////////

      for (const materialdeails of materialCostDetails) {
        const { material, qtyUsed, materialCost } = materialdeails;

        if (!material || !qtyUsed || !materialCost) {
          return res.status(400).json({ msg: "Please fill in all fields." });
        }
      }

      // Create new material costs
      await Material.insertMany(
        materialCostDetails.map((details) => ({
          cropId,
          ...details,
        }))
      )
        .then((docs) => {
          // docs contains the documents inserted with added _id fields
          console.log("Material documents inserted to Collection");

          // Create the labourCost array
          const materialCost = docs.map((doc) => ({
            _id: doc._id,
            cropId: doc.cropId,
            material: doc.material,
            qtyUsed: doc.qtyUsed,
            materialCost: doc.materialCost,
          }));

          // Create the response data
          materialresponseData = materialCost;
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({ msg: "Error saving material cost data to the database." });
        });

      ///////////////   Machinery Cost   /////////////////////
      for (const machinerydetails of machineryCostDetails) {
        const { method, isOwned, noUsed, days, machineryCost } =
          machinerydetails;

        if (!method || !isOwned || !noUsed || !days || !machineryCost) {
          return res.status(400).json({ msg: "Please fill in all fields." });
        }
      }

        // Create new machinery costs
        await Machinery.insertMany(
          machineryCostDetails.map((details) => ({
            cropId,
            ...details,
          }))
        )
          .then((docs) => {
            // docs contains the documents inserted with added _id fields
            console.log("Machinery documents inserted to Collection");

            // Create the machineryCost array
            const machineryCost = docs.map((doc) => ({
              _id: doc._id,
              cropId: doc.cropId,
              method: doc.method,
              isOwned: doc.isOwned,
              noUsed: doc.noUsed,
              days: doc.days,
              machineryCost: doc.machineryCost,
            }));

            // Create the response data
            machineryresponseData = machineryCost;
          })
          .catch((err) => {
            console.error(err);
            res
              .status(500)
              .json({
                msg: "Error saving machinery cost data to the database.",
              });
          });

      const response = {
        labourresponseData,
        materialresponseData,
        machineryresponseData,
      };

      // Send the response
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = costController;
