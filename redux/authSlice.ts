// Import the createSlice function from Redux Toolkit.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types'; // Import the 'Auth' type from the 'types.ts' file.

// Define the initial state of the 'login' slice.
const initialState = {
  isAuthenticated: false,
  auth: {
    _id: "",
    email: "",
    userName: "",   
    role: "",
    token: "",
  }, // Represents the authenticated user (null if not logged in).
  profile: 'officer', // Default profile role
};

// Create a 'slice' of the Redux store for managing authentication state.
const authSlice = createSlice({
  name: 'auth', // A unique name for this slice, used in the Redux store.
  initialState,  // The initial state of the 'login' slice.
  reducers: {
    // When a 'login' action is dispatched, update the state.
    login: (state, action: PayloadAction<typeof initialState.auth>) => {
      state.isAuthenticated = true; // Set 'isAuthenticated' to 'true'.
      state.auth = action.payload; // Set 'auth' to the payload provided in the action.
    },
    // When a 'register' action is dispatched, update the state.
    register: (state, action: PayloadAction<typeof initialState.auth>) => {
      state.isAuthenticated = true; // Set 'isAuthenticated' to 'true'.
      state.auth = action.payload; // Set 'auth' to the payload provided in the action.
    },
    // When a 'logout' action is dispatched, update the state.
    logout: (state) => {
      state.isAuthenticated = false;// Set 'isAuthenticated' to 'false'.
      state.auth = {_id:"", email:"", userName:"", role:"", token:""}; // Set 'auth' to an empty object with the same structure.
      state.profile = 'officer'; // Reset profile to 'officer'
    },
    // When a 'switchProfile' action is dispatched, update the profile.
    switchProfile: (state, action: PayloadAction<string>) => {
      state.profile = action.payload; // Update the profile with the provided value.
    },
  },
});

// Export the 'login', 'register', 'logout', and 'switchProfile' action creators for external use.
export const { login, register, logout, switchProfile } = authSlice.actions;

// Define a selector function to extract the 'auth' state from the Redux store.
export const selectAuth = (state: RootState) => state.auth;

// Export the 'authSlice.reducer' as the default export.
export default authSlice.reducer;
