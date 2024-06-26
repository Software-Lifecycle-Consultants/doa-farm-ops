import React, { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import TableHead from "@mui/material/TableHead";
import { machinery, majorOps, subOps } from "../data/operationCostData";
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
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { customGridStyles1 } from "@/styles/customStyles";
import { t } from "i18next";
import { addCostData } from "@/api/addCostData";
import i18n from "@/app/config/i18n";
import { deleteCostData } from "@/api/deleteCostData";
import { fetchCostData } from "@/api/fetchCostData";

interface MachineryCost {
  method: string;
  isOwned: string;
  noUsed: string;
  days: string;
  machineryCost: string;
}

interface MachineryCostTable {
  _id: string;
  majorOp: string;
  subOp: string;
  method: string;
  isOwned: string;
  noUsed: string;
  days: string;
  machineryCost: string;
}

interface MachineryCostTableProps {
  cropId: string;
}

export default function MachineryCostTable({cropId}: MachineryCostTableProps) {

  const [majorOperations, setMajorOperations] = React.useState("");
  const [subOperations, setSubOperations] = React.useState("");
  const [majorOperationsSelected, setMajorOperationsSelected] = useState(false);
  const [subOperationsSelected, setSubOperationsSelected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [addMachinery, setaddMachinery] = React.useState<MachineryCost[]>([]);
  const [machinerycost, setMachineryCost] = React.useState<MachineryCostTable[]>([]);
  const [machineryMethod, setMachineryMethod] = React.useState<MachineryCost>({
    method: "",
    isOwned: "",
    noUsed: "",
    days: "",
    machineryCost: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("");

  const handleOpenDialog = (itemId: string) => {
    setOpenDialog(true);
    setDeleteItemId(itemId); // Assuming each item has a unique ID
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Event handler for select machineryCost method filter change in machineryCost table
  const handleChangeMachineryCost = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setMachineryMethod({
      ...machineryMethod,
      [field]: event.target.value,
    });
  };

  const handleChangeMachineryCostDropdown = (
    event: SelectChangeEvent,
    field: string
  ) => {
    setMachineryMethod({
      ...machineryMethod,
      [field]: event.target.value,
    });
  };

  // Event handler for select material machineryCost filter change in material machineryCost table
  const handleAddMachineCost = async () => {
    if (
      !machineryMethod.method ||
      !machineryMethod.isOwned ||
      !machineryMethod.noUsed ||
      !machineryMethod.days ||
      !machineryMethod.machineryCost
    ) {
      <Alert severity="error">This is an error Alert.</Alert>;
    } else {
      setaddMachinery((prevArray) => [...prevArray, machineryMethod]);
      setMachineryMethod({
        method: "",
        isOwned: "",
        noUsed: "",
        days: "",
        machineryCost: "",
      });
    }
  };

  // Event handler for delete machineryCost row in machineryCost table
  const handleDeleteMachineCost = (index: number) => {
    const newMachineCost = addMachinery.filter((_, i) => i !== index);
    setaddMachinery(newMachineCost);
  };

   //Delete crop data
   const deleteCost = async () => {
    try {
      // Call the deleteCostData function with the provided cost ID
    const response = await deleteCostData(deleteItemId);
    if (response && response.status === 200) {
      console.log("Delete cost response", response);
      handleCloseDialog();
    } 
    } catch (error) {
      console.error("Error deleting cost data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCost = await fetchCostData(cropId);
      const mcost = fetchedCost.machineryCost;
      setMachineryCost(mcost);
    };
    fetchData();
  }, [cropId, machinerycost]);

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

  const handleAddCost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      //Add the operational cost to the database
      if (
        !majorOperationsSelected ||
        !subOperationsSelected ||
        addMachinery.length === 0
      ) {
        setShowWarning(true);
      } else {
        setShowWarning(false);

        const costdetails = {
          cropId: cropId,
          majorOp: majorOperations,
          subOp: subOperations,
          machineryCostDetails: addMachinery,
          labourCostDetails: [],
          materialCostDetails: [],
        };

        console.log("costdetails", costdetails);

        // Call the addCostData function with the provided cost details
        const response = await addCostData(costdetails);

        // If the operation cost is added successfully, open the success dialog
        if (response && response.status === 200) {
          setOpenSuccessDialog(true);
        } else if (response && response.status === 400) {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error adding Machinery cost", error);
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    handleCloseModal();
    setaddMachinery([]);
  };

  return (
    <Grid item container gap={3} p={2} xs={12} md={12} sx={customGridStyles1}>
      <Typography variant="h6">
        {t("operationCost.tblMachineryCost.txtMachineryCost")}
      </Typography>
      <Button variant="outlined" onClick={handleOpenModal}>
        Add Machinery Cost
      </Button>
      {/* Machinery Cost Data Table */}
      <Grid item xs={12}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography>
                      {t("operationCost.txtMajorOperations")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.txtSubOperations")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblMachineryCost.colMethod")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblMachineryCost.colOwnedOrHired")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblMachineryCost.colNumberOfTimes")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblMachineryCost.colDays")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblMachineryCost.colCost")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {machinerycost?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.majorOp}</TableCell>
                    <TableCell>{data.subOp}</TableCell>
                    <TableCell>{data.method}</TableCell>
                    <TableCell>{data.isOwned}</TableCell>
                    <TableCell>{data.noUsed}</TableCell>
                    <TableCell>{data.days}</TableCell>
                    <TableCell>{data.machineryCost}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(data._id)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TableContainer sx={modalStyle}>
          Add Machinery Cost
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
                {t("operationCost.tblMachineryCost.colMethod")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={machineryMethod.method}
                onChange={(e) => handleChangeMachineryCostDropdown(e, "method")}
              >
                {machinery?.map((select) => (
                  <MenuItem key={select.value} value={select.value}>
                    {select.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                {t("operationCost.tblMachineryCost.colOwnedOrHired")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={machineryMethod.isOwned}
                onChange={(e) =>
                  handleChangeMachineryCostDropdown(e, "isOwned")
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Owned"}>Owned</MenuItem>
                <MenuItem value={"Hired"}>Hired</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>
                {t("operationCost.tblMachineryCost.colNumberOfTimes")}
              </InputLabel>
              <Input
                required
                value={machineryMethod.noUsed}
                onChange={(e) => handleChangeMachineryCost(e, "noUsed")}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>
                {t("operationCost.tblMachineryCost.colDays")}
              </InputLabel>
              <Input
                required
                value={machineryMethod.days}
                onChange={(e) => handleChangeMachineryCost(e, "days")}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>
                {t("operationCost.tblMachineryCost.colCost")}
              </InputLabel>
              <Input
                required
                value={machineryMethod.machineryCost}
                onChange={(e) => handleChangeMachineryCost(e, "machineryCost")}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <Button variant="outlined" onClick={handleAddMachineCost}>
                {t("operationCost.tblMachineryCost.capBtnAdd")}
              </Button>
            </FormControl>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography sx={{ display: { sm: "none" } }}>
                    {t("operationCost.tblMachineryCost.colMethod")}
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
                      {t("operationCost.tblMachineryCost.colMethod")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={machineryMethod.method}
                      onChange={(e) =>
                        handleChangeMachineryCostDropdown(e, "method")
                      }
                    >
                      {machinery?.map((select) => (
                        <MenuItem key={select.value} value={select.value}>
                          {select.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography sx={{ display: { sm: "none" } }}>
                    {t("operationCost.tblMachineryCost.colOwnedOrHired")}
                  </Typography>
                  <FormControl
                    variant="filled"
                    fullWidth
                    sx={{
                      minWidth: 140,
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      {t("operationCost.tblMachineryCost.colOwnedOrHired")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={machineryMethod.isOwned}
                      onChange={(e) =>
                        handleChangeMachineryCostDropdown(e, "isOwned")
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Owned"}>Owned</MenuItem>
                      <MenuItem value={"Hired"}>Hired</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography sx={{ display: { sm: "none" } }}>
                    {t("operationCost.tblMachineryCost.colNumberOfTimes")}
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
                      {t("operationCost.tblMachineryCost.colNumberOfTimes")}
                    </InputLabel>
                    <Input
                      required
                      value={machineryMethod.noUsed}
                      onChange={(e) => handleChangeMachineryCost(e, "noUsed")}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography sx={{ display: { sm: "none" } }}>
                    {t("operationCost.tblMachineryCost.colDays")}
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
                      {t("operationCost.tblMachineryCost.colDays")}
                    </InputLabel>
                    <Input
                      required
                      value={machineryMethod.days}
                      onChange={(e) => handleChangeMachineryCost(e, "days")}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography sx={{ display: { sm: "none" } }}>
                    {t("operationCost.tblMachineryCost.colCost")}
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
                      {t("operationCost.tblMachineryCost.colCost")}
                    </InputLabel>
                    <Input
                      required
                      value={machineryMethod.machineryCost}
                      onChange={(e) =>
                        handleChangeMachineryCost(e, "machineryCost")
                      }
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl
                    variant="standard"
                    fullWidth
                    sx={{
                      minWidth: 120,
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    <Button variant="outlined" onClick={handleAddMachineCost}>
                      {t("operationCost.tblMachineryCost.capBtnAdd")}
                    </Button>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addMachinery?.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.method}</TableCell>
                  <TableCell>{data.isOwned}</TableCell>
                  <TableCell>{data.noUsed}</TableCell>
                  <TableCell>{data.days}</TableCell>
                  <TableCell>{data.machineryCost}</TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteIcon
                        onClick={() => handleDeleteMachineCost(index)}
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