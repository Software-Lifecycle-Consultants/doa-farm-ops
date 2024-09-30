// viewFarmerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, User, FarmerDetails } from './types';
import { searchFarmerByNIC } from '@/api/searchFarmerByNIC';

interface ViewFarmerState {
  user: User | null;
  farmerDetails: FarmerDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ViewFarmerState = {
  user: null,
  farmerDetails: null,
  isLoading: false,
  error: null,
};

export const searchFarmerByNICThunk = createAsyncThunk(
  'viewFarmer/searchFarmerByNIC',
  async ({ officerId, nic }: { officerId: string; nic: string }, { rejectWithValue }) => {
    try {
      const farmerData = await searchFarmerByNIC(officerId, nic);
      console.log('searchFarmerByNICThunk fulfilled:', farmerData); // Log the payload
      return farmerData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const viewFarmerSlice = createSlice({
  name: 'viewFarmer',
  initialState,
  reducers: {
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
      .addCase(searchFarmerByNICThunk.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.farmerDetails = null;
      });
  },
});

export const { clearViewedFarmer } = viewFarmerSlice.actions;
export const selectViewedFarmerUser = (state: RootState) => state.viewFarmer.user;
export const selectViewedFarmerDetails = (state: RootState) => state.viewFarmer.farmerDetails;
export default viewFarmerSlice.reducer;
