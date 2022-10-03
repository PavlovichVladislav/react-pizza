export type CartItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: number;
    size: number;
    count: number;
 }
 
export interface CartSliceState {
    totalPrice: number;
    totalCount: number;
    items: CartItemType[];
 }