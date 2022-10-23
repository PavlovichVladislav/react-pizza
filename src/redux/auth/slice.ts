import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../@types/UserInterface";
import AuthService from "../../services/AuthService";
import { AuthSliceState, LoginParams, RegParams } from "./types";

const initialState: AuthSliceState = {
   user: {} as IUser,
   isAuth: false,
   regLoading: "idle",
   authLoading: "idle",
   logOutLoading: "idle",
};

export const login = createAsyncThunk<IUser, LoginParams>(
   "auth/login",
   async (loginParams) => {
      const response = await AuthService.login(loginParams.email, loginParams.password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);

      return response.data.user;
   }
);

export const registration = createAsyncThunk<IUser, RegParams>(
    "auth/registration",
    async (regParams) => {
       const response = await AuthService.registration(regParams.email, regParams.password);
       console.log(response);
       localStorage.setItem("token", response.data.accessToken);
 
       return response.data.user;
    }
 );

 export const logOut = createAsyncThunk(
    "auth/logOut",
    async () => {
       await AuthService.logout();
       localStorage.removeItem("token");
 
    }
 );

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.regLoading = "loading";
         })
         .addCase(login.fulfilled, (state, action) => {
            console.log('auth');
            state.regLoading = "idle";
            state.isAuth = true;
            state.user = action.payload;
         })
         .addCase(login.rejected, (state) => {
            state.regLoading = "error";
            state.isAuth = false;
            state.user = {} as IUser;
         })
         .addCase(registration.pending, (state) => {
            state.authLoading = "loading";
         })
         .addCase(registration.fulfilled, (state, action) => {
            state.authLoading = "idle";
            state.isAuth = true;
            state.user = action.payload;
         })
         .addCase(registration.rejected, (state) => {
            state.authLoading = "error";
            state.isAuth = false;
            state.user = {} as IUser;
         })
         .addCase(logOut.pending, (state) => {
            state.logOutLoading = "loading";
         })
         .addCase(logOut.fulfilled, (state) => {
            state.logOutLoading = "idle";
            state.isAuth = false;
            state.user = {} as IUser;
         })
         .addCase(logOut.rejected, (state) => {
            state.logOutLoading = "error";
         });
   },
});

export default authSlice.reducer;
