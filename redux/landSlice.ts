// Import the createSlice function from Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./types";
import { addCrop } from "./cropSlice";

interface Land {
  landId: string;
  landName: string;
  district: string;
  dsDivision: string;
  landRent: string;
  irrigationMode: string;
}

interface LandAndCrop extends Land {
  crops: RootState["crop"]; // Updated to include crops in LandAndCrop
}

// Define the initial state of the 'land' slice.
const initialState: RootState["land"] = [];

const landSlice = createSlice({
  name: "land",
  initialState,
  reducers: {
    addLand: (state, action) => {
      state.push(action.payload);
    },
    updateLand: (state, action) => {
      const { landId } = action.payload;
      const index = state.findIndex((land) => land.landId === landId);
      if (index !== -1) {
        state[index] = { ...action.payload };
      }
    },
    deleteLand: (state, action) => {
      const landIdToDelete = action.payload;
      state = state.filter((land) => land.landId !== landIdToDelete);
    },
    addLandWithCrop: (state, action) => {
      const { landData, cropData } = action.payload;
      state.push({ ...landData, crops: [] }); // Initialize crops as an empty array
      const landId = landData.landId;
      const updatedCropData = { ...cropData, landId };
      // addCrop(state, updatedCropData); // Call addCrop directly
    },
  },
});

// Export the action creators for external use.
export const { addLand, updateLand, deleteLand } = landSlice.actions;

// Define a selector function to extract the 'land' state from the Redux store.
export const selectAddLand = (state: { land: any }) => state.land;
// export const selectUpdateLand = (state: { land: any }) => state.land;

// Export the 'landSlice.reducer' as the default export.
export default landSlice.reducer;
