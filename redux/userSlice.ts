// Import the createSlice function from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './types';

// Define the initial state of the 'user' slice.
const initialState =  {
    user: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      nic: null,
      role: null,
      address: null,
      password: null
    },
  };

const userSlice = createSlice({
  name: 'user', // A unique name for this slice, used in the Redux store.
  initialState,  // The initial state of the 'user' slice.
  reducers: {
    // When a 'register' action is dispatched, update the state.
    register: (state, action) => {
      console.log('Register Action Payload:', action.payload);
      // state.user = action.payload; // Set 'user' to the payload provided in the action.
      state.user = { ...state.user, ...action.payload }; // Merges existing user data with fields from action.payload.
    }
  },
});

// Export the register action creators for external use.
export const { register } = userSlice.actions;

// Define a selector function to extract the 'user' state from the Redux store.
export const selectUser = (state:RootState) => state.user;

// Export the 'userSlice.reducer' as the default export.
export default userSlice.reducer;
