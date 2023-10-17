// Import the createSlice function from Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the 'land' slice.
const initialState = {
  land: {
    landName: null,
    district: null,
    dsDivision: null,
    landRent: null,
    irrigationMode: null,
  },
};

const landSlice = createSlice({
  name: "land", // A unique name for this slice, used in the Redux store.
  initialState, // The initial state of the 'land' slice.
  reducers: {
    addLand: (state, action) => {
      state.land = action.payload; // Set 'land' to the payload provided in the action.
    },
  },
});

// Export the action creators for external use.
export const { addLand } = landSlice.actions;

// Define a selector function to extract the 'land' state from the Redux store.
export const selectAddLand = (state: { land: any }) => state.land;

// Export the 'landSlice.reducer' as the default export.
export default landSlice.reducer;
