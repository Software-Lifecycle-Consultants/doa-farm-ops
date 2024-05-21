// Import the createSlice function from Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./types";

// Define the initial state of the land slice.
const initialState = {
  landToBeAdded: {
    landId: "",
    landName: "",
    district: "",
    dsDivision: "",
    landRent: "",
    irrigationMode: "",
  },
  isLandToBeAdded: false
};

const landAndCropSlice = createSlice({
  name: "landAndCrop", // A unique name for this slice, used in the Redux store.
  initialState, // The initial state of the 'crop' slice.
  reducers: {
    // Reducer to add a new crop to the state
    addLandAndCrop: (state, action) => {
      state.landToBeAdded = action.payload;
      state.isLandToBeAdded = true;
    },
    addLandAndCropSuccess: (state) => {
      state.landToBeAdded = {
        landId: "",
        landName: "",
        district: "",
        dsDivision: "",
        landRent: "",
        irrigationMode: "",
      };
      state.isLandToBeAdded = false;
    },
  },
});

// Export the action creators for external use.
export const { addLandAndCrop, addLandAndCropSuccess } = landAndCropSlice.actions;

// Define a selector function to extract the 'landAndCrop' state from the Redux store.
export const selectAddLandAndCrop = (state: { landAndCrop: any }) => state.landAndCrop;

// Export the 'landAndCropSlice.reducer' as the default export.
export default landAndCropSlice.reducer;