import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, Land } from './types';
import { fetchUserData } from '@/api/fetchUserData';
import axios from "axios";

// Define the initial state for the land slice
const initialState: { lands: Land[] | null } = {
  lands: null,
};

// Create an asynchronous thunk to fetch and register land details
export const fetchAndRegisterLands = createAsyncThunk(
  'land/fetchAndRegisterLands',
  async (userId: string) => {
    try {
      const userData = await fetchUserData(userId);
      return userData.land || [];
    } catch (error) {
      console.error('Error fetching land details:', error);
      throw error;
    }
  }
);

// Create an asynchronous thunk to Delete land details
export const deleteLandAsync = createAsyncThunk(
    'land/deleteLandAsync',
    async (landId: string) => {
      const url = `http://localhost:5000/api/land/deleteLand/${landId}`;
      try {
        const response = await axios.delete(url);
        // Handle the response
        return landId; // Assuming successful deletion, return the deleted land ID
      } catch (error) {
        console.error('Error deleting land:', error);
        throw error; // Re-throw the error for handling in the reducer
      }
    }
);

// Create an asynchronous thunk to update land details
export const updateLandAsync = createAsyncThunk(
  "land/updateLandAsync",
  async (landData: Land) => {
      const apiEndpoint = `http://localhost:5000/api/land/updateLand/${landData._id}`; // Extract _id specifically

      const response = await fetch(apiEndpoint, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(landData),
      });
      const updatedLandData = await response.json(); // Parse the response
      return updatedLandData; // Return the updated land data
  }
);


// Create the land slice using createSlice function
const landSlice = createSlice({
  name: 'land',
  initialState,
  reducers: {
    // Reducer function to register land details
    registerLands: (state, action: PayloadAction<Land[] | null>) => {
      state.lands = action.payload;
    },
    // Add a new land
    addNewLand: (state, action: PayloadAction<Land>) => {
      if (state.lands) {
        state.lands.push(action.payload);
      }
    },
    // Delete a land
    deleteLand: (state, action: PayloadAction<string>) => {
      if (state.lands) {
        state.lands = state.lands.filter((land) => land._id !== action.payload);
      }
    },
    // Edit a land
    editLand: (state, action: PayloadAction<Land>) => {
      if (state.lands) {
        const updatedLand = action.payload;
        state.lands = state.lands.map((land) => (land._id === updatedLand._id ? updatedLand : land));
      }
    },
  },
  // Define extra reducers for handling asynchronous actions
  extraReducers: (builder) => {
    builder
      // Handle successful fulfillment of fetchAndRegisterLands
      .addCase(fetchAndRegisterLands.fulfilled, (state, action: PayloadAction<Land[]>) => {
        state.lands = action.payload;
      })
      // Handle rejection of fetchAndRegisterLands
      .addCase(fetchAndRegisterLands.rejected, (state, action) => {
        console.error('Error fetching land details:', action.error);
      })
        // Handle successful fulfillment of deleteLandAsync
      .addCase(deleteLandAsync.fulfilled, (state, action: PayloadAction<string>) => {
        const deletedLandId = action.payload;
        if (state.lands) {
          state.lands = state.lands.filter((land) => land._id !== deletedLandId);
        }
      })
        // Handle rejection of deleteLandAsync
        .addCase(deleteLandAsync.rejected, (state, action) => {
          console.error('Error deleting land:', action.error);
        })
        // Handle successful fulfillment of updateLandAsync (assuming optional return)
        .addCase(updateLandAsync.fulfilled, (state, action) => {
          const updatedLandData = action.payload;
          if (state.lands) {
            const landIndex = state.lands.findIndex((land) => land._id === updatedLandData._id);
            if (landIndex !== -1) {
              state.lands[landIndex] = updatedLandData; // Update state with actual server data
            } else {
              state.lands.push(updatedLandData); // Add the new land data to the state
            }
          } else {
            state.lands = [updatedLandData]; // Initialize the lands array with the updated data
          }
      })
      .addCase(updateLandAsync.rejected, (state, action) => {
          console.error("Error updating land:", action.error);
          // Handle errors (e.g., revert UI update, display error message)
      });

  },
});

// Export the reducer and actions from the land slice
export const { registerLands, addNewLand, deleteLand, editLand } = landSlice.actions;

// Selector to retrieve land details from the state
// Refactored the selectLand to accept a more generic state object any), instead of expecting the RootState type
export const selectLands = (state: RootState) => state.land.lands;

// Export the reducer function generated by createSlice
export default landSlice.reducer;
