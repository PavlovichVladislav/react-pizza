import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/categories/Categories";
import Sort, { filters } from "../components/sort/Sort";
import PizzaCard from "../components/pizzaCard/PizzaCard.";
import Skeleton from "../components/pizzaCard/Skeleton";
import PizzaService from "../services/PizzaService";
import Pagination from "../components/pagination/Pagination";

import { setFilters } from "../redux/slices/filterSlice";

const MainPage = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   const settingParamsByUrl = useRef(false);
   const isMounted = useRef(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { categoryId, sortType, currentPage, searchValue } = useSelector(state => state.filter);
   
   const pizzaService = new PizzaService();

   const onError = () => {
      setLoading(false);
      setError(true);
   };

   const onLoaded = (data) => {
      setItems(data);
      setLoading(false);
   };

   useEffect(() => {
      if (window.location.search) {
         
         const params = qs.parse(window.location.search.substring(1));

         const sort = filters.find(obj => obj.sort === params.sortBy && obj.order === params.order)

         dispatch(setFilters({...params, sort}));

         settingParamsByUrl.current = true;
      }
   }, [])

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortBy: sortType.sort,
            order: sortType.order,
            category: categoryId,
            page: currentPage
         })
   
         navigate(`?${queryString}`);
      }
      
      isMounted.current = true;
   }, [categoryId, sortType.name, currentPage])

   useEffect(() => {
      if (!settingParamsByUrl.current) {
         setLoading(true);
         pizzaService
            .getPizzas(categoryId, sortType.sort, sortType.order, searchValue, currentPage)
            .then(onLoaded)
            .catch(onError);
      }

      settingParamsByUrl.current = false;
   }, [categoryId, sortType.name, searchValue, currentPage]);

   const renderPizzasBlock = (items) => {
      return loading
         ? [...new Array(10)].map((item, i) => <Skeleton key={i} />)
         : items.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />);
   };

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort/>
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{renderPizzasBlock(items)}</div>
         <Pagination />
      </div>
   );
};

export default MainPage;
