import { IUser } from "../../@types/UserInterface";

export interface AuthSliceState {
    user: IUser;
    isAuth: boolean;
    isAdmin: boolean;
    loadingStatus: string;
    logOutLoading: string;
    errorMessage: string | undefined;
 }

export interface LoginParams {
    email: string;
    password: string;
}

export interface RegParams {
    email: string;
    password: string;
    name: string;
    surname: string; 
    phone: string;
    date: string | undefined;
}