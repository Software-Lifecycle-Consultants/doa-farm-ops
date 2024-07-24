"use client";
import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, User, FarmerDetails } from "@/redux/types";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Container
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { btnBackgroundColor } from "@/styles/customStyles";
import { login, switchProfile } from '@/redux/authSlice';
import { registerFarmer } from '@/redux/farmerSlice';
import { register as registerUser } from '@/redux/userSlice';
import store, { AppDispatch } from "@/redux/store";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
// Define the structure of the search result
interface SearchResult {
  nic: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  household: string;
  orgName: string;
  orgAddress: string;
}

export default function FarmerSearch() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const officerId = useSelector((state: RootState) => state.auth.auth._id);
  const [nic, setNic] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNic(event.target.value);
    setErrorMessage("");
    setSearchResult(null);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get<SearchResult[]>(`http://localhost:5000/api/officer/${officerId}/farmers?nic=${nic}`);

      if (response.status === 200 && response.data.length > 0) {
        setSearchResult(response.data[0]);
        setErrorMessage("");
        console.log("Farmer found:", response.data[0]);
      } else {
        setSearchResult(null);
        setErrorMessage("Farmer not found");
        console.log("No farmer found with NIC:", nic);
      }
    } catch (error) {
      console.error("Error fetching farmer:", error);
      setSearchResult(null);
      setErrorMessage("Farmer not found");
    }
  };

  const handleSwitchProfile = () => {
    if (searchResult) {
      // Update Redux store with available farmer data
      dispatch(switchProfile({ role: 'farmer' }));
      dispatch(registerUser({
        _id: searchResult.nic,
        firstName: searchResult.firstName,
        lastName: searchResult.lastName,
        email: searchResult.email,
        phoneNumber: searchResult.phoneNumber,
        nic: searchResult.nic,
        role: "farmer",
        address: searchResult.address
      }));
      dispatch(registerFarmer({
        household: searchResult.household,
        orgName: searchResult.orgName,
        orgAddress: searchResult.orgAddress
      }));

      // Redirect to farmer profile
      router.push('/farmer-profile');
    }
  };

  return (
    <Container component="main">
      <Grid container direction="column" rowGap={2} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            {t("Search Farmers")}
          </Typography>
        </Grid>

        <Grid item xs={12} style={{ width: "100%" }}>
          <TextField
            fullWidth
            variant="outlined"
            label={t("Enter NIC")}
            value={nic}
            onChange={handleNicChange}
          />
        </Grid>

        <Grid item xs={12} style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleSearchClick} variant="contained" color="primary">
            {("Search")}
              </Button>
        </Grid>

        <Grid item xs={12} style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
          {searchResult && (
            <>
              <Typography variant="body1" color="success.main">
                Farmer found.
              </Typography>
              <Button onClick={handleSwitchProfile} variant="contained" color="primary">
             {("Switch Profile")}
              </Button>
            </>
          )}
          {errorMessage && (
            <Typography variant="body1" color="error.main">
              {errorMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}