// Import the createSlice function from Redux Toolkit.
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Crop, RootState } from './types';
import { fetchCropData } from '@/api/fetchCropData';
import axios from 'axios';


// Define the initial state of the 'crop' slice.
const initialState: { crops: Crop[] | null } = {
  crops: null,
};

export const fetchCrops = createAsyncThunk(
  'crop/fetchCrops',
  async (userId: string) => {
    // Fetch user data using the provided userId
    const cropData = await fetchCropData(userId);
    // Return the user data fetched from the API
    return cropData.crops;
  }
);
// Thunk for adding crop data (individual endpoint)
export const addCropAsync = createAsyncThunk(
    'crop/addCrop',
    async (cropData: any) => {
        const response = await axios.post(`http://localhost:5000/api/crop/add/`, cropData);
        return response.data;
    }
);

// Thunk for adding land and crop data (combined endpoint)
export const addLandAndCropAsync = createAsyncThunk(
    'crop/addLandAndCrop',
    async (landwithCropData: any) => {
        const response = await axios.post(`http://localhost:5000/api/landAndCrop/add`, landwithCropData);
        return response.data;
    }
);
export const updateCropAsync = createAsyncThunk(
    'crops/updateCrop',
    async (cropData: Crop) => {
        const apiEndpoint = `http://localhost:5000/api/crop/update/${cropData._id}`;

            const response = await fetch(apiEndpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cropData),
            });

            // Check for successful response
            if (!response.ok) {
                throw new Error('Failed to update crop');
            }

            const updatedCropData = await response.json();
            return updatedCropData;
        }
);
// Thunk for deleting a crop
export const deleteCropAsync = createAsyncThunk(
    'crop/deleteCrop',
    async (cropId: string) => {
        try {
        const response = await axios.delete(`http://localhost:5000/api/crop/delete/${cropId}`);
        return response.data; // Assuming the response contains a success message
    } catch (error) {
            return Promise.reject(error);
        } }
);

// Create a Redux slice for managing crop data
const cropSlice = createSlice({
  name: "crops",
  initialState,
  reducers: {
    addCrop: (state, action) => {
      state.crops?.push(action.payload);
    },
    updateCrop: (state, action: PayloadAction<Crop>) => {
          if (state.crops) {
              const cropIndex = state.crops.findIndex(crop => crop._id === action.payload._id);
              if (cropIndex !== -1) {
                  state.crops[cropIndex] = action.payload; // Update existing crop
              } else {
                  state.crops.push(action.payload); // Add new crop
              }
          }
      },
    deleteCrop: (state, action: PayloadAction<string>) => {
        if (state.crops) {
            state.crops = state.crops.filter((crop) => crop._id !== action.payload);
        }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle successful fulfillment of fetchAndRegisterFarmer
      .addCase(fetchCrops.fulfilled, (state, action: PayloadAction<Crop[]>) => {
        state.crops = action.payload;
      })
      // Handle rejection of fetchAndRegisterFarmer
      .addCase(fetchCrops.rejected, (state, action) => {
        console.error("Error fetching crop details:", action.error);
      })
        // Handle successful fulfillment of addCropAsync (individual endpoint)
        .addCase(addCropAsync.fulfilled, (state, action: PayloadAction<any>) => {
            // Update state with newly added crop (optional, consider using immer)
            console.log("Crop data after adding (individual):", action.payload);
            // You can update state here if needed (e.g., prepend to crops array)
        })
        .addCase(addCropAsync.rejected, (state, action) => {
            console.error("Error adding crop data (individual):", action.error);
        })
        // Handle successful fulfillment of addLandAndCropAsync (combined endpoint)
        .addCase(
            addLandAndCropAsync.fulfilled,
            (state, action: PayloadAction<any>) => {
                // Update state with newly added land and crop (optional, consider using immer)
                console.log("Land and Crop data after adding (combined):", action.payload);
                // You can update state here if needed
            }
        )
        .addCase(addLandAndCropAsync.rejected, (state, action) => {
            console.error("Error adding land and crop data (combined):", action.error);
        })
      // Handle successful fulfillment of deleteCropAsync
        .addCase(deleteCropAsync.fulfilled, (state, action: PayloadAction<string>) => {
            const deletedCropId = action.payload;
            if (state.crops) {
                state.crops = state.crops.filter((crop) => crop._id !== deletedCropId);
            }
        })
        .addCase(deleteCropAsync.rejected, (state, action) => {
            console.error("Error deleting crop:", action.error);
        })

        .addCase(updateCropAsync.fulfilled, (state, action: PayloadAction<Crop>) => {
            const updatedCrop = action.payload;
            const cropIndex = state.crops?.findIndex(crop => crop._id === updatedCrop._id);

            if (cropIndex && cropIndex !== -1) {
                state.crops![cropIndex] = updatedCrop; // Update existing crop
            } else {
                state.crops?.push(updatedCrop); // Add new crop (assuming state.crops is not null)
            }
        })
          .addCase(updateCropAsync.rejected, (state, action) => {
              console.error("Error updating crop:", action.error);
              // Handle errors (e.g., revert UI update, display error message)
          });
  },
});
  // Export the action creators for external use.
export const { addCrop, updateCrop, deleteCrop  } = cropSlice.actions;

// Define a selector function to extract the 'crop' state from the Redux store.
export const selectCrops = (state: RootState) => state.crop.crops;
export const selectAddCrop = (state: RootState) => state.crop.crops;

// Export the 'cropSlice.reducer' as the default export.
export default cropSlice.reducer;
