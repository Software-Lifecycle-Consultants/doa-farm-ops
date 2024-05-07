// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './types'; // Import the 'Auth' type from the 'types.ts' file.

// Define the initial state of the 'login' slice.
const initialState = {
  isAuthenticated: false,
  auth: {
    _id: null,
    email: null,
    userName: null,
    role: null,
    token: null,
  }, // Represents the authenticated user (null if not logged in).
};

// Create a 'slice' of the Redux store for managing authentication state.
const authSlice = createSlice({
  name: 'auth', // A unique name for this slice, used in the Redux store.
  initialState,  // The initial state of the 'login' slice.
  reducers: {
    // When a 'login' action is dispatched, update the state.
    login: (state, action) => {
      state.isAuthenticated = true; // Set 'isAuthenticated' to 'true'.
      state.auth = action.payload; // Set 'auth' to the payload provided in the action.
    },
    // When a 'register' action is dispatched, update the state.
    register: (state, action) => {
      state.isAuthenticated = true; // Set 'isAuthenticated' to 'true'.
      state.auth = action.payload; // Set 'auth' to the payload provided in the action.
    },
    // When a 'logout' action is dispatched, update the state.
    logout: (state) => {
      state.isAuthenticated = false;// Set 'isAuthenticated' to 'false'.
      state.auth = {_id:null, email:null, userName:null, role:null, token:null}; // Set 'auth' to an empty object with the same structure.
    }
  },
});

// Export the 'login' and 'logout' action creators for external use.
export const { login, register, logout } = authSlice.actions;

// Define a selector function to extract the 'login' state from the Redux store.
export const selectAuth = (state: RootState) => state.auth;

// Export the 'authSlice.reducer' as the default export.
export default authSlice.reducer;
