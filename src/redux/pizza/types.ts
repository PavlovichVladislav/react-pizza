export interface RequestParams {
    categoryId: number;
    sortProp: string;
    sortOrder: string;
    searchValue: string;
    currentPage: number;
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
    items: PizzaItem[]
 }