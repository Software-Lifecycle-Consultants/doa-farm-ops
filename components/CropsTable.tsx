"use client";
import * as React from "react";
import {
  IconButton,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import {
  EditNote as EditNoteIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { rows } from "../data/cropsData";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/types";

// Define the table columns
interface Column {
  id:
    | "cropName"
    | "season"
    | "cropType"
    | "totalSoldQty"
    | "totalIncome"
    | "reservedQtyHome"
    | "reservedQtySeed"
    | "noOfPicks";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

// Define the columns for the table
const columns: readonly Column[] = [
  { id: "season", label: "Season", minWidth: 50 },
  {
    id: "cropName",
    label: "Crop Name",
    minWidth: 50,
  },
  {
    id: "cropType",
    label: "Crop Type",
    minWidth: 50,
  },
  {
    id: "totalSoldQty",
    label: "Sold Quantity",
    minWidth: 50,
  },
  {
    id: "totalIncome",
    label: "Total Income",
    minWidth: 50,
  },
  {
    id: "reservedQtyHome",
    label: "Reserved",
    minWidth: 50,
  },
  {
    id: "reservedQtySeed",
    label: "Qty Seeds",
    minWidth: 50,
  },
  {
    id: "noOfPicks",
    label: "Picks",
    minWidth: 50,
  },
];

// Define the component to display the table
interface TableTitleProps {
  title: string;
}

export default function CropsTable({ title }: TableTitleProps) {
  const router = useRouter();
  const cropDetails = useSelector((state:RootState) => state.crop);

  // State for handling pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // Function to handle changing the page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  // Function to handle changing the number of rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Function to navigate to add operation cost page
  const navigationToAddOperationCost = () => {
    router.push("/add-operation-cost");
  };

  // Function to handle navigation when the Edit icon is clicked
const handleEditClick = () => {
  router.push("/update-crop");
};

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* Table header */}
          <TableHead>
            <TableRow>
            <TableCell
                  align={"left"}
                  style={{ minWidth:170 }}
                >
                  {"Land Name"}
                </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                  align={"right"}
                  style={{ minWidth:170 }}
                >
                  {""}
                </TableCell>
                <TableCell
                  align={"right"}
                  style={{ minWidth:170 }}
                >
                  {""}
                </TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {cropDetails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell
                >
                  {row.landId}
                </TableCell>
                    {columns.map((column) => {
                      const value = row.cropDetails[column.id];
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                        </>
                      );
                    })}
                    <TableCell align={"right"}>
                              <Stack direction="row" spacing={1}>
                                <IconButton onClick={handleEditClick}>
                                  <EditNoteIcon />
                                </IconButton>
                                <IconButton>
                                  <DeleteIcon />
                                </IconButton>
                              </Stack>
                            </TableCell>
                      
                    <TableCell align={"right"}>
                              <Button style={{ backgroundColor: '#C2C2C2', color: 'black', borderRadius: '16px' ,width: '100%'}} onClick={navigationToAddOperationCost}>Add Cost</Button>
                            </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Table pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={cropDetails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
