import { fetchCostData } from "@/api/fetchCostData";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MachineryCost, RootState } from "./types";
import { deleteCostData } from "@/api/deleteCostData";
import { addCostData } from "@/api/addCostData";

//Define intial state for costSlice
const initialState: { machinery: MachineryCost[] | null } = {
  machinery: null,
};

export const addMachineryCostAsync = createAsyncThunk(
  "cost/addMachineryCost",
  async (machineryCost: any) => {
    const costData = await addCostData(machineryCost);
    return costData?.data.machineryresponseData;
  }
);

export const fetchMachineryCost = createAsyncThunk(
  "cost/fetchMachineryCost",
  async (cropId: string) => {
    const costData = await fetchCostData(cropId);
    return costData.machineryCost;
  }
);

export const deleteMachineryCost = createAsyncThunk(
  "cost/deleteMachineryCost",
  async (cropId: string) => {
    const costData = await deleteCostData(cropId);
    return costData;
  }
);

//Create machineryCostSlice using createSlice function
const machineryCostSlice = createSlice({
  name: "machinery",
  initialState,
  reducers: {
    //Reducer function to register machinery cost details
    registerMachineryCost: (
      state,
      action: PayloadAction<MachineryCost[] | null>
    ) => {
      state.machinery = action.payload;
    },
  },
  //Define extra reducers for handling asynchronous actions
  extraReducers: (builder) => {
    builder
      //Handle successful fulfillment of addMachineryCostAsync
      .addCase(addMachineryCostAsync.fulfilled, (state, action) => {
        if (state.machinery) {
          if (Array.isArray(action.payload)) {
            state.machinery = [...state.machinery, ...action.payload];
          } else {
            state.machinery.push(action.payload);
          }
        } else {
          state.machinery = Array.isArray(action.payload)? action.payload : [action.payload];
        }
      })
      //Handle rejection of addMachineryCostAsync
      .addCase(addMachineryCostAsync.rejected, (state, action) => {
        console.error("Error adding machinery cost:", action.error);
      });
    builder
      //Handle successful fulfillment of fetchMachineryCost
      .addCase(
        fetchMachineryCost.fulfilled,
        (state, action: PayloadAction<MachineryCost[]>) => {
          state.machinery = action.payload;
        }
      )
      //Handle rejection of fetchMachineryCost
      .addCase(fetchMachineryCost.rejected, (state, action) => {
        console.error("Error fetching machinery cost:", action.error);
      });
    builder
      //Handle successful fulfillment of deleteMachineryCost
      .addCase(deleteMachineryCost.fulfilled, (state, action) => {
        const deletedmachineryCost = action.payload.data;
        if (state.machinery) {
          state.machinery = state.machinery.filter(
            (machineryCost) => machineryCost._id !== deletedmachineryCost
          );
        }
      })
      //Handle rejection of deleteMachineryCost
      .addCase(deleteMachineryCost.rejected, (state, action) => {
        console.error("Error deleting machinery cost:", action.error);
      });
  },
});

//Export the reducer function for the machineryCostSlice
export const { registerMachineryCost } = machineryCostSlice.actions;

//Selector function to return the machinery cost details
export const selectMachineryCost = (state: RootState) =>
  state.machinery.machinery;

//Export the machineryCostSlice reducer
export default machineryCostSlice.reducer;
