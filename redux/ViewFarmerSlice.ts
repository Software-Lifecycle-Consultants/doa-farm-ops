import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, User, FarmerDetails } from './types';
// Replace the following with your API
import { searchFarmerByNIC } from '@/api/searchFarmerByNIC'; 


// Define the structure for the ViewFarmer state
interface ViewFarmerState {
  user: User | null;
  farmerDetails: FarmerDetails | null;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: ViewFarmerState = {
  user: null,
  farmerDetails: null,
  isLoading: false,
  error: null,
};

// Create an async thunk to search and fetch farmer data by NIC
export const searchFarmerByNICThunk = createAsyncThunk(
  'viewFarmer/searchFarmerByNIC',
  async (nic: string, { rejectWithValue }) => {
    try {
      const farmerData = await searchFarmerByNIC(nic);
      return farmerData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the ViewFarmerSlice
const viewFarmerSlice = createSlice({
  name: 'viewFarmer',
  initialState,
  reducers: {
    // Clear the viewed farmer data
    clearViewedFarmer: (state) => {
      state.user = null;
      state.farmerDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFarmerByNICThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchFarmerByNICThunk.fulfilled, (state, action: PayloadAction<{ user: User; farmerDetails: FarmerDetails }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.farmerDetails = action.payload.farmerDetails;
      })
      .addCase(searchFarmerByNICThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.farmerDetails = null;
      });
  },
});

// Export actions
export const { clearViewedFarmer } = viewFarmerSlice.actions;

// Export selectors
export const selectViewedFarmerUser = (state: RootState) => state.viewFarmer.user;
export const selectViewedFarmerDetails = (state: RootState) => state.viewFarmer.farmerDetails;

// Export reducer
export default viewFarmerSlice.reducer;