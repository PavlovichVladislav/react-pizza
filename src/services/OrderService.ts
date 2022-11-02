import orderApi from "../http/orderApi";
import { AxiosResponse } from "axios";
import { OrderInterface, OrderItem, ResponseItem } from "../@types/Order";

export default class OrderService {
   static async makeOrder(
      email: string,
      phone: string,
      name: string,
      orderItems: OrderItem[]
   ): Promise<AxiosResponse<OrderInterface>> {
      const response = orderApi.post<OrderInterface>("/makeOrder", {
         email,
         phone,
         name,
         orderItems,
      });

      return response;
   }

   static async getOrders(
      email: string,
   ): Promise<AxiosResponse<ResponseItem[]>> {

      const response = orderApi.post<ResponseItem[]>("/getUserOrders", {
         email,
      });

      return response;
   }
}
