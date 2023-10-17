// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the 'crop' slice.
const initialState = [
  {
  landId: null,
  cropDetails: {
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
}
];

const cropSlice = createSlice({
    name: 'crop', // A unique name for this slice, used in the Redux store.
    initialState,  // The initial state of the 'crop' slice.
    reducers: {
      
      addCrop: (state, action) => {
        state.push(action.payload);
      },
      updateCrop: (state, action) => {
        const { landId, cropDetails } = action.payload;
        const index = state.findIndex((crop) => crop.landId === landId);
        if (index !== -1) {
          state[index] = {
            landId,
            cropDetails: { ...state[index].cropDetails, ...cropDetails },
          };
        }
      },
      deleteCrop: (state, action) => {
        const landIdToDelete = action.payload;
        const indexToDelete = state.findIndex((crop) => crop.landId === landIdToDelete);
        if (indexToDelete !== -1) {
          state.splice(indexToDelete, 1); // Remove the crop from the array.
        }
      },
    },
  });
  
  // Export the action creators for external use.
export const { addCrop, updateCrop } = cropSlice.actions;

// Define a selector function to extract the 'crop' state from the Redux store.
export const selectAddCrop = (state: { crop: any; }) => state.crop;
export const selectUpdateCrop = (state: { crop: any; }) => state.crop;

// Export the 'cropSlice.reducer' as the default export.
export default cropSlice.reducer;