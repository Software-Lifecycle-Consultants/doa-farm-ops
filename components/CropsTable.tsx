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

// Define the table columns
interface Column {
  id:
    | "landname"
    | "season"
    | "cropName"
    | "cropType"
    | "soldQty"
    | "totalIncome"
    | "reservedQty"
    | "qtyForSeed"
    | "noOfPicks"
    | "icons"
    | "button";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
// Define the columns for the table
const columns: readonly Column[] = [
  { id: "landname", label: "Land Name", minWidth: 170 },
  { id: "season", label: "Season", minWidth: 50 },
  {
    id: "cropName",
    label: "CropName",
    minWidth: 50,
  },
  {
    id: "cropType",
    label: "Type",
    minWidth: 50,
  },
  {
    id: "soldQty",
    label: "Sold",
    minWidth: 50,
  },
  {
    id: "totalIncome",
    label: "Income",
    minWidth: 50,
  },
  {
    id: "reservedQty",
    label: "Reserved",
    minWidth: 50,
  },
  {
    id: "qtyForSeed",
    label: "Qty Seeds",
    minWidth: 50,
  },
  {
    id: "noOfPicks",
    label: "Picks",
    minWidth: 50,
  },
  {
    id: "icons",
    label: "",
    minWidth: 50,
  },
  {
    id: "button",
    label: "",
    minWidth: 50,
  },
];

// Define the component to display the table
interface TableTitleProps {
  title: string;
}

export default function CropsTable({ title }: TableTitleProps) {
  const router = useRouter();
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* Table header */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === "button" ? (
                            <TableCell key={column.id} align={column.align}>
                              <Button style={{ backgroundColor: '#C2C2C2', color: 'black', borderRadius: '16px' ,width: '100%'}} onClick={navigationToAddOperationCost}>Add Cost</Button>
                            </TableCell>
                          ) : column.id === "icons" ? (
                            <TableCell key={column.id} align={column.align}>
                              <Stack direction="row" spacing={1}>
                                <IconButton>
                                  <EditNoteIcon />
                                </IconButton>
                                <IconButton>
                                  <DeleteIcon />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          ) : (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )}
                        </>
                      );
                    })}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
