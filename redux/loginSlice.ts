// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the 'login' slice.
const initialState = {
  user: {
    username: null,
    password: null, // Change 'username' to the actual field representing the username
  }, // Represents the authenticated user (null if not logged in).
};

// Create a 'slice' of the Redux store for managing authentication state.
const loginSlice = createSlice({
  name: 'login', // A unique name for this slice, used in the Redux store.
  initialState,  // The initial state of the 'login' slice.
  reducers: {
    // When a 'login' action is dispatched, update the state.
    login: (state, action) => {
      state.user = action.payload; // Set 'user' to the payload provided in the action.
    },
    setUsername: (state, action) => {
      state.user.username = action.payload;
    },
    setPassword: (state, action) => {
      state.user.password = action.payload;
    },
  },
});

// Export the 'login' and 'logout' action creators for external use.
export const { login, setUsername, setPassword } = loginSlice.actions;

// Define a selector function to extract the 'login' state from the Redux store.
export const selectAuth = (state: { login: any; }) => state.login;

// Export the 'loginSlice.reducer' as the default export.
export default loginSlice.reducer;
