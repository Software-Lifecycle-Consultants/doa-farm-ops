import { fetchCostData } from "@/api/fetchCostData";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MaterialCost, RootState } from "./types";
import { deleteCostData } from "@/api/deleteCostData";
import { addCostData } from "@/api/addCostData";

// Define initial state for costSlice
const initialState: { material: MaterialCost[] | null } = {
  material: null,
};

export const addMaterialCostAsync = createAsyncThunk(
  "cost/addMaterialCost",
  async (costDetails: any) => {
    const costData = await addCostData(costDetails);
    return costData?.data.materialresponseData;
  }
);

export const fetchMaterialCost = createAsyncThunk(
  "cost/fetchMaterialCost",
  async (cropId: string) => {
    const costData = await fetchCostData(cropId);
    return costData.materialCost;
  }
);

export const deleteMaterialCost = createAsyncThunk(
  "cost/deleteMaterialCost",
  async (cropId: string) => {
    const costData = await deleteCostData(cropId);
    return costData;
  }
);

// Create materialCostSlice using createSlice function
const materialCostSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    // Reducer function to register material cost details
    registerMaterialCost: (
      state,
      action: PayloadAction<MaterialCost[] | null>
    ) => {
      state.material = action.payload;
    },
  },
  // Define extra reducers for handling asynchronous actions
  extraReducers: (builder) => {
    builder
      // Handle successful fulfillment of addMaterialCostAsync
      .addCase(addMaterialCostAsync.fulfilled, (state, action) => {
        if (state.material) {
          if (Array.isArray(action.payload)) {
            state.material = [...state.material, ...action.payload];
          } else {
            state.material.push(action.payload);
          }
        } else {
          state.material = Array.isArray(action.payload)? action.payload : [action.payload];
        }
      })
      // Handle rejection of addMaterialCostAsync
      .addCase(addMaterialCostAsync.rejected, (state, action) => {
        console.error("Error adding material cost:", action.error);
      });
    builder
      // Handle successful fulfillment of fetchMaterialCost
      .addCase(
        fetchMaterialCost.fulfilled,
        (state, action: PayloadAction<MaterialCost[] | null>) => {
          state.material = action.payload;
        }
      )
      // Handle rejection of fetchMaterialCost
      .addCase(fetchMaterialCost.rejected, (state, action) => {
        console.error("Error fetching material cost:", action.error);
      });
    builder
      // Handle successful fulfillment of deleteMaterialCost
      .addCase(deleteMaterialCost.fulfilled, (state, action) => {
        const deletedMaterialCost = action.payload.data;
        if (state.material) {
          state.material = state.material.filter(
            (materialCost) => materialCost._id !== deletedMaterialCost
          );
        }
      })
      // Handle rejection of deleteMaterialCost
      .addCase(deleteMaterialCost.rejected, (state, action) => {
        console.error("Error deleting material cost:", action.error);
      });
  },
});

// Export the reducer function for the materialCostSlice
export const { registerMaterialCost } = materialCostSlice.actions;

// Selector function to return the material cost details
export const selectMaterialCost = (state: RootState) => state.material.material;

// Export the materialCostSlice reducer
export default materialCostSlice.reducer;
