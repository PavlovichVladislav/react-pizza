import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import PizzaService from "../../services/PizzaService";
import { LoadingStatus, PizzaItem, PizzaSliceState, getRequestParams, PizzaPost } from "./types";



const initialState: PizzaSliceState = {
   loadingStatus: LoadingStatus.IDLE,
   addingStatus: LoadingStatus.IDLE,
   addingMessage: '',
   items: [],
};

export const getPizzas = createAsyncThunk<PizzaItem[], getRequestParams> (
   "pizzas/getPizzas",
   async (settings) => {
      const pizzaService = new PizzaService();
      const response: PizzaItem[] = await pizzaService.getPizzas(settings);

      return response;
   }
);

export const postPizza = createAsyncThunk<number, PizzaPost> (
   "pizzas/postPizza",
   async (pizza) => {
      const pizzaService = new PizzaService();
      const status: number = await pizzaService.postPizza(pizza);

      return status;
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
         .addCase(getPizzas.pending, (state) => {
            state.loadingStatus = LoadingStatus.LOADING;
            state.items = [];
         })
         .addCase(getPizzas.fulfilled, (state, action) => {
            state.loadingStatus = LoadingStatus.IDLE;
            state.items = action.payload;
         })
         .addCase(getPizzas.rejected, (state) => {
            state.loadingStatus = LoadingStatus.ERROR;
            state.items = [];
         })
         .addCase(postPizza.pending, (state) => {
            state.addingStatus = LoadingStatus.LOADING;
            state.items = [];
         })
         .addCase(postPizza.fulfilled, (state, action) => {
            state.addingStatus = LoadingStatus.IDLE;
            
            if (action.payload !== 200) {
               state.addingMessage = 'Не удалось добавитть пиццу';
            }
         })
         .addCase(postPizza.rejected, (state) => {
            state.addingStatus = LoadingStatus.ERROR;
            state.items = [];
         })
   },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
