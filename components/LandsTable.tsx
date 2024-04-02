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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  EditNote as EditNoteIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { rows } from "../data/landsData";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/types";
import { deleteLand } from "@/redux/landSlice";

import { useTranslation } from 'react-i18next';
import theme from "@/Theme";

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
  { id: "landName", label: "farmerProfile.tblLand.colLandName", minWidth: 170 },
  { id: "district", label: "farmerProfile.tblLand.colDistrict", minWidth: 170 },
  {
    id: "dsDivision",
    label: "farmerProfile.tblLand.colDsDivision",
    minWidth: 170,
  },
  {
    id: "landRent",
    label: "farmerProfile.tblLand.colLandRent",
    minWidth: 170,
  },
  {
    id: "irrigationMode",
    label: "farmerProfile.tblLand.colIrrigationMode",
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
  // 3. TODO - check if this is working.
  console.log("Land details from land table", landDetails);
  const dispatch = useDispatch();

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
    router.push(`/update-land/${id}`);
  };

  const { t } = useTranslation();

  const [deleteConfirmation, setDeleteConfirmation] = React.useState<{
    open: boolean;
    landId: any;
  }>({ open: false, landId: null });

  const openDeleteConfirmation = (landId: any) => {
    // Open the delete confirmation dialog and set the landId
    setDeleteConfirmation({ open: true, landId });
  };

  const closeDeleteConfirmation = () => {
    // Close the delete confirmation dialog
    setDeleteConfirmation({ open: false, landId: null });
  };

  //Function for deleting a land
  const handleDeleteClick = (landId: any) => {
    // Dispatch the deleteLand action with the landId to delete
    dispatch(deleteLand(landId));
    closeDeleteConfirmation(); // Close the delete confirmation dialog
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
                  {t(column.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {landDetails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    key={row.landId}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
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
                        <IconButton onClick={() => handleEditClick(row.landId)}>
                          <EditNoteIcon />
                        </IconButton>
                        <IconButton onClick={() => openDeleteConfirmation(row.landId)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align={"right"}>
                      <Button
                        style={{
                          backgroundColor: theme.palette.secondary.main,
                          color: "black",
                          borderRadius: "16px",
                          width: "80%",
                        }}
                        onClick={navigationToAddCrop}
                      >
                        {t('farmerProfile.tblLand.capBtnAddCrop')}
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
      <Dialog
        open={deleteConfirmation.open}
        onClose={closeDeleteConfirmation}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Land</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this land?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteClick(deleteConfirmation.landId)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
