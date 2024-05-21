import * as React from "react";
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
} from "@mui/material";

import { customGridStyles1 } from "@/styles/customStyles";
import { t } from "i18next";

interface laborCost {
  gender: string;
  freeOrHired: string;
  quantity: string;
  dailyWage: string;
  foodCostPerDay: string;
}

// Define the component to display the table
interface TableTitleProps {
  title: string;
}

export default function LaborCostTable({ title }: TableTitleProps) {
  const [laborMethod, setlaborMethod] = React.useState<laborCost>({
    gender: "",
    freeOrHired: "",
    quantity: "",
    dailyWage: "",
    foodCostPerDay: "",
  });

  const [addlabor, setAddlabor] = React.useState<laborCost[]>([]);

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

  // Event handler for select material cost filter change in material cost table
  const handleAddlaborCost = async () => {
    if (
      !laborMethod.gender ||
      !laborMethod.freeOrHired ||
      !laborMethod.quantity ||
      !laborMethod.dailyWage ||
      !laborMethod.foodCostPerDay
    ) {
      <Alert severity="error">This is an error Alert.</Alert>;
    } else {
      setAddlabor((prevArray) => [...prevArray, laborMethod]);
      setlaborMethod({
        gender: "",
        freeOrHired: "",
        quantity: "",
        dailyWage: "",
        foodCostPerDay: "",
      });
    }
  };

  return (
    <Grid item container gap={3} p={2} xs={12} md={12} sx={customGridStyles1}>
      <Typography variant="h6">
        {t("operationCost.tblLaborCost.txtLaborCost")}
      </Typography>
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
            value={laborMethod.freeOrHired}
            onChange={(e) => handleChangelaborCostDropdown(e, "freeOrHired")}
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
          <InputLabel>{t("operationCost.tblLaborCost.colQuantity")}</InputLabel>
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
                        onChange={(e) => handleChangelaborCostDropdown(e, "gender")}
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
                        value={laborMethod.freeOrHired}
                        onChange={(e) => handleChangelaborCostDropdown(e, "freeOrHired")}
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
                      onChange={(e) => handleChangelaborCost(e, "quantity")}
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
                      onChange={(e) => handleChangelaborCost(e, "dailyWage")}
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
                      onChange={(e) => handleChangelaborCost(e, "foodCostPerDay")}
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
                      <Button variant="outlined" onClick={handleAddlaborCost}>
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
                    <TableCell>{data.freeOrHired}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>{data.dailyWage}</TableCell>
                    <TableCell>{data.foodCostPerDay}</TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
