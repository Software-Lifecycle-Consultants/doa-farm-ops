// Import the createSlice function from Redux Toolkit.
import { fetchUserData } from "@/api/fetchUserData";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OfficerDetails, RootState } from "./types";
import {  UpdateOfficerData } from "@/api/updateOfficerData";

// Define the initial state for the officer slice
const initialState: { officerDetails: OfficerDetails | null } = {
  officerDetails: null,
};

// Create an asynchronous thunk to fetch and register farmer details
export const fetchAndRegisterOfficer = createAsyncThunk(
  'officer/fetchAndRegisterOfficer',
  async (userId: string) => {
    const userData = await fetchUserData(userId);
    return userData.officerDetails;
  }
);

export const updateAndFetchOfficer = createAsyncThunk(
  'officer/updateAndFetchOfficer',
  async (officerData: any) => {
    const officer = await UpdateOfficerData(officerData);
    return officer;
  }
);

// Create the officer slice using createSlice function
const officerSlice = createSlice({
  name: "officer", // A unique name for this slice, used in the Redux store.
  initialState, // The initial state of the 'officer' slice.
  reducers: {
    // When a 'register' action is dispatched, update the state.
    OfficerRegister: (state, action) => {
      // state.officer = action.payload; // Set 'officer' to the payload provided in the action.
      state.officerDetails = { ...state.officerDetails, ...action.payload }; // Merges existing officer data with fields from action.payload.
    },
  },
    // Define extra reducers for handling asynchronous actions
    extraReducers: (builder) => {
      builder
        // Handle successful fulfillment of fetchAndRegisterFarmer
        .addCase(fetchAndRegisterOfficer.fulfilled, (state, action: PayloadAction<OfficerDetails>) => {
          state.officerDetails = action.payload;
        })
        // Handle rejection of fetchAndRegisterFarmer
        .addCase(fetchAndRegisterOfficer.rejected, (state, action) => {
          console.error('Error fetching farmer details:', action.error);
        });

      builder
        // Handle successful fulfillment of updateandfetchfarmer
        .addCase(updateAndFetchOfficer.fulfilled, (state, action) => {
          state.officerDetails = action.payload.officer;
        })
        // Handle rejection of updateandfetchfarmer
        .addCase(updateAndFetchOfficer.rejected, (state, action) => {
          console.error('Error updating farmer details:', action.error);
        });
    },
});

// Export the OfficerRegister action creators for external use.
export const { OfficerRegister} = officerSlice.actions;

// Define a selector function to extract the 'officer' state from the Redux store.
export const selectOfficer = (state: RootState) => state.officer.officerDetails;

// Export the 'officerSlice.reducer' as the default export.
export default officerSlice.reducer;
