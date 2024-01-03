// Import the configureStore function from Redux Toolkit.
import { configureStore } from '@reduxjs/toolkit';

// Import the 'authReducer' from the 'authSlice' file.
import authReducer from './authSlice';
import cropReducer from './cropSlice';
import landReducer from "./landSlice";
import landAndCropReducer from "./landAndCropSlice";
import userReducer from "./userSlice";
import farmerSlice from './farmerSlice';
import officerSlice from './officerSlice';

// Create the Redux store for managing application state.
const store = configureStore({
  reducer: {
    auth: authReducer, // Assign the 'authReducer' to the 'auth' key in the Redux store.
    crop: cropReducer, // Assign the 'cropReducer' to the 'crop' key in the Redux store.
    land: landReducer, // Assign the 'landReducer' to the 'land' key in the Redux store.
    landAndCrop: landAndCropReducer,
    user: userReducer,
    farmer: farmerSlice,
    officer: officerSlice
  },
});

// Export the 'store' as the default export.
export default store;