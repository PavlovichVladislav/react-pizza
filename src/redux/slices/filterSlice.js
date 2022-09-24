import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      changeCategoryId: (state, action) => {
         state.categoryId = action.payload;
      },
      changeSortType: (state, action) => {
         state.sortType = action.payload;
      },
      setCurrentPage: (state, action) => {
         state.currentPage = action.payload;
      },
      setFilters: (state, action) => {
         state.currentPage = Number(action.payload.page);
         state.categoryId = Number(action.payload.category);
         state.sortType = action.payload.sort;
      },
      setSearchValue: (state, action) => {
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
