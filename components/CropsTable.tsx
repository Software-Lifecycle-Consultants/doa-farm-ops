"use client";
import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  EditNote as EditNoteIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/types";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import i18n from "@/app/config/i18n";// Import the i18n instance
import { useDispatch } from "react-redux";
import {deleteCrop, deleteCropAsync, fetchCrops, selectCrops} from "@/redux/cropSlice"; // Import the Redux action for updating crops
import theme from '@/Theme';
import { selectUser } from '@/redux/userSlice';
import { AppDispatch } from '@/redux/store';
import { selectLands} from '@/redux/landSlice';


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
  { id: "season", label: "myCrops.tblCrop.colSeason", minWidth: 50 },
  {
    id: "cropName",
    label: "myCrops.tblCrop.colCropName",
    minWidth: 50,
  },
  {
    id: "cropType",
    label: "myCrops.tblCrop.colCropType",
    minWidth: 50,
  },
  {
    id: "totalSoldQty",
    label: "myCrops.tblCrop.colSoldQty",
    minWidth: 50,
  },
  {
    id: "totalIncome",
    label: "myCrops.tblCrop.colTotalIncome",
    minWidth: 50,
  },
  {
    id: "reservedQtyHome",
    label: "myCrops.tblCrop.colReserved",
    minWidth: 50,
  },
  {
    id: "reservedQtySeed",
    label: "myCrops.tblCrop.colQtySeeds",
    minWidth: 50,
  },
  {
    id: "noOfPicks",
    label: "myCrops.tblCrop.colPicks",
    minWidth: 50,
  },
];

// Define the component to display the table
interface TableTitleProps {
  title: string;
}

export default function CropsTable({ title }: TableTitleProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch: AppDispatch = useDispatch()
  const cropsData = useSelector(selectCrops);
  const land = useSelector(selectLands);

  useEffect(() => {
    // Fetch the crop data when the component mounts
    if (user) {
    dispatch(fetchCrops(user._id));
    }
  }, []);

  // State for handling pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Function to handle land name
  const handleLandName = (landId: string) => {
    const landName = land?.find((land) => land._id === landId);
    return landName?.landName;
  }
  const handleDeleteSuccess = async () => {
    await dispatch(fetchCrops(user._id)); // Manual refetch after deletion (optional)
    setOpenSuccessDialog(false);
  }


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
  const handleEditClick = async (cropId: any) => {
    try {
    router.push(`/update-crop/${cropId}`);
    } catch (error) {
      console.error('Error updating crop:', error);
    }
  };

  const [deleteConfirmation, setDeleteConfirmation] = React.useState<{
    open: boolean;
    cropId: any;
  }>({ open: false, cropId: null });

  const openDeleteConfirmation = (cropId: any) => {
    // Open the delete confirmation dialog and set the cropId
    setDeleteConfirmation({ open: true, cropId });
  };

  const closeDeleteConfirmation = () => {
    // Close the delete confirmation dialog
    setDeleteConfirmation({ open: false, cropId: null });
  };
  //  manage the visibility of the success dialog
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  //Function for deleting a land
  const handleDeleteClick = async (cropId: any) => {
    try {
      await dispatch(deleteCropAsync(cropId));
      dispatch(deleteCrop(cropId));
      setOpenSuccessDialog(true); // Open success dialog on success
      closeDeleteConfirmation(); // Close the delete confirmation dialog
    } catch (error) {
      console.error('Error deleting land:', error);
    }
  };;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* Table header */}
          <TableHead>
            <TableRow>
              <TableCell align={"left"} style={{ minWidth: 170 }}>
                {t("myCrops.tblCrop.colLandName")}
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {t(column.label)}
                </TableCell>
              ))}
              <TableCell align={"right"} style={{ minWidth: 170 }}>
                {""}
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 170 }}>
                {""}
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {cropsData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{handleLandName(row.landId)}</TableCell>
                    {columns.map((column) => {
                      const value = row?.[column.id];
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value  || "N/A"}
                          </TableCell>
                        </>
                      );
                    })}
                    <TableCell align={"right"}>
                      <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => handleEditClick(row._id)}>
                          <EditNoteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => openDeleteConfirmation(row._id)}
                        >
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
                          width: "100%",
                        }}
                        onClick={navigationToAddOperationCost}
                      >
                        Add Cost
                      </Button>
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
        count={cropsData?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Confirmation Dialog */}
      <Dialog
          open={deleteConfirmation.open}
          onClose={closeDeleteConfirmation}
          aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title"> {i18n.t("dialogBoxes.txtDeleteConfirmation")}</DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => handleDeleteClick(deleteConfirmation.cropId)} variant="contained" color="primary" >
            {i18n.t("dialogBoxes.capBtnYes")}
          </Button>
          <Button onClick={closeDeleteConfirmation} color="primary"  variant="outlined">
            {i18n.t("dialogBoxes.capBtnCancel")}
          </Button>
        </DialogActions>
      </Dialog>
      {/*Dialog box for delete success message*/}
      <Dialog
          open={openSuccessDialog}
          onClose= {handleDeleteSuccess}
          aria-labelledby="success-dialog-title"
      >
        {/* Display a translated 'Record deleted successfully!' message based on the selected language. */}
        <DialogTitle id="success-dialog-title"> {i18n.t("dialogBoxes.txtDeleteSuccess")}</DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => setOpenSuccessDialog(false)} variant="contained" color="primary">
            {i18n.t("dialogBoxes.capBtnOk")}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
