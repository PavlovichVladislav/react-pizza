import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaCard from "../components/pizzaCard/PizzaCard.";
import Skeleton from "../components/pizzaCard/Skeleton";
import PizzaService from "../services/PizzaService";
import Pagination from "../components/pagination/Pagination";

import { PizzaAppContext } from "../App";


const MainPage = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   const { categoryId, sortType, currentPage } = useSelector(state => state.filter);
   
   const {searchValue} = useContext(PizzaAppContext);
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
      setLoading(true);
      pizzaService
         .getPizzas(categoryId, sortType.sort, sortType.order, searchValue, currentPage)
         .then(onLoaded)
         .catch(onError);
    
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
