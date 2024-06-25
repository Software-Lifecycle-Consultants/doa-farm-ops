const Labour = require("../models/labourCostModel");
const Material = require("../models/materialCostModel");
const Machinery = require("../models/machineryCostModel");
const Operation = require("../models/operationCostsModel");

const costController = {
  getCostByCropId: async (req, res) => {
    try {
      const cropId = req.params.id;
      const operationCost = await Operation.findOne({ cropId: cropId });
      const labourCost = await Labour.find({ cropId: cropId });
      const materialCost = await Material.find({ cropId: cropId });
      const machineryCost = await Machinery.find({ cropId: cropId });

      const response = {
        cropId,
        operationCost,
        labourCost,
        materialCost,
        machineryCost,
      };
      console.log("response", response);

      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  addCost: async (req, res) => {
    try {
      // Get the data from the request
      const {
        cropId,
        majorOp,
        subOp,
        labourCostDetails,
        machineryCostDetails,
        materialCostDetails,
      } = req.body;

      console.log("req.body", req.body);

      let labourresponseData = {};
      let materialresponseData = {};
      let machineryresponseData = {};
      let operationresponseData = {};

      if (
        !cropId ||
        !majorOp ||
        !subOp ||
        !labourCostDetails ||
        !machineryCostDetails ||
        !materialCostDetails
      )
        return res.status(400).json({ msg: "Please fill mandatory fields." });

      /////Get cost details from the request/////

      const oldCostData = await Operation.findOne({ cropId: cropId }).sort({
        $natural: -1,
      });
      const oldtotalLabourCosts =
        oldCostData && oldCostData.totalLabourCosts
          ? oldCostData.totalLabourCosts
          : 0;
      const oldtotalMaterialCosts =
        oldCostData && oldCostData.totalMaterialCosts
          ? oldCostData.totalMaterialCosts
          : 0;
      const oldtotalMachineryCosts =
        oldCostData && oldCostData.totalMachineryCosts
          ? oldCostData.totalMachineryCosts
          : 0;

      //Labour Cost
      let newtotalLabourCosts = 0;
      for (const labourdetails of labourCostDetails) {
        const { gender, isHired, quantity, dailyWage, foodCostPerDay } =
          labourdetails;
        if (!gender || !isHired || !quantity || !dailyWage || !foodCostPerDay) {
          return res
            .status(400)
            .json({ msg: "Please fill in all labour cost fields." });
        }

        newtotalLabourCosts +=
          Number(quantity) * (Number(dailyWage) + Number(foodCostPerDay));
      }

      const totalLabourCosts =
        Number(oldtotalLabourCosts) + newtotalLabourCosts;

      console.log("totalLabour", totalLabourCosts);

      //Material Cost
      let newtotalMaterialCosts = 0;
      for (const materialdeails of materialCostDetails) {
        const { material, qtyUsed, materialCost } = materialdeails;
        console.log("material", materialdeails);
        if (!material || !qtyUsed || !materialCost) {
          return res
            .status(400)
            .json({ msg: "Please fill in all material cost fields." });
        }

        newtotalMaterialCosts += Number(materialCost) * Number(qtyUsed);
      }

      const totalMaterialCosts =
        Number(oldtotalMaterialCosts) + newtotalMaterialCosts;

      console.log("totalMaterial", totalMaterialCosts);

      //Machinery Cost
      let newtotalMachineryCosts = 0;
      for (const machinerydetails of machineryCostDetails) {
        const { method, isOwned, noUsed, days, machineryCost } =
          machinerydetails;

        if (!method || !isOwned || !noUsed || !days || !machineryCost) {
          return res
            .status(400)
            .json({ msg: "Please fill in all machinery cost fields." });
        }

        newtotalMachineryCosts += Number(machineryCost) * Number(days);
      }

      const totalMachineryCosts =
        Number(oldtotalMachineryCosts) + newtotalMachineryCosts;

      console.log("totalMachinery", totalMachineryCosts);

      /// Operation Cost

      const totalOperationCosts =
        totalLabourCosts + totalMaterialCosts + totalMachineryCosts;

      console.log("totalOperation", totalOperationCosts);

      ///////   Save the data to the database   //////

      // Operation Cost
      // Create new operation cost
      let newOperationCost;
      const existingOperationCost = await Operation.findOne({ cropId: cropId });
      if (existingOperationCost) {
        existingOperationCost.totalLabourCosts = totalLabourCosts;
        existingOperationCost.totalMaterialCosts = totalMaterialCosts;
        existingOperationCost.totalMachineryCosts = totalMachineryCosts;
        existingOperationCost.totalOperationCosts = totalOperationCosts;
        newOperationCost = existingOperationCost;
      } else {
        newOperationCost = new Operation({
          cropId,
          totalLabourCosts,
          totalMaterialCosts,
          totalMachineryCosts,
          totalOperationCosts,
        });
      }

      const savedOperationCost = await newOperationCost.save();
      const operationCostId = savedOperationCost.id;

      if (savedOperationCost) {
        operationresponseData = {
          _id: savedOperationCost.id,
          totalLabourCosts: savedOperationCost.totalLabourCosts,
          totalMaterialCosts: savedOperationCost.totalMaterialCosts,
          totalMachineryCosts: savedOperationCost.totalMachineryCosts,
          totalOperationCosts: savedOperationCost.totalOperationCosts,
        };
      } else {
        return res.status(400).json({ msg: "Invalid operation cost data" });
      }

      // Labour Cost
      // Create new labour costs
      await Labour.insertMany(
        labourCostDetails.map((details) => ({
          cropId,
          majorOp,
          subOp,
          operationCostId,
          ...details,
          TotallabourCost:
            Number(details.quantity) *
            (Number(details.dailyWage) + Number(details.foodCostPerDay)),
        }))
      )
        .then((docs) => {
          // docs contains the documents inserted with added _id fields
          console.log("Labaour documents inserted to Collection");

          // Create the labourCost array
          const labourCost = docs.map((doc) => ({
            _id: doc._id,
            cropId: doc.cropId,
            majorOp: doc.majorOp,
            subOp: doc.subOp,
            operationCostId: doc.operationCostId,
            gender: doc.gender,
            isHired: doc.isHired,
            quantity: doc.quantity,
            dailyWage: doc.dailyWage,
            foodCostPerDay: doc.foodCostPerDay,
            TotallabourCost: doc.TotallabourCost,
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

      // Material Cost
      // Create new material costs
      await Material.insertMany(
        materialCostDetails.map((details) => ({
          cropId,
          majorOp,
          subOp,
          operationCostId,
          ...details,
          TotalmaterialCost:
            Number(details.qtyUsed) * Number(details.materialCost),
        }))
      )
        .then((docs) => {
          // docs contains the documents inserted with added _id fields
          console.log("Material documents inserted to Collection");

          // Create the labourCost array
          const materialCost = docs.map((doc) => ({
            _id: doc._id,
            cropId: doc.cropId,
            majorOp: doc.majorOp,
            subOp: doc.subOp,
            operationCostId: doc.operationCostId,
            material: doc.material,
            qtyUsed: doc.qtyUsed,
            materialCost: doc.materialCost,
            TotalmaterialCost: doc.TotalmaterialCost,
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

      // Machinery Cost
      // Create new machinery costs
      await Machinery.insertMany(
        machineryCostDetails.map((details) => ({
          cropId,
          majorOp,
          subOp,
          operationCostId,
          ...details,
          TotalmachineryCost:
            Number(details.days) * Number(details.machineryCost),
        }))
      )
        .then((docs) => {
          // docs contains the documents inserted with added _id fields
          console.log("Machinery documents inserted to Collection");

          // Create the machineryCost array
          const machineryCost = docs.map((doc) => ({
            _id: doc._id,
            cropId: doc.cropId,
            operationCostId: doc.operationCostId,
            majorOp: doc.majorOp,
            subOp: doc.subOp,
            method: doc.method,
            isOwned: doc.isOwned,
            noUsed: doc.noUsed,
            days: doc.days,
            machineryCost: doc.machineryCost,
            TotalmachineryCost: doc.TotalmachineryCost,
          }));

          // Create the response data
          machineryresponseData = machineryCost;
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            msg: "Error saving machinery cost data to the database.",
          });
        });

      const response = {
        labourresponseData,
        materialresponseData,
        machineryresponseData,
        operationresponseData,
      };

      // Send the response
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = costController;
