export interface getRequestParams {
    categoryId: number;
    sortProp: string;
    sortOrder: string;
    searchValue: string;
    currentPage: number;
}

// export interface postRequestParams {
//     categoryId: number;
//     sortProp: string;
//     sortOrder: string;
//     searchValue: string;
//     currentPage: number;
// }

export type PizzaPost = {
    title: string;
    price: string;
    imageUrl: string;
    types: string[];
    sizes: string[];
    rating: string;
 }

export type PizzaItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    rating: number;
}
 
export enum LoadingStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    ERROR = 'error',
 }

export interface PizzaSliceState {
    loadingStatus: LoadingStatus;
    addingStatus: LoadingStatus;
    addingMessage: string;
    items: PizzaItem[]
 }