// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './types';

// Define the initial state of the 'crop' slice.
const initialState: RootState["crop"] = [];
// Create a Redux slice for managing crop data
const cropSlice = createSlice({
    name: 'crop', // A unique name for this slice, used in the Redux store.
    initialState,  // The initial state of the 'crop' slice.
    reducers: {
      // Reducer to add a new crop to the state
      addCrop: (state, action) => {
        const maxId = state.reduce((max, crop) => Math.max(max, Number(crop._id)), 0);
        const newId = (maxId + 1).toString();
        const newCrop = { ...action.payload, _id: newId };
      state.push(newCrop);
      },
      // Reducer to update an existing crop in the state
      updateCrop: (state, action) => {
        const { landId,_id, cropDetails } = action.payload;
        const index = state.findIndex((crop) => crop._id === _id);
        if (index !== -1) {
          state[index] = {
            landId,
            _id,
            cropDetails: { ...state[index].cropDetails, ...cropDetails },
          };
        }
      },
      // Reducer to delete a crop from the state
      deleteCrop: (state, action) => {
        const { landId, _id } = action.payload;
        const index = state.findIndex((crop) => crop._id === _id && crop.landId === landId);
  
        if (index !== -1) {
          state.splice(index, 1); // Remove the crop from the state
        }
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