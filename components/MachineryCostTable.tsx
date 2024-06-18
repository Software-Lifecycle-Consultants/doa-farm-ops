import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import TableHead from "@mui/material/TableHead";
import { machinery } from "../data/operationCostData";
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
} from "@mui/material";
import { customGridStyles1 } from "@/styles/customStyles";
import { t } from "i18next";

interface MachineryCost {
  method: string;
  isOwned: string;
  noUsed: string;
  days: string;
  machineryCost: string;
}

interface MachineryCostTableProps {
  mcost: MachineryCost[];
  addMachinery: MachineryCost[];
  setaddMachinery: React.Dispatch<React.SetStateAction<MachineryCost[]>>;
}

export default function MachineryCostTable({
  mcost,
  addMachinery,
  setaddMachinery,
}: MachineryCostTableProps) {
  const [machineryMethod, setMachineryMethod] = React.useState<MachineryCost>({
    method: "",
    isOwned: "",
    noUsed: "",
    days: "",
    machineryCost: "",
  });

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
        {t("operationCost.tblMachineryCost.txtMachineryCost")}
      </Typography>
      <Button variant="outlined" onClick={handleOpenModal}>
        Add Machinery Cost
      </Button>
      {/* Machinery machineryCost Data Table */}
      <Grid item xs={12}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
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
                {mcost.map((data, index) => (
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
          </TableContainer>
        </Paper>
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          // sx={modalStyle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <TableContainer sx={modalStyle}>
            Add Machinery Cost
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
                  <MenuItem value={10}>Owned</MenuItem>
                  <MenuItem value={20}>Hired</MenuItem>
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
                  onChange={(e) =>
                    handleChangeMachineryCost(e, "machineryCost")
                  }
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
                        <MenuItem value={10}>Owned</MenuItem>
                        <MenuItem value={20}>Hired</MenuItem>
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
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
              >
                Submit
              </Button>
            </Box>
          </TableContainer>
        </Modal>
      </Grid>
    </Grid>
  );
}