import { createSlice } from "@reduxjs/toolkit";
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
      setSignUpActive: (state) => {
         state.signUpActive = !state.signUpActive
      },
      setSignInActive: (state) => {
        state.signInActive = !state.signInActive
      },
      setOrderActive: (state) => {
        state.orderActive = !state.orderActive
      },
      setNewProducActive: (state) => {
        state.newProducActive = !state.newProducActive
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
