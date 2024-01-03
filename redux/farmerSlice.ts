// Import the createSlice function from Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the 'farmer' slice.
const initialState = {
  isAuthenticated: false, // Indicates whether a farmer is logged in or not.
  farmer: {
    househoHld: null,
    orgName: null,
    orgAddress: null,
  },
};

const farmerSlice = createSlice({
  name: "farmer", // A unique name for this slice, used in the Redux store.
  initialState, // The initial state of the 'farmer' slice.
  reducers: {
    // When a 'register' action is dispatched, update the state.
    register: (state, action) => {
      console.log("Register Action Payload:", action.payload);
      state.isAuthenticated = false; // Set 'isAuthenticated' to 'false'.
      // state.farmer = action.payload; // Set 'farmer' to the payload provided in the action.
      state.farmer = { ...state.farmer, ...action.payload }; // Merges existing farmer data with fields from action.payload.
    },
  },
});

// Export the register action creators for external use.
export const { register } = farmerSlice.actions;

// Define a selector function to extract the 'farmer' state from the Redux store.
export const selectUser = (state: { farmer: any }) => state.farmer;

// Export the 'farmerSlice.reducer' as the default export.
export default farmerSlice.reducer;
