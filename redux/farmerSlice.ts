import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, FarmerDetails } from './types';

const initialState: { farmerDetails: FarmerDetails | null } = {
  farmerDetails: null,
};

const farmerSlice = createSlice({
  name: 'farmer',
  initialState,
  reducers: {
    registerFarmer: (state, action: PayloadAction<FarmerDetails | null>) => {
      state.farmerDetails = action.payload;
    },
  },
});

export const { registerFarmer } = farmerSlice.actions;
// export const selectFarmerDetails = (state: RootState) => state.farmer.farmerDetails;

// Define a selector function to extract the 'officer' state from the Redux store.
export const selectFarmerDetails = (state: { farmer: any }) => state.farmer;

export default farmerSlice.reducer;

