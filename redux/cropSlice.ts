// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './types';

interface Crop {
  cropDetails: {
    cropName: string;
    season: string;
    cropType: string;
    totalSoldQty: string;
    totalIncome: string;
    reservedQtyHome: string;
    reservedQtySeed: string;
    noOfPicks: string;
    loanObtained: number;
  };
  landId: string;
  _id: string;
}

// Define the initial state of the 'crop' slice.
const initialState: RootState["crop"] = [];

// Create a Redux slice for managing crop data
const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
    addCrop: (state, action) => {
      state.push(action.payload);
    },
    updateCrop: (state, action) => {
      const { _id } = action.payload;
      const index = state.findIndex((crop) => crop._id === _id);
      if (index !== -1) {
        state[index] = { ...action.payload };
      }
    },
    deleteCrop: (state, action) => {
      const _idToDelete = action.payload;
      state = state.filter((crop) => crop._id !== _idToDelete);
    },
  },
});
  
  // Export the action creators for external use.
export const { addCrop, updateCrop, deleteCrop  } = cropSlice.actions;

// Define a selector function to extract the 'crop' state from the Redux store.
export const selectAddCrop = (state: { crop: any; }) => state.crop;
export const selectUpdateCrop = (state: { crop: any; }) => state.crop;
export const selectDeleteCrop = (state: { crop: any; }) => state.crop;

// Export the 'cropSlice.reducer' as the default export.
export default cropSlice.reducer;