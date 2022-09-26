import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/categories/Categories";
import Sort, { filters } from "../components/sort/Sort";
import PizzaCard from "../components/pizzaCard/PizzaCard.";
import Skeleton from "../components/pizzaCard/Skeleton";
import Pagination from "../components/pagination/Pagination";

import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

const MainPage = () => {
   const settingParamsByUrl = useRef(false);
   const isMounted = useRef(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { categoryId, sortType, currentPage, searchValue } = useSelector(
      (state) => state.filter
   );
   const { loadingStatus, items } = useSelector((state) => state.pizzas);

   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));

         const sort = filters.find(
            (obj) => obj.sort === params.sortBy && obj.order === params.order
         );

         dispatch(setFilters({ ...params, sort }));

         settingParamsByUrl.current = true;
      }
   }, []);

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortBy: sortType.sort,
            order: sortType.order,
            category: categoryId,
            page: currentPage,
         });

         navigate(`?${queryString}`);
      }

      isMounted.current = true;
   }, [categoryId, sortType, currentPage]);

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

   const renderPizzasBlock = (items) => {
      return loadingStatus === "loading"
         ? [...new Array(10)].map((item, i) => <Skeleton key={i} />)
         : items.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />);
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
                  <Sort />
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
