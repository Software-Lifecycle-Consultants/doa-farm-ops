"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button, Typography, TextField, Container, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { searchFarmerByNICThunk, selectViewedFarmerDetails, selectViewedFarmerUser } from '@/redux/ViewFarmerSlice';
import { AppDispatch } from '@/redux/store';
import { switchProfile } from '@/redux/authSlice';
import { RootState } from '@/redux/types';

const FarmerSearch = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const officerId = useSelector((state: RootState) => state.auth.auth._id);
  const farmerDetails = useSelector(selectViewedFarmerDetails);
  const farmerUser = useSelector(selectViewedFarmerUser);
  const [nic, setNic] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<'farmerFound' | 'farmerNotFound'>('farmerNotFound');

  const handleNicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNic(event.target.value);
    setErrorMessage('');
  };

  const handleSearchClick = async () => {
    try {
      const actionResult = await dispatch(searchFarmerByNICThunk({ officerId, nic }));
      if (searchFarmerByNICThunk.fulfilled.match(actionResult)) {
        if (actionResult.payload) {
          setDialogContent('farmerFound');
        } else {
          setDialogContent('farmerNotFound');
        }
        setOpenDialog(true);
        setErrorMessage('');
      } else {
        setDialogContent('farmerNotFound');
        setOpenDialog(true);
      }
    } catch (error) {
      setErrorMessage(t('Error fetching farmer'));
    }
  };

  const handleSwitchProfile = () => {
    if (farmerDetails && farmerUser) {
      dispatch(switchProfile('farmer'));
      router.push('/farmer-profile');
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container component="main">
      <Grid container direction="column" spacing={2} style={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            {t('Search Farmers')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label={t('Enter NIC')}
            value={nic}
            onChange={handleNicChange}
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleSearchClick} variant="contained" color="primary">
            {t('Search')}
          </Button>
        </Grid>
      </Grid>

      {/* Dialog for Farmer Found */}
      <Dialog
        open={openDialog && dialogContent === 'farmerFound'}
        onClose={handleCloseDialog}
        aria-labelledby="farmer-found-dialog-title"
      >
        <DialogTitle id="farmer-found-dialog-title">{t('Farmer Found')}</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body1">
            {t('Do you want Switch profile.?')}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleSwitchProfile} variant="contained" color="primary">
            {t('Switch Profile')}
          </Button>
          <Button onClick={handleCloseDialog} variant="outlined" color="primary">
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Farmer Not Found */}
      <Dialog
        open={openDialog && dialogContent === 'farmerNotFound'}
        onClose={handleCloseDialog}
        aria-labelledby="farmer-not-found-dialog-title"
      >
        <DialogTitle id="farmer-not-found-dialog-title">{t('Farmer Not Found')}</DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            {t('OK')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FarmerSearch;
