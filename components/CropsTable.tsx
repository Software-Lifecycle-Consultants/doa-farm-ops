import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { IconButton, Stack } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

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

const columns: readonly Column[] = [
  { id: "landname", label: "Land Name", minWidth: 170 },
  { id: "season", label: "Season", minWidth: 170 },
  {
    id: "cropName",
    label: "CropName",
    minWidth: 170,
  },
  {
    id: "cropType",
    label: "Crop Type",
    minWidth: 170,
  },
  {
    id: "soldQty",
    label: "Sold Quantity",
    minWidth: 170,
  },
  {
    id: "totalIncome",
    label: "Total Income",
    minWidth: 170,
  },
  {
    id: "reservedQty",
    label: "Reserved Quantity",
    minWidth: 170,
  },
  {
    id: "qtyForSeed",
    label: "Quantity for Seed",
    minWidth: 170,
  },
  {
    id: "noOfPicks",
    label: "No of Picks",
    minWidth: 170,
  },
  {
    id: "icons",
    label: "",
    minWidth: 170,
  },
  {
    id: "button",
    label: "",
    minWidth: 170,
  },
];

interface Data {
  landname: string;
  season: string;
  cropName: string;
  cropType: string;
  soldQty: number;
  totalIncome: number;
  reservedQty: number;
  qtyForSeed: number;
  noOfPicks: number;
  icons: string;
  button: string;
}

function createData(
  landname: string,
  season: string,
  cropName: string,
  cropType: string,
  soldQty: number,
  totalIncome: number,
  reservedQty: number,
  qtyForSeed: number,
  noOfPicks: number,
  icons: string,
  button: string,
): Data {
  return { landname, season, cropName, cropType, soldQty, totalIncome, reservedQty, qtyForSeed, noOfPicks, icons, button};
}

const rows = [
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", 1, 1, 1, 1, 1, "", ""),
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", 1, 1, 1, 1, 1, "", ""),
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", 1, 1, 1, 1, 1, "", ""),
];

interface TableTitleProps {
  title: string;
}

export default function CropsTable({ title }: TableTitleProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
                              <Button>Add Operation Cost</Button>
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
