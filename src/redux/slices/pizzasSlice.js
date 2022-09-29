import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PizzaService from "../../services/PizzaService";

const initialState = {
   loadingStatus: "idle",
   items: [],
};

export const fetchPizzas = createAsyncThunk(
   "pizzas/fetchPizzas",
   async (settings, thunkApi) => {
      const pizzaService = new PizzaService();
      const response = await pizzaService.getPizzas(settings);

      return response;
   }
);

export const pizzasSlice = createSlice({
   name: "pizzas",
   initialState,
   reducers: {
      setItems: (state, action) => {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.loadingStatus = "loading";
            state.items = [];
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.loadingStatus = "idle";
            state.items = action.payload;
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.loadingStatus = "error";
            state.items = [];
         });
   },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
