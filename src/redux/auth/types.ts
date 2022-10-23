import { IUser } from "../../@types/UserInterface";

export interface AuthSliceState {
    user: IUser;
    isAuth: boolean;
    regLoading: string;
    authLoading: string;
    logOutLoading: string;
 }

export interface LoginParams {
    email: string;
    password: string;
}

export interface RegParams {
    email: string;
    password: string;
}