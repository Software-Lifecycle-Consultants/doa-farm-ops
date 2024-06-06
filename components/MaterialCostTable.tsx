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
import { material, materialCostData } from "@/data/operationCostData";

interface materialCost {
  material: string;
  quantity: string;
  costForTheMaterial: string;
}

// Define the component to display the table
interface TableTitleProps {
  title: string;
}

export default function MaterialCostTable({ title }: TableTitleProps) {

  const [materialCost, setMaterialCost] = React.useState<materialCost>({
    material: "",
    quantity: "",
    costForTheMaterial: "",
  });

  const [addMaterialCost, setAddMaterialCost] = React.useState<materialCost[]>([]);

  // Event handler for select material cost method filter change in material cost table
  const handleChangeMaterialCost = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setMaterialCost({
      ...materialCost,
      [field]: event.target.value,
    });
  };

  const handleChangeMaterialCostDropdown = (
    event: SelectChangeEvent,
    field: string
  ) => {
    setMaterialCost({
      ...materialCost,
      [field]: event.target.value,
    });
  };

  // Event handler for select material cost filter change in material cost table
  const handleAddMaterialCost = async () => {
    if (
      !materialCost.material ||
      !materialCost.quantity ||
      !materialCost.costForTheMaterial
    ) {
      <Alert severity="error">This is an error Alert.</Alert>;
    } else {
      setAddMaterialCost((prevArray) => [...prevArray, materialCost]);
      setMaterialCost({
        material: "",
        quantity: "",
        costForTheMaterial: "",
      });
    }
  };

  return (
    <Grid
          item
          container
          gap={3}
          p={2}
          xs={12}
          md={12}
          sx={customGridStyles1}
        >
          <Typography variant="h6">
            {t("operationCost.tblMaterialCost.txtMaterialCost")}
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
                {t("operationCost.tblMaterialCost.colMaterial")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={materialCost.material}
                onChange={(e) => handleChangeMaterialCostDropdown(e, "material")}
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
              value={materialCost.quantity}
              onChange={(e) => handleChangeMaterialCost(e, "quantity")}
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
              value={materialCost.costForTheMaterial}
              onChange={(e) => handleChangeMaterialCost(e, "costForTheMaterial")}
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
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
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
                            value={materialCost.material}
                            onChange={(e) =>handleChangeMaterialCostDropdown(e, "material")}
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
                          value={materialCost.quantity}
                          onChange={(e) => handleChangeMaterialCost(e, "quantity")}
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t(
                            "operationCost.tblMaterialCost.colCostForTheMaterial"
                          )}
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
                            {t(
                              "operationCost.tblMaterialCost.colCostForTheMaterial"
                            )}
                          </InputLabel>
                          <Input 
                          required
                          value={materialCost.costForTheMaterial}
                          onChange={(e) => handleChangeMaterialCost(e, "costForTheMaterial")}
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
                        <TableCell>{data.quantity}</TableCell>
                        <TableCell>{data.costForTheMaterial}</TableCell>
                        <TableCell></TableCell>
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
