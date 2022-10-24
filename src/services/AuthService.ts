import authApi from "../http";
import { AuthResponse } from "../@types/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        const response = authApi.post<AuthResponse>('/login', {email, password});

        return response
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return authApi.post<AuthResponse>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return authApi.post('/logout')
    }
}

