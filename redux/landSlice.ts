// Import the createSlice function from Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./types";

// Define the initial state of the 'land' slice.
const initialState: RootState["land"] = [];

const landSlice = createSlice({
  name: "land", // A unique name for this slice, used in the Redux store.
  initialState, // The initial state of the 'land' slice.
  reducers: {
    addLand: (state, action) => {
      state.push(action.payload); // Set 'land' to the payload provided in the action.
    },
    updateLand: (state, action) => {
      const { landId } = action.payload;
      const index = state.findIndex((crop) => crop.landId === landId);
      if (index !== -1) {
        state[index] = {
          ...action.payload
        };
      }
    },
  },
});

// Export the action creators for external use.
export const { addLand, updateLand } = landSlice.actions;

// Define a selector function to extract the 'land' state from the Redux store.
export const selectAddLand = (state: { land: any }) => state.land;
// export const selectUpdateLand = (state: { land: any }) => state.land;

// Export the 'landSlice.reducer' as the default export.
export default landSlice.reducer;
