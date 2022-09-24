import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
   },
});

export const { changeCategoryId, changeSortType, setCurrentPage } =
   filterSlice.actions;

export default filterSlice.reducer;
