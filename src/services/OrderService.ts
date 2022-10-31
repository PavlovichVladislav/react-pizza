import orderApi from "../http/orderApi";
import { AxiosResponse } from "axios";
import { OrderInterface, OrderItem } from "../@types/Order";

export default class OrderService {
   static async makeOrder(
      email: string,
      phone: string,
      name: string,
      orderItems: OrderItem[],
   ): Promise<AxiosResponse<OrderInterface>> {

    const response = orderApi.post<OrderInterface>("/makeOrder", {
        email,
        phone,
        name,
        orderItems
     });

      return response;
   }

//    static async registration(
//       email: string,
//       password: string,
//       name: string,
//       surname: string,
//       phone: string,
//       date: string | undefined
//    ): Promise<AxiosResponse<AuthResponse>> {
//       return pizzaApi.post<AuthResponse>("/registration", {
//          email,
//          password,
//          name,
//          surname,
//          phone,
//          date,
//       });
//    }

//    static async logout(): Promise<void> {
//       return pizzaApi.post("/logout");
//    }
}
