// Import the configureStore function from Redux Toolkit.
// import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

// Import the 'authReducer' from the 'loginSlice' file.
import cropReducer from './cropSlice';
import landReducer from "./landSlice";
import userReducer from "./userSlice";
import farmerSlice from './farmerSlice';
import officerSlice from './officerSlice';
import authSlice from './authSlice';
import machineryReducer from './machineryCostSlice';
import labourReducer from './labourCostSlice';
import materialReducer from './materialCostSlice';

// Create the Redux store for managing application state.
const store = configureStore({
  reducer: {
    auth: authSlice,
    crop: cropReducer, // Assign the 'cropReducer' to the 'crop' key in the Redux store.
    land: landReducer, // Assign the 'landReducer' to the 'land' key in the Redux store.
    user: userReducer,
    farmer: farmerSlice,
    officer: officerSlice,
    machinery: machineryReducer,
    labour: labourReducer,
    material: materialReducer,
  },
});

// Defines a type alias for the dispatch function obtained from the Redux store
export type AppDispatch = typeof store.dispatch;

// Export the 'store' as the default export.
export default store;