// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the 'user' slice.
const initialState = {
    isAuthenticated: false, // Indicates whether a user is logged in or not.
    user: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      nic: null,
      role: null,
      address: null,
      password: null,
    },
  };

const userSlice = createSlice({
  name: 'user', // A unique name for this slice, used in the Redux store.
  initialState,  // The initial state of the 'user' slice.
  reducers: {
    // When a 'register' action is dispatched, update the state.
    register: (state, action) => {
      state.isAuthenticated = false; // Set 'isAuthenticated' to 'false'.
      state.user = action.payload; // Set 'user' to the payload provided in the action.
    }
  },
});

// Export the register action creators for external use.
export const { register } = userSlice.actions;

// Define a selector function to extract the 'user' state from the Redux store.
export const selectAuth = (state: { user: any; }) => state.user;

// Export the 'userSlice.reducer' as the default export.
export default userSlice.reducer;
