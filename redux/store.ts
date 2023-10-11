// Import the configureStore function from Redux Toolkit.
import { configureStore } from '@reduxjs/toolkit';

// Import the 'authReducer' from the 'authSlice' file.
import authReducer from './authSlice';

// Create the Redux store for managing application state.
const store = configureStore({
  reducer: {
    auth: authReducer, // Assign the 'authReducer' to the 'auth' key in the Redux store.
    // Add other reducers here if needed
  },
});

// Export the 'store' as the default export.
export default store;
