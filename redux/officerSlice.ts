// Import the createSlice function from Redux Toolkit.
import { fetchUserData } from "@/api/fetchUserData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OfficerDetails } from "./types";

// // Define the initial state of the 'officer' slice.
// const initialState = {
//   officer: {
//     orgName: null,
//     orgAddress: null,
//     university: null,
//   },
// };

// Define the initial state for the farmer slice
const initialState: { officerDetails: OfficerDetails | null } = {
  officerDetails: null,
};

// Create an asynchronous thunk to fetch and register farmer details
export const fetchAndRegisterOfficer = createAsyncThunk(
  'officer/fetchAndRegisterOfficer',
  async (userId: string) => {
    const userData = await fetchUserData(userId);
    return userData.officerDetails;
  }
);

// Create the officer slice using createSlice function
const officerSlice = createSlice({
  name: "officer", // A unique name for this slice, used in the Redux store.
  initialState, // The initial state of the 'officer' slice.
  reducers: {
    // When a 'register' action is dispatched, update the state.
    OfficerRegister: (state, action) => {
      console.log("Register Action Payload:", action.payload);
      // state.officer = action.payload; // Set 'officer' to the payload provided in the action.
      state.officerDetails = { ...state.officerDetails, ...action.payload }; // Merges existing officer data with fields from action.payload.
    },
  },
});

// Export the OfficerRegister action creators for external use.
export const { OfficerRegister } = officerSlice.actions;

// Define a selector function to extract the 'officer' state from the Redux store.
export const selectOfficer = (state: { officer: any }) => state.officer;

// Export the 'officerSlice.reducer' as the default export.
export default officerSlice.reducer;
