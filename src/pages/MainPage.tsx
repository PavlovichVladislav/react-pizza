import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { Categories, Sort, PizzaCard, Skeleton, Pagination } from '../components';
import{ filters } from "../components/sort/Sort";

import { setFilters } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/slice";
import { RootState, useAppDispatch } from "../redux/store";
import { PizzaItem } from "../redux/pizza/types";

const MainPage: FC = () => {
   const settingParamsByUrl = useRef(false);
   const isMounted = useRef(false);

   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const { categoryId, sortType, currentPage, searchValue } = useSelector(
      (state: RootState) => state.filter
   );
   const { loadingStatus, items } = useSelector((state: RootState) => state.pizzas);

   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1)) ;

         const sortType = filters.find(
            (obj) => obj.sort === params.sortBy && obj.order === params.order
         );
         
         dispatch(setFilters({
            categoryId: Number(params.categoryId),
            searchValue: String(params.searchValue),
            currentPage: Number(params.currentPage),
            sortType: sortType ? sortType : filters[0],
         }));

         settingParamsByUrl.current = true;
      }
   }, []);

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortBy: sortType.sort,
            order: sortType.order,
            categoryId,
            currentPage,
            searchValue,
         });

         navigate(`?${queryString}`);
      }

      isMounted.current = true;
   }, [categoryId, sortType, currentPage, searchValue]);

   useEffect(() => {
      if (!settingParamsByUrl.current) {
         dispatch(
            fetchPizzas({
               categoryId,
               sortProp: sortType.sort,
               sortOrder: sortType.order,
               searchValue,
               currentPage,
            })
         );
      }

      settingParamsByUrl.current = false;
   }, [categoryId, sortType, searchValue, currentPage]);

   const renderPizzasBlock = (items: PizzaItem[]) => {
      return loadingStatus === "loading"
         ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
         : items.map((pizza) => {return <PizzaCard key={pizza.id} {...pizza} />});
   };

   return (
      <div className="container">
         {loadingStatus === "error" ? (
            <div className="container__error">
               <h2>Произошла ошибка 😕</h2>
               <p>Не удалось получить пиццы. Повторите попытку позже.</p>
            </div>
         ) : (
            <>
               <div className="content__top">
                  <Categories />
                  <Sort sortType={sortType}/>
               </div>
               <h2 className="content__title">Все пиццы</h2>
               <div className="content__items">{renderPizzasBlock(items)}</div>
               <Pagination />
            </>
         )}
      </div>
   );
};

export default MainPage;
