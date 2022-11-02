export interface OrderItem {
   title: string;
   image: string;
   dough: string;
   size: number;
   count: number;
}

export interface OrderInterface {
   email: string;
   phone: string;
   name: string;
   orderItems: OrderItem[];
}

export interface ResponseItem {
   orderItems: OrderItem[]
   isAccepted: boolean
}
