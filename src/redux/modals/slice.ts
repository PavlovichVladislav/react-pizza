import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalsSliceState } from "./types";

const initialState: ModalsSliceState = {
    signUpActive: false,
    signInActive: false,
    orderActive: false,
    newProducActive: false,
};

export const modalsSlice = createSlice({
   name: "modals",
   initialState,
   reducers: {
      setSignUpActive: (state, action: PayloadAction<boolean>) => {
         state.signUpActive = action.payload
      },
      setSignInActive: (state, action: PayloadAction<boolean>) => {
        state.signInActive = action.payload
      },
      setOrderActive: (state, action: PayloadAction<boolean>) => {
        state.orderActive = action.payload
      },
      setNewProducActive: (state, action: PayloadAction<boolean>) => {
        state.newProducActive = action.payload
      }
    }

});

export const {
    setSignUpActive,
    setSignInActive,
    setOrderActive,
    setNewProducActive

} = modalsSlice.actions;

export default modalsSlice.reducer;
