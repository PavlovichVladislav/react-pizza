import authApi from "../http/authApi";
import { AuthResponse } from "../@types/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
   static async login(
      email: string,
      password: string
   ): Promise<AxiosResponse<AuthResponse>> {
      const response = authApi.post<AuthResponse>("/login", {
         email,
         password,
      });

      return response;
   }

   static async registration(
      email: string,
      password: string,
      name: string,
      surname: string,
      phone: string,
      date: string | undefined
   ): Promise<AxiosResponse<AuthResponse>> {
      return authApi.post<AuthResponse>("/registration", {
         email,
         password,
         name,
         surname,
         phone,
         date,
      });
   }

   static async logout(): Promise<void> {
      return authApi.post("/logout");
   }
}
