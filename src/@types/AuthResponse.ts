import { IUser } from "./UserInterface";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}