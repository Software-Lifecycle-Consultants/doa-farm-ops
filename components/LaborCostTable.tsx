import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { customGridStyles1 } from "@/styles/customStyles";
import { t } from "i18next";
import i18n from '@/app/config/i18n';
import { majorOps, subOps } from '@/data/operationCostData';
import { Box } from '@mui/system';
import { addCostData } from '@/api/addCostData';

interface laborCost {
  gender: string;
  isHired: string;
  quantity: string;
  dailyWage: string;
  foodCostPerDay: string;
}

interface LaborCostTable {
  majorOp: string;
  subOp: string
  gender: string;
  isHired: string;
  quantity: string;
  dailyWage: string;
  foodCostPerDay: string;
}

interface LaborCostTableProps {
  cropId: string;
  lcost: LaborCostTable[];
  addlabor: laborCost[];
  setAddlabor: React.Dispatch<React.SetStateAction<laborCost[]>>;
}

export default function LaborCostTable({cropId, lcost, addlabor, setAddlabor}: LaborCostTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [majorOperations, setMajorOperations] = React.useState("");
  const [subOperations, setSubOperations] = React.useState("");
  const [majorOperationsSelected, setMajorOperationsSelected] = useState(false);
  const [subOperationsSelected, setSubOperationsSelected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [laborMethod, setlaborMethod] = React.useState<laborCost>({
    gender: "",
    isHired: "",
    quantity: "",
    dailyWage: "",
    foodCostPerDay: "",
  });
  // Event handler for select labor cost method filter change in labor cost table
  const handleChangelaborCost = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setlaborMethod({
      ...laborMethod,
      [field]: event.target.value,
    });
  };

  const handleChangelaborCostDropdown = (
    event: SelectChangeEvent,
    field: string
  ) => {
    setlaborMethod({
      ...laborMethod,
      [field]: event.target.value,
    });
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    handleCloseModal();
    setAddlabor([]);
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

  // Event handler for select material cost filter change in material cost table
  const handleAddlaborCost = async () => {
    if (
      !laborMethod.gender ||
      !laborMethod.isHired ||
      !laborMethod.quantity ||
      !laborMethod.dailyWage ||
      !laborMethod.foodCostPerDay
    ) {
      <Alert severity="error">This is an error Alert.</Alert>;
    } else {
      setAddlabor((prevArray) => [...prevArray, laborMethod]);
      setlaborMethod({
        gender: "",
        isHired: "",
        quantity: "",
        dailyWage: "",
        foodCostPerDay: "",
      });
    }
  };

   // Event handler for delete machineryCost row in machineryCost table
   const handleDeleteLabourCost = (index: number) => {
    const newLabourCost = addlabor.filter((_, i) => i !== index);
    setAddlabor(newLabourCost);
  };

  const handleAddCost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      //Add the operational cost to the database
      if (
        !majorOperationsSelected ||
        !subOperationsSelected ||
        addlabor.length === 0
      ) {
        setShowWarning(true);
      } else {
        setShowWarning(false);

        const costdetails = {
          cropId: cropId,
          majorOp: majorOperations,
          subOp: subOperations,
          machineryCostDetails: [],
          labourCostDetails: addlabor,
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
      console.error("Error adding Labour cost", error);
    }
  };

  return (
    <Grid item container gap={3} p={2} xs={12} md={12} sx={customGridStyles1}>
      <Typography variant="h6">
        {t("operationCost.tblLaborCost.txtLaborCost")}
      </Typography>
      <Button variant="outlined" onClick={handleOpenModal}>
        Add Labour Cost
      </Button>
      {/* Labour Cost Data Table */}
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
                      {t("operationCost.tblLaborCost.colGender")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblLaborCost.colFreeOrHired")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblLaborCost.colQuantity")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblLaborCost.colDailyWage")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t("operationCost.tblLaborCost.colFoodCostPerDay")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lcost.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.majorOp}</TableCell>
                    <TableCell>{data.subOp}</TableCell>
                    <TableCell>{data.gender}</TableCell>
                    <TableCell>{data.isHired}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>{data.dailyWage}</TableCell>
                    <TableCell>{data.foodCostPerDay}</TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon
                          onClick={() => handleDeleteLabourCost(index)}
                        />
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
          Add Labour Cost
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
                {t("operationCost.tblLaborCost.colGender")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={laborMethod.gender}
                onChange={(e) => handleChangelaborCostDropdown(e, "gender")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                {t("operationCost.tblLaborCost.colFreeOrHired")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={laborMethod.isHired}
                onChange={(e) => handleChangelaborCostDropdown(e, "isHired")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"free"}>Free</MenuItem>
                <MenuItem value={"hired"}>Hired</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>
                {t("operationCost.tblLaborCost.colQuantity")}
              </InputLabel>
              <Input
                required
                value={laborMethod.quantity}
                onChange={(e) => handleChangelaborCost(e, "colQuantity")}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>
                {t("operationCost.tblLaborCost.colDailyWage")}
              </InputLabel>
              <Input
                required
                value={laborMethod.dailyWage}
                onChange={(e) => handleChangelaborCost(e, "dailyWage")}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>
                {t("operationCost.tblLaborCost.colFoodCostPerDay")}
              </InputLabel>
              <Input
                required
                value={laborMethod.foodCostPerDay}
                onChange={(e) => handleChangelaborCost(e, "foodCostPerDay")}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <Button variant="outlined" onClick={handleAddlaborCost}>
                {t("operationCost.tblLaborCost.capBtnAdd")}
              </Button>
            </FormControl>
          </Grid>
          {/* Labor Cost Data Table */}
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t("operationCost.tblLaborCost.colGender")}
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
                            {t("operationCost.tblLaborCost.colGender")}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={laborMethod.gender}
                            onChange={(e) =>
                              handleChangelaborCostDropdown(e, "gender")
                            }
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t("operationCost.tblLaborCost.colFreeOrHired")}
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
                            {t("operationCost.tblLaborCost.colFreeOrHired")}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={laborMethod.isHired}
                            onChange={(e) =>
                              handleChangelaborCostDropdown(e, "isHired")
                            }
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"free"}>Free</MenuItem>
                            <MenuItem value={"hired"}>Hired</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t("operationCost.tblLaborCost.colQuantity")}
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
                            {t("operationCost.tblLaborCost.colQuantity")}
                          </InputLabel>
                          <Input
                            required
                            value={laborMethod.quantity}
                            onChange={(e) =>
                              handleChangelaborCost(e, "quantity")
                            }
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t("operationCost.tblLaborCost.colDailyWage")}
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
                            {t("operationCost.tblLaborCost.colDailyWage")}
                          </InputLabel>
                          <Input
                            required
                            value={laborMethod.dailyWage}
                            onChange={(e) =>
                              handleChangelaborCost(e, "dailyWage")
                            }
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t("operationCost.tblLaborCost.colFoodCostPerDay")}
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
                            {t("operationCost.tblLaborCost.colFoodCostPerDay")}
                          </InputLabel>
                          <Input
                            required
                            value={laborMethod.foodCostPerDay}
                            onChange={(e) =>
                              handleChangelaborCost(e, "foodCostPerDay")
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
                          <Button
                            variant="outlined"
                            onClick={handleAddlaborCost}
                          >
                            {t("operationCost.tblLaborCost.capBtnAdd")}
                          </Button>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addlabor.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.gender}</TableCell>
                        <TableCell>{data.isHired}</TableCell>
                        <TableCell>{data.quantity}</TableCell>
                        <TableCell>{data.dailyWage}</TableCell>
                        <TableCell>{data.foodCostPerDay}</TableCell>
                        <TableCell>
                          <IconButton>
                            <DeleteIcon
                              onClick={() => handleDeleteLabourCost(index)}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
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
    </Grid>
  );
}
