export type SortObj = {
    name: string;
    sort: 'rating' | 'title' | 'price';
    order: 'desc' | 'asc';
 }
 
 export interface FiltersSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sortType: SortObj;
 }