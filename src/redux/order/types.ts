import { OrderItem, ResponseItem } from "../../@types/Order";

export interface Order {
   orderItems: OrderItem[];
   isAccepted: boolean;

}

export interface OrderSliceState {
   orders: ResponseItem[];
   orderLoading: string;
   loadingStatus: string;
   errorMessage: string | undefined;
}
