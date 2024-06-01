const Labour = require("../models/labourCostModel");
const Material = require("../models/materialCostCModel");
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

      const { gender, isHired, qty, dailyWage, foodCost } = labourCostDetails;

      if (!gender || !isHired || !qty || !dailyWage || !foodCost) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      // Create new labour cost
      const newLabourCost = new Labour({
        cropId,
        // operationCostId,
        gender,
        isHired,
        qty,
        dailyWage,
        foodCost,
      });

      // Save labour cost
      const savedlabourCost = await newLabourCost.save();

      // if (savedlabourCost) {
      //   res.status(200).json({
      //     _id: savedlabourCost.id,
      //     cropId: savedlabourCost.cropId,
      //     //operationCostId: savedlabourCost.id,
      //     gender: savedlabourCost.gender,
      //     isHired: savedlabourCost.isHired,
      //     qty: savedlabourCost.qty,
      //     dailyWage: savedlabourCost.dailyWage,
      //     foodCost: savedlabourCost.foodCost
      //   });
      // } else {
      //   return res.status(400).json({ msg: "Invalid labour cost data" });
      // }

      const { material, qtyUsed, materialCost } = materialCostDetails;

      if (!material || !qtyUsed || !materialCost) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      // Create new material cost
      const newMaterialCost = new Material({
        cropId,
        // operationCostId,
        material,
        qtyUsed,
        materialCost,
      });

      // Save material cost
      const savedMaterialCost = await newMaterialCost.save();

      // if (savedMaterialCost) {
      //   res.status(200).json({
      //     _id: savedMaterialCost.id,
      //     cropId: savedMaterialCost.cropId,
      //     // operationCostId: savedMaterialCost.id,
      //     material: savedMaterialCost.material,
      //     qtyUsed: savedMaterialCost.qtyUsed,
      //     materialCost: savedMaterialCost.materialCost,
      //   });
      // } else {
      //   return res.status(400).json({ msg: "Invalid material cost data" });
      // }

      const { method, isOwned, noUsed, days, machineryCost } =
        machineryCostDetails;

      if (!method || !isOwned || !noUsed || !days || !machineryCost) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      // Create new machinery cost
      const newMachineryCost = new Machinery({
        cropId,
        // operationCostId,
        method,
        isOwned,
        noUsed,
        days,
        machineryCost,
      });

      // Save machinery cost
      const savedMachineryCost = await newMachineryCost.save();

      if (savedMachineryCost) {
        res.status(200).json({
          machineryCost: {
            _id: savedMachineryCost.id,
            cropId: savedMachineryCost.cropId,
            // operationCostId: savedMachineryCost.operationCostId,
            method: savedMachineryCost.method,
            isOwned: savedMachineryCost.isOwned,
            noUsed: savedMachineryCost.noUsed,
            days: savedMachineryCost.days,
            machineryCost: savedMachineryCost.machineryCost,
          },
          materialCost: {
            _id: savedMaterialCost.id,
            cropId: savedMaterialCost.cropId,
            // operationCostId: savedMaterialCost.operationCostId,
            material: savedMaterialCost.material,
            qtyUsed: savedMaterialCost.qtyUsed,
            materialCost: savedMaterialCost.materialCost,
          },
          labourCost: {
            _id: savedlabourCost.id,
            cropId: savedlabourCost.cropId,
            // operationCostId: savedlabourCost.operationCostId,
            gender: savedlabourCost.gender,
            isHired: savedlabourCost.isHired,
            qty: savedlabourCost.qty,
            dailyWage: savedlabourCost.dailyWage,
            foodCost: savedlabourCost.foodCost,
          },
        });
      } else {
        return res.status(400).json({ msg: "Invalid machinery cost data" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = costController;
