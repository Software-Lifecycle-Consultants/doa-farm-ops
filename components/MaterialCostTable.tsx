import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import TableHead from "@mui/material/TableHead";
import {
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Paper,
  TableContainer,
  Alert,
  Modal,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { customGridStyles1 } from "@/styles/customStyles";
import { t } from "i18next";
import { majorOps, material, subOps } from "@/data/operationCostData";
import { Box } from '@mui/system';
import i18n from '@/app/config/i18n';
import { addMaterialCostAsync, deleteMaterialCost, fetchMaterialCost, selectMaterialCost } from '@/redux/materialCostSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';

interface materialCost {
  material: string;
  qtyUsed: string;
  materialCost: string;
}

interface MaterialCostTable {
  _id: string;
  majorOp: string;
  subOp: string;
  material: string;
  qtyUsed: string;
  materialCost: string;
}

interface MaterialCostTableProps {
  cropId: string;
}

export default function MaterialCostTable({cropId}: MaterialCostTableProps) {

  const [materialMethod, setMaterialMethod] = React.useState<materialCost>({
    material: "",
    qtyUsed: "",
    materialCost: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [majorOperations, setMajorOperations] = React.useState("");
  const [subOperations, setSubOperations] = React.useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [majorOperationsSelected, setMajorOperationsSelected] = useState(false);
  const [subOperationsSelected, setSubOperationsSelected] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [addMaterialCost, setAddMaterialCost] = React.useState<materialCost[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("");
  const [deleteStatus, setDeleteStatus] = useState(false);

  const dispatch: AppDispatch = useDispatch()

  // Fetch material cost data from the database
  useEffect(() => {
    dispatch(fetchMaterialCost(cropId));
  },[cropId,dispatch]);

  const matcost = useSelector(selectMaterialCost);

  const handleOpenDialog = (itemId: string) => {
    setOpenDialog(true);
    setDeleteItemId(itemId); // Assuming each item has a unique ID
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
 
  // Event handler for delete materialCost row in materialyCost table
  const handleDeleteMaterialCost = (index: number) => {
    const newMaterialCost = addMaterialCost.filter((_, i) => i !== index);
    setAddMaterialCost(newMaterialCost);
  };

  // Event handler for select material cost method filter change in material cost table
  const handleChangeMaterialCost = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setMaterialMethod({
      ...materialMethod,
      [field]: event.target.value,
    });
  };

  const handleChangeMaterialCostDropdown = (
    event: SelectChangeEvent,
    field: string
  ) => {
    setMaterialMethod({
      ...materialMethod,
      [field]: event.target.value,
    });
  };

  // Event handler for major operations filter change
  const handleChange1 = (event: SelectChangeEvent) => {
    setMajorOperations(event.target.value);
    setMajorOperationsSelected(true);
    setShowWarning(false);
  };
  // Event handler for sub operations filter change
  const handleChange2 = (event: SelectChangeEvent) => {
    setSubOperations(event.target.value);
    setSubOperationsSelected(true);
    setShowWarning(false);
  };

  // Event handler for select material cost filter change in material cost table
  const handleAddMaterialCost = async () => {
    if (
      !materialMethod.material ||
      !materialMethod.qtyUsed ||
      !materialMethod.materialCost
    ) {
      <Alert severity="error">This is an error Alert.</Alert>;
    } else {
      setAddMaterialCost((prevArray) => [...prevArray, materialMethod]);
      setMaterialMethod({
        material: "",
        qtyUsed: "",
        materialCost: "",
      });
    }
  };

  const handleAddCost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      //Add the operational cost to the database
      if (
        !majorOperationsSelected ||
        !subOperationsSelected ||
        addMaterialCost.length === 0
      ) {
        setShowWarning(true);
      } else {
        setShowWarning(false);

        const costdetails = {
          cropId: cropId,
          majorOp: majorOperations,
          subOp: subOperations,
          machineryCostDetails: [],
          labourCostDetails: [],
          materialCostDetails: addMaterialCost,
        };

        console.log("costdetails", costdetails);

        // Call the addCostData function with the provided cost details
        const response = await dispatch(addMaterialCostAsync(costdetails));
        console.log("Add material cost response from table file:", response);
        // If the operation cost is added successfully, open the success dialog
        if (response.type === 'cost/addMaterialCost/fulfilled') {
          setOpenSuccessDialog(true);
        } else if (response.type === 'cost/addMaterialCostAsync/rejected') {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error adding Material cost", error);
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    handleCloseModal();
    setAddMaterialCost([]);
  };

    //Delete crop data
    const deleteCost = async () => {
      try {
        // Call the deleteCostData function with the provided cost ID
      const response = await dispatch(deleteMaterialCost(deleteItemId));
      if (response.type === 'cost/deleteMaterialCost/fulfilled') {
        handleCloseDialog();
        setDeleteStatus(!deleteStatus);
      } 
      } catch (error) {
        console.error("Error deleting cost data:", error);
      }
    }

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid item container gap={3} p={2} xs={12} md={12} sx={customGridStyles1}>
      <Typography variant="h6">
        {t("operationCost.tblMaterialCost.txtMaterialCost")}
      </Typography>
      <Button variant="outlined" onClick={handleOpenModal}>
        Add Material Cost
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>{t("operationCost.txtMajorOperations")}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{t("operationCost.txtSubOperations")}</Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {t("operationCost.tblMaterialCost.colMaterial")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {t("operationCost.tblMaterialCost.colQuantity")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {t("operationCost.tblMaterialCost.colCostForTheMaterial")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matcost?.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.majorOp}</TableCell>
              <TableCell>{data.subOp}</TableCell>
              <TableCell>{data.material}</TableCell>
              <TableCell>{data.qtyUsed}</TableCell>
              <TableCell>{data.materialCost}</TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon onClick={() => handleOpenDialog(data._id)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TableContainer sx={modalStyle}>
          Add Material Cost
          {/* Major Operations and Sub Operations filters */}
          <Grid item p={2} rowGap={2} xs={12} md={12} sx={customGridStyles1}>
            <FormControl
              variant="filled"
              sx={{
                m: 1,
                width: { xs: "30%", sm: "30%", md: "30%" },
              }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                {t("operationCost.txtMajorOperations")}
              </InputLabel>
              {/* Select dropdown for major operations */}
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={majorOperations}
                onChange={handleChange1}
              >
                {majorOps.map((majorOp) => (
                  <MenuItem key={majorOp.value} value={majorOp.value}>
                    {majorOp.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Sub-operations */}
            <FormControl variant="filled" sx={{ m: 1, width: "30%" }}>
              <InputLabel id="demo-simple-select-filled-label">
                {t("operationCost.txtSubOperations")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={subOperations}
                onChange={handleChange2}
              >
                {subOps.map((subOp) => (
                  <MenuItem key={subOp.value} value={subOp.value}>
                    {subOp.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Hidden form fields for mobile view */}
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={"100%"}
            gap={2}
            sx={{ display: { sm: "none" } }}
          >
            <FormControl
              variant="filled"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                {t("operationCost.tblMaterialCost.colMaterial")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={materialMethod.material}
                onChange={(e) =>
                  handleChangeMaterialCostDropdown(e, "material")
                }
              >
                {material.map((season) => (
                  <MenuItem key={season.value} value={season.value}>
                    {season.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>
                {t("operationCost.tblMaterialCost.colQuantity")}
              </InputLabel>
              <Input
                required
                value={materialMethod.qtyUsed}
                onChange={(e) => handleChangeMaterialCost(e, "qtyUsed")}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>
                {t("operationCost.tblMaterialCost.colCostForTheMaterial")}
              </InputLabel>
              <Input
                required
                value={materialMethod.materialCost}
                onChange={(e) => handleChangeMaterialCost(e, "materialCost")}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <Button variant="outlined" onClick={handleAddMaterialCost}>
                {t("operationCost.tblMaterialCost.capBtnAdd")}
              </Button>
            </FormControl>
          </Grid>
          {/* Material Cost Data Table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography sx={{ display: { sm: "none" } }}>
                    {t("operationCost.tblMaterialCost.colMaterial")}
                  </Typography>
                  <FormControl
                    variant="filled"
                    fullWidth
                    sx={{
                      minWidth: 120,
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      {t("operationCost.tblMaterialCost.colMaterial")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={materialMethod.material}
                      onChange={(e) =>
                        handleChangeMaterialCostDropdown(e, "material")
                      }
                    >
                      {material.map((season) => (
                        <MenuItem key={season.value} value={season.value}>
                          {season.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography sx={{ display: { sm: "none" } }}>
                    {t("operationCost.tblMaterialCost.colQuantity")}
                  </Typography>
                  <FormControl
                    variant="standard"
                    fullWidth
                    sx={{
                      minWidth: 120,
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    <InputLabel>
                      {t("operationCost.tblMaterialCost.colQuantity")}
                    </InputLabel>
                    <Input
                      required
                      value={materialMethod.qtyUsed}
                      onChange={(e) => handleChangeMaterialCost(e, "qtyUsed")}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography sx={{ display: { sm: "none" } }}>
                    {t("operationCost.tblMaterialCost.colCostForTheMaterial")}
                  </Typography>
                  <FormControl
                    variant="standard"
                    fullWidth
                    sx={{
                      minWidth: 120,
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    <InputLabel>
                      {t("operationCost.tblMaterialCost.colCostForTheMaterial")}
                    </InputLabel>
                    <Input
                      required
                      value={materialMethod.materialCost}
                      onChange={(e) =>
                        handleChangeMaterialCost(e, "materialCost")
                      }
                    />
                  </FormControl>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <FormControl
                    variant="standard"
                    fullWidth
                    sx={{
                      minWidth: 120,
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    <Button variant="outlined" onClick={handleAddMaterialCost}>
                      {t("operationCost.tblMaterialCost.capBtnAdd")}
                    </Button>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addMaterialCost.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.material}</TableCell>
                  <TableCell>{data.qtyUsed}</TableCell>
                  <TableCell>{data.materialCost}</TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteIcon
                        onClick={() => handleDeleteMaterialCost(index)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            {showWarning && (
              <Alert severity="warning">
                Please add necessary fields before saving.
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={handleAddCost}
            >
              Submit
            </Button>
          </Box>
        </TableContainer>
      </Modal>
      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
        aria-labelledby="success-dialog-title"
      >
        {/* Display a translated 'Record Updated successfully!' message based on the selected language. */}
        <DialogTitle id="success-dialog-title">
          {" "}
          {i18n.t("dialogBoxes.txtUpdatedSuccess")}
        </DialogTitle>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleCloseSuccessDialog}
            variant="contained"
            color="primary"
          >
            {i18n.t("dialogBoxes.capBtnOk")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined"  onClick={handleCloseDialog}>Cancel</Button>
        <Button variant="contained"  onClick={deleteCost} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
    </Grid>
  );
}
