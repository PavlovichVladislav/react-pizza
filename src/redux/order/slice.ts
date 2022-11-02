import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { OrderInterface, ResponseItem } from "../../@types/Order";

import OrderService from "../../services/OrderService";
import { OrderSliceState } from "./types";

const initialState: OrderSliceState = {
   orders: [],
   orderLoading: 'idle', 
   loadingStatus: "idle",
   errorMessage: "",
};

interface ValidationErrors {
   message: string;
   errors: Record<string, string>;
}

export const makeOrder = createAsyncThunk<
   OrderInterface,
   OrderInterface,
   {
      rejectValue: ValidationErrors;
   }
>("order/makeOrder", async (orderParams, { rejectWithValue }) => {
   try {
      const response = await OrderService.makeOrder(
         orderParams.email,
         orderParams.name,
         orderParams.phone,
         orderParams.orderItems
      );

      return response.data;
   } catch (err) {
      let error: AxiosError<ValidationErrors> =
         err as AxiosError<ValidationErrors>; // bull shit

      if (!error.response) {
         throw err;
      }

      return rejectWithValue(error.response.data);
   }
});

export const getOrders = createAsyncThunk<
   ResponseItem[],
   string,
   {
      rejectValue: ValidationErrors;
   }
>("order/getOrders", async (email, { rejectWithValue }) => {
   try {
      const response = await OrderService.getOrders(email);

      return response.data;
   } catch (err) {
      let error: AxiosError<ValidationErrors> =
         err as AxiosError<ValidationErrors>; // bull shit

      if (!error.response) {
         throw err;
      }

      return rejectWithValue(error.response.data);
   }
});

export const orderSlice = createSlice({
   name: "order",
   initialState,
   reducers: {
      clearOrderError: (state) => {
         state.errorMessage = "";
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(makeOrder.pending, (state) => {
            state.loadingStatus = "loading";
         })
         .addCase(makeOrder.fulfilled, (state) => {
            state.loadingStatus = "idle";
            state.errorMessage = "Заказ отправлен";
         })
         .addCase(makeOrder.rejected, (state, action) => {
            state.loadingStatus = "error";

            state.errorMessage = action.payload?.message;
         })
         .addCase(getOrders.pending, (state) => {
            state.orderLoading = "loading";
         })
         .addCase(getOrders.fulfilled, (state, action) => {
            state.orderLoading = "idle";
            state.orders = action.payload;
         })
         .addCase(getOrders.rejected, (state) => {
            state.orderLoading = "error";

         });
   },
});

export const { clearOrderError } = orderSlice.actions;

export default orderSlice.reducer;
