import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filter/slice";
import cart from "./cart/slice";
import pizzas from "./pizza/slice";
import { useDispatch } from "react-redux";
import modals from './modals/slice';
import auth from './auth/slice';
import order from './order/slice';

export const store = configureStore({
   reducer: {
      filter: filtersReducer,
      cart,
      pizzas,
      modals,
      auth,
      order
   },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
