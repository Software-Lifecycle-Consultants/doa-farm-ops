/**
 * Represents the Redux slice responsible for managing farmer-related state and actions.
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, FarmerDetails } from './types';
import { fetchUserData } from '@/api/fetchUserData';

// Define the initial state for the farmer slice
const initialState: { farmerDetails: FarmerDetails | null } = {
  farmerDetails: null,
};

// Create an asynchronous thunk to fetch and register farmer details
export const fetchAndRegisterFarmer = createAsyncThunk(
  'farmer/fetchAndRegisterFarmer',
  async (userId: string) => {
    const userData = await fetchUserData(userId);
    return userData.farmerDetails;
  }
);

// Create the farmer slice using createSlice function
const farmerSlice = createSlice({
  name: 'farmer',
  initialState,
  reducers: {
    // Reducer function to register farmer details
    registerFarmer: (state, action: PayloadAction<FarmerDetails | null>) => {
      state.farmerDetails = action.payload;
    },
  },
  // Define extra reducers for handling asynchronous actions
  extraReducers: (builder) => {
    builder
      // Handle successful fulfillment of fetchAndRegisterFarmer
      .addCase(fetchAndRegisterFarmer.fulfilled, (state, action: PayloadAction<FarmerDetails>) => {
        state.farmerDetails = action.payload;
      })
      // Handle rejection of fetchAndRegisterFarmer
      .addCase(fetchAndRegisterFarmer.rejected, (state, action) => {
        console.error('Error fetching farmer details:', action.error);
      });
  },
});

// Export the reducer and actions from the farmer slice
export const { registerFarmer } = farmerSlice.actions;

// Selectors to retrieve farmer details from the state
export const selectFarmerDetails = (state: RootState) => state.farmer.farmerDetails;

// Export the reducer function generated by createSlice
export default farmerSlice.reducer;