// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the 'crop' slice.
const initialState = {
  crop: {
    cropName: null,
    season: null,
    cropType: null,
    totalSoldQty: null,
    totalIncome: null,
    reservedQtyHome: null,
    reservedQtySeed: null,
    noOfPicks: null,
    loanObtained: null,
  },
};

const cropSlice = createSlice({
    name: 'crop', // A unique name for this slice, used in the Redux store.
    initialState,  // The initial state of the 'crop' slice.
    reducers: {
      
      addCrop: (state, action) => { 
        state.crop = action.payload; // Set 'crop' to the payload provided in the action.
      },
    },
  });
  
  // Export the action creators for external use.
export const { addCrop } = cropSlice.actions;

// Define a selector function to extract the 'crop' state from the Redux store.
export const selectAddCrop = (state: { crop: any; }) => state.crop;

// Export the 'cropSlice.reducer' as the default export.
export default cropSlice.reducer;