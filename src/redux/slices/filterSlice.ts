import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type sortObj = {
   name: string;
   sort: 'rating' | 'title' | 'price';
   order: 'desc' | 'asc';
}

export interface FiltersSliceState {
   searchValue: string;
   categoryId: number;
   currentPage: number;
   sortType: sortObj;
}

const initialState: FiltersSliceState = {
   searchValue: "",
   categoryId: 0,
   currentPage: 1,
   sortType: {
      name: "популярности(от больш.)",
      sort: "rating",
      order: "desc",
   },
};

export const filterSlice = createSlice({
   name: "filter",
   initialState,
   reducers: {
      changeCategoryId: (state, action: PayloadAction<number>) => {
         state.categoryId = action.payload;
      },
      changeSortType: (state, action: PayloadAction<sortObj>) => {
         state.sortType = action.payload;
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
         state.currentPage = action.payload;
      },
      setFilters: (state, action: PayloadAction<FiltersSliceState>) => {
         state.currentPage = Number(action.payload.currentPage);
         state.categoryId = Number(action.payload.categoryId);
         state.searchValue = action.payload.searchValue;
         state.sortType = action.payload.sortType;
      },
      setSearchValue: (state, action: PayloadAction<string>) => {
         state.searchValue = action.payload;
      },
   },
});

export const {
   changeCategoryId,
   changeSortType,
   setCurrentPage,
   setFilters,
   setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
