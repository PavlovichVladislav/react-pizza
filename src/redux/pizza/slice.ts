import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import PizzaService from "../../services/PizzaService";
import { LoadingStatus, PizzaItem, PizzaSliceState, RequestParams } from "./types";



const initialState: PizzaSliceState = {
   loadingStatus: LoadingStatus.IDLE,
   items: [],
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], RequestParams> (
   "pizzas/fetchPizzas",
   async (settings) => {
      const pizzaService = new PizzaService();
      const response: PizzaItem[] = await pizzaService.getPizzas(settings);

      return response;
   }
);

export const pizzasSlice = createSlice({
   name: "pizzas",
   initialState,
   reducers: {
      setItems: (state, action: PayloadAction<PizzaItem[]>) => {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.loadingStatus = LoadingStatus.LOADING;
            state.items = [];
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.loadingStatus = LoadingStatus.IDLE;
            state.items = action.payload;
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.loadingStatus = LoadingStatus.ERROR;
            state.items = [];
         });
   },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
