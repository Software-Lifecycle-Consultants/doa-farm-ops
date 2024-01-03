// Import the createSlice function from Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the 'officer' slice.
const initialState = {
  isAuthenticated: false, // Indicates whether a officer is logged in or not.
  officer: {
    orgName: null,
    orgAddress: null,
    university: null,
  },
};

const officerSlice = createSlice({
  name: "officer", // A unique name for this slice, used in the Redux store.
  initialState, // The initial state of the 'officer' slice.
  reducers: {
    // When a 'register' action is dispatched, update the state.
    register: (state, action) => {
      console.log("Register Action Payload:", action.payload);
      state.isAuthenticated = false; // Set 'isAuthenticated' to 'false'.
      // state.officer = action.payload; // Set 'officer' to the payload provided in the action.
      state.officer = { ...state.officer, ...action.payload }; // Merges existing officer data with fields from action.payload.
    },
  },
});

// Export the register action creators for external use.
export const { register } = officerSlice.actions;

// Define a selector function to extract the 'officer' state from the Redux store.
export const selectUser = (state: { officer: any }) => state.officer;

// Export the 'officerSlice.reducer' as the default export.
export default officerSlice.reducer;
