import * as React from "react";
import {
  IconButton,
  Stack,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  EditNote as EditNoteIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { rows } from "../data/landsData";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/types";

// Define columns for the table
interface Column {
  id:
  | "landName"
  | "district"
  | "dsDivision"
  | "landRent"
  | "irrigationMode";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "landName", label: "Land Name", minWidth: 170 },
  { id: "district", label: "District", minWidth: 170 },
  {
    id: "dsDivision",
    label: "DS Division",
    minWidth: 170,
  },
  {
    id: "landRent",
    label: "Land Rent",
    minWidth: 170,
  },
  {
    id: "irrigationMode",
    label: "Mode of Irrigation",
    minWidth: 170,
  },
];

interface TableTitleProps {
  title: string;
}

/**
 * Land table is used in profile page. It holds farmers' lands details.
 */

export default function LandsTable({ title }: TableTitleProps) {
  
  const router = useRouter();
  const landDetails = useSelector((state: RootState) => state.land);
  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //Function to handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  //Function to handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //Function to navigate to add crop page
  const navigationToAddCrop = () => {
    router.push("/add-crop");
  };
const handleEditClick = (id: any) => {
  // router.push(`/update-crop/${id}`);
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
            {landDetails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
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
                      <Stack direction="row" spacing={2}>
                        <IconButton>
                          <EditNoteIcon
                          onClick={() => handleEditClick(row.landId)}
                          />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align={"right"}>
                      <Button
                        style={{
                          backgroundColor: "#C2C2C2",
                          color: "black",
                          borderRadius: "16px",
                          width: "80%",
                        }}
                        onClick={navigationToAddCrop}
                      >
                        Add Crop
                      </Button>
                    </TableCell>
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
