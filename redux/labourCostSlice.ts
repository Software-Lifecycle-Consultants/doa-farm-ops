import { fetchCostData } from "@/api/fetchCostData"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LabourCost, RootState } from "./types";
import { deleteCostData } from "@/api/deleteCostData";
import { addCostData } from "@/api/addCostData";

// Define initial state for labourCostSlice
const initialState: { labour: LabourCost[] | null } = {
    labour: null
}

export const addLabourCostAsync = createAsyncThunk(
    'cost/addLabourCost',
    async (labourCost: any) => {
        const costData = await addCostData(labourCost)
        return costData?.data.labourresponseData;
    }
);

export const fetchLabourCost = createAsyncThunk(
    'cost/fetchLabourCost',
    async (cropId: string) => {
        const costData = await fetchCostData(cropId)
        return costData.labourCost;
    }
);

export const deleteLabourCost = createAsyncThunk(
    'cost/deleteLabourCost',
    async (cropId: string) => {
        const costData = await deleteCostData(cropId)
        return costData;
    }
);

// Create labourCostSlice using createSlice function
const labourCostSlice = createSlice({
    name: 'labour',
    initialState,
    reducers: {
        // Reducer function to register labour cost details
        registerLabourCost: (state, action: PayloadAction<LabourCost[] | null>) => {
            state.labour = action.payload;
        },
    },
    // Define extra reducers for handling asynchronous actions
    extraReducers: (builder) => {
        builder
          // Handle successful fulfillment of addLabourCostAsync
          .addCase(addLabourCostAsync.fulfilled, (state, action) => {
          if(state.labour){
            if(Array.isArray(action.payload)){
              state.labour = [...state.labour, ...action.payload];
            } else {
              state.labour.push(action.payload);
            }
          } else{
            state.labour = Array.isArray(action.payload) ? action.payload : [action.payload];
          }
          })
          // Handle rejection of addLabourCostAsync
          .addCase(addLabourCostAsync.rejected, (state, action) => {
            console.error("Error adding labour cost:", action.error);
          });
        builder
            // Handle successful fulfillment of fetchLabourCost
            .addCase(fetchLabourCost.fulfilled, (state, action: PayloadAction<LabourCost[] | null>) => {
                state.labour = action.payload;
            })
            // Handle rejection of fetchLabourCost
            .addCase(fetchLabourCost.rejected, (state, action) => {
                console.error('Error fetching labour cost:', action.error);
            });
        builder
            // Handle successful fulfillment of deleteLabourCost
            .addCase(deleteLabourCost.fulfilled, (state, action) => {
                const deletedLabourCostId = action.payload.data;
                if (state.labour) {
                    state.labour = state.labour.filter((labourCost) => labourCost._id !== deletedLabourCostId);
                }
            })
            // Handle rejection of deleteLabourCost
            .addCase(deleteLabourCost.rejected, (state, action) => {
                console.error('Error deleting labour cost:', action.error);
            });
    },
});

export const { registerLabourCost } = labourCostSlice.actions;

// Selector function to return the labour cost details
export const selectLabourCost = (state: RootState) => state.labour.labour;

// Export the labourCostSlice reducer
export default labourCostSlice.reducer;