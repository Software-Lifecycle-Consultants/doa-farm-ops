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
import { RootState} from "@/redux/types";
import { deleteLandAsync, fetchAndRegisterLands, selectLands} from "@/redux/landSlice";
import { AppDispatch } from '@/redux/store'; 
import { selectAuth } from "@/redux/authSlice";
import { useTranslation } from 'react-i18next';
import theme from "@/Theme";
import i18n from "i18next";
import { Land } from "@/redux/types";


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
  format?: (value: string) => string;
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
  userId: string; // Add a userId prop
}

/**
 * Land table is used in profile page. It holds farmers' lands details.
 */

export default function LandsTable({ title, userId }: TableTitleProps) {
  const router = useRouter();
 
  const dispatch: AppDispatch = useDispatch();



  console.log('User Id from Land table:', userId);
  React.useEffect(() => {
    if (userId) {
      console.log('Fetching lands for userId:', userId);
      dispatch(fetchAndRegisterLands(userId)) // Fetch land data for the provided user ID
        .then(() => console.log('Lands fetched successfully'))
        .catch((error) => console.error('Error fetching lands:', error));
    }
  }, [userId, dispatch]);

    // Fetch land data when the component mounts
  const landDetails = useSelector((state: RootState) => {
    console.log('landDetails in useSelector:', state.land.lands);
    return state.land.lands;
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //Function to handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  //Function to handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //Function to navigate to add crop page
  const navigationToAddCrop = () => {
    router.push("/add-crop");
  };


  const handleEditClick = async (landId: any) => {
    try {
      router.push(`/update-land/${landId}`);
    } catch (error) {
      console.error("Error updating land:", error);
    }
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
  //  manage the visibility of the success dialog
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  //Function for deleting a land
  const handleDeleteClick = async (landId: any) => {
    try {
      const response = await dispatch(deleteLandAsync(landId));
      if (response.type === "land/deleteLandAsync/fulfilled") {
      setOpenSuccessDialog(true); // Open success dialog on success
      closeDeleteConfirmation(); // Close the delete confirmation dialog
      }
    } catch (error) {
      console.error('Error deleting land:', error);
    }
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
            {landDetails?.map((row:Land) => (
              <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                {columns.map((column) => (
                  <TableCell key={`${row._id}-${column.id}`} align={column.align}>
          {/* Apply column format if defined, otherwise return the column value or an empty string if undefined */}
                    {column.format
            ? column.format(row[column.id] || '')
            : row[column.id] || ''} 
                  </TableCell>
                ))}
                <TableCell align={"right"}>
                  <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => handleEditClick(row._id)}>
                      <EditNoteIcon />
                    </IconButton>
                    <IconButton onClick={() => openDeleteConfirmation(row._id)}>
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
                    {t("farmerProfile.tblLand.capBtnAddCrop")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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
      >
        <DialogTitle id="delete-dialog-title">
          {i18n.t("dialogBoxes.txtDeleteConfirmation")}
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => handleDeleteClick(deleteConfirmation.landId)}
            variant="contained"
            color="primary"
          >
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
        onClose={() => setOpenSuccessDialog(false)}
        aria-labelledby="success-dialog-title"
      >
        <DialogTitle id="success-dialog-title">
          {i18n.t("dialogBoxes.txtDeleteSuccess")}
        </DialogTitle>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => setOpenSuccessDialog(false)}
            variant="contained"
            color="primary"
          >
            {i18n.t("dialogBoxes.capBtnOk")}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
