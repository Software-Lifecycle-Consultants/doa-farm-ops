// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the 'farmer' slice.
const initialState = {
    farmer: {
      houseHold: null,
      orgName: null,
      orgAddress: null,
    },
  };

const farmerSlice = createSlice({
  name: 'farmer', // A unique name for this slice, used in the Redux store.
  initialState,  // The initial state of the 'farmer' slice.
  reducers: {
    // When 'addFarmer' action is dispatched, update the state.
    addFarmer: (state, action) => {
      state.farmer = action.payload; // Set 'farmer' to the payload provided in the action.
    }
  },
});

// Export the addFarmer action creators for external use.
export const { addFarmer } = farmerSlice.actions;

// Define a selector function to extract the 'farmer' state from the Redux store.
export const selectAddFarmer = (state: { farmer: any; }) => state.farmer;

// Export the 'farmerSlice.reducer' as the default export.
export default farmerSlice.reducer;