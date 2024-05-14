// Import the createSlice function from Redux Toolkit.
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Crop, RootState } from './types';
import { fetchCropData } from '@/api/fetchCropData';
import axios from 'axios';


// Define the initial state of the 'crop' slice.
const initialState: { crops: Crop[] | null } = {
  crops: null,
};

export const fetchCrops = createAsyncThunk(
  'crop/fetchCrops',
  async (userId: string) => {
    // Fetch user data using the provided userId
    const cropData = await fetchCropData(userId);
    // Return the user data fetched from the API
    return cropData.crops;
  }
);

// Create a Redux slice for managing crop data
const cropSlice = createSlice({
  name: "crops",
  initialState,
  reducers: {
    addCrop: (state, action) => {
      state.crops?.push(action.payload);
    },
    updateCrop: (state, action) => {
      const { _id } = action.payload;
      const index = state.crops?.findIndex((crop) => crop._id === _id);
      if (index !== -1) {
        state[index] = { ...action.payload };
      }
    },
    deleteCrop: (state, action) => {
      const _idToDelete = action.payload;
      state.crops =
        state.crops?.filter((crop) => crop._id !== _idToDelete) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle successful fulfillment of fetchAndRegisterFarmer
      .addCase(fetchCrops.fulfilled, (state, action: PayloadAction<Crop[]>) => {
        state.crops = action.payload;
      })
      // Handle rejection of fetchAndRegisterFarmer
      .addCase(fetchCrops.rejected, (state, action) => {
        console.error("Error fetching crop details:", action.error);
      })
  },
});
  // Export the action creators for external use.
export const { addCrop, updateCrop, deleteCrop  } = cropSlice.actions;

// Define a selector function to extract the 'crop' state from the Redux store.
export const selectCrops = (state: RootState) => state.crop.crops;
export const selectAddCrop = (state: RootState) => state.crop.crops;

// Export the 'cropSlice.reducer' as the default export.
export default cropSlice.reducer;
