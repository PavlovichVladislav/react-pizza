import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthResponse } from "../../@types/AuthResponse";
import { IUser } from "../../@types/UserInterface";
import { API_URL } from "../../http/authApi";
import AuthService from "../../services/AuthService";
import { AuthSliceState, LoginParams, RegParams } from "./types";

const initialState: AuthSliceState = {
   user: {} as IUser,
   isAuth: false,
   isAdmin: false,
   loadingStatus: "idle",
   logOutLoading: "idle",
   errorMessage: "",
};

interface ValidationErrors {
   message: string;
   errors: Record<string, string>;
}

export const login = createAsyncThunk<
   AuthResponse,
   LoginParams,
   {
      rejectValue: ValidationErrors;
   }
>("auth/login", async (loginParams, { rejectWithValue }) => {
   try {
      const response = await AuthService.login(
         loginParams.email,
         loginParams.password
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

export const registration = createAsyncThunk<
   AuthResponse,
   RegParams,
   {
      rejectValue: ValidationErrors;
   }
>("auth/registration", async (regParams: RegParams, { rejectWithValue }) => {
   try {
      const response = await AuthService.registration(
         regParams.email,
         regParams.password,
         regParams.name,
         regParams.surname,
         regParams.phone,
         regParams.date
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

export const logOut = createAsyncThunk("auth/logOut", async () => {
   await AuthService.logout();
   localStorage.removeItem("token");
});

export const checkAuth = createAsyncThunk<IUser>("auth/checkAuth", async () => {
   const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
   });

   localStorage.setItem("token", response.data.accessToken);

   return response.data.user;
});

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      clearAuthError: (state) => {
         state.errorMessage = "";
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.loadingStatus = "loading";
         })
         .addCase(login.fulfilled, (state, action) => {
            state.loadingStatus = "idle";

            state.isAuth = true;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.accessToken);

            action.payload.user.email === "admin@pazzu.ru"
               ? (state.isAdmin = true)
               : (state.isAdmin = false);

            state.errorMessage = "";
         })
         .addCase(login.rejected, (state, action) => {
            state.loadingStatus = "error";

            state.isAuth = false;
            state.user = {} as IUser;

            state.errorMessage = action.payload?.message;
         })
         .addCase(registration.pending, (state) => {
            state.loadingStatus = "loading";
         })
         .addCase(registration.fulfilled, (state, action) => {
            state.loadingStatus = "idle";

            state.isAuth = true;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.accessToken);

            state.errorMessage = "";
         })
         .addCase(registration.rejected, (state, action) => {
            state.loadingStatus = "error";

            state.isAuth = false;
            state.user = {} as IUser;

            state.errorMessage = action.payload?.message;
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
         })
         .addCase(checkAuth.pending, (state) => {
            state.logOutLoading = "loading";
         })
         .addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuth = true;

            action.payload.email === "admin@pazzu.ru"
               ? (state.isAdmin = true)
               : (state.isAdmin = false);

            state.user = action.payload;
         })
         .addCase(checkAuth.rejected, (state) => {
            state.logOutLoading = "error";
         });
   },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
