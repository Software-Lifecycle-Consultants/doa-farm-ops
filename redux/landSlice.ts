// Import necessary dependencies and types
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, Land } from './types';
import { fetchUserData } from '@/api/fetchUserData';

// Define the initial state of the 'land' slice.
const initialState: Land[] = []; 

// Create an async thunk to fetch and register land details
export const fetchAndRegisterLands = createAsyncThunk(
  'land/fetchAndRegisterLands',
  async (userId: string) => {
    const userData = await fetchUserData(userId);
    console.log("From land Slice userData.land"+ JSON.stringify(userData.land));
    return userData.land;
  }
);

// Create the land slice
const landSlice = createSlice({
  name: 'land',
  initialState,
  reducers: {
    // Define reducer functions
    addLand: (state, action: PayloadAction<Land>) => {
      state.push(action.payload);
    },
    updateLand: (state, action: PayloadAction<Land>) => {
      const { _id } = action.payload;
      const index = state.findIndex((land) => land._id === _id);
      if (index !== -1) {
        state[index] = { ...action.payload };
      }
    },
    deleteLand: (state, action: PayloadAction<string>) => {
      const landIdToDelete = action.payload;
      state = state.filter((land) => land._id !== landIdToDelete);
    },
    addLandWithCrop: (state, action: PayloadAction<{ landData: Land; cropData: RootState["crops"] }>) => {
      const { landData, cropData } = action.payload;
      state.push({ ...landData, crops: [] });
      const landId = landData._id;
      const updatedCropData = { ...cropData, landId };
      // addCrop(state, updatedCropData); // Call addCrop directly
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndRegisterLands.fulfilled, (state, action: PayloadAction<Land[]>) => {
        state.push(...action.payload);
      })
      .addCase(fetchAndRegisterLands.rejected, (state, action) => {
        console.error('Error fetching land details:', action.error);
      });
  },
});

// Export the action creators for external use.
export const { addLand, updateLand, deleteLand } = landSlice.actions;

// Define a selector function to extract the 'land' state from the Redux store.
export const selectLands = (state: RootState) => state.lands;

// Export the 'landSlice.reducer' as the default export.
export default landSlice.reducer;
