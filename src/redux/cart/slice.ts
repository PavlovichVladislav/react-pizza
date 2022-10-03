import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartSliceState } from "./types";

const initialState: CartSliceState = {
   totalCount: 0,
   totalPrice: 0,
   items: [],
};

// repeated code
export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addItem: (state, action: PayloadAction<CartItemType>) => {
         const findItem = state.items.find(
            (item) =>
               item.id === action.payload.id &&
               item.size === action.payload.size &&
               item.type === action.payload.type
         );

         if (findItem) {
            findItem.count++;
            state.totalCount++;
         } else {
            state.items.push({
               ...action.payload,
               count: action.payload.count
            });

            state.totalCount += action.payload.count;
         }

         if (action.payload.count === 1) {
            state.totalPrice += action.payload.price;
         } else {
            state.totalPrice += action.payload.price * action.payload.count;
         }
      },
      minusItem: (state, action: PayloadAction<CartItemType>) => {
         const findItem = state.items.find(
            (item) =>
               item.id === action.payload.id &&
               item.size === action.payload.size &&
               item.type === action.payload.type
         );

         if (findItem && findItem.count > 1) {
            findItem.count--;
            state.totalCount--;
         } else {
            state.items = state.items.filter(
               (item) =>
                  !(
                     item.id === action.payload.id &&
                     item.type === action.payload.type &&
                     item.size === action.payload.size
                  )
            );
            state.totalCount--;
         }

         state.totalPrice -= action.payload.price;
      },
      removeItem: (state, action: PayloadAction<CartItemType>) => {
         state.totalCount -= action.payload.count;
         state.totalPrice -= action.payload.count * action.payload.price;

         state.items = state.items.filter(
            (item) =>
               !(
                  item.id === action.payload.id &&
                  item.type === action.payload.type &&
                  item.size === action.payload.size
               )
         );
      },
      clearItems: (state) => {
         state.items = [];
         state.totalPrice = 0;
         state.totalCount = 0;
      },
   },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
