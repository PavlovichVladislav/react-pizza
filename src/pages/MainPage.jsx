import { useEffect, useState } from "react";

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaCard from "../components/pizzaCard/PizzaCard.";
import Skeleton from "../components/pizzaCard/Skeleton";
import PizzaService from "../services/PizzaService";
import Pagination from "../components/pagination/Pagination";
import { useContext } from "react";
import { PizzaAppContext } from "../App";

const MainPage = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [categoryId, setCategoryId] = useState(0);
   const [sortType, setSortType] = useState({ 
      name: "популярности(от больш.)", 
      sort: "rating", 
      order: 'desc'
   });
   const [curPage, setCurPage] = useState(1);
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
         .getPizzas(categoryId, sortType.sort, sortType.order, searchValue, curPage)
         .then(onLoaded)
         .catch(onError);
    
   }, [categoryId, sortType, searchValue, curPage]);

   const renderPizzasBlock = (items) => {
      return loading
         ? [...new Array(10)].map((item, i) => <Skeleton key={i} />)
         : items.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />);
   };

   return (
      <div className="container">
         <div className="content__top">
            <Categories categoryId={categoryId} setCategoryId={setCategoryId}/>
            <Sort sortType={sortType} setSortType={setSortType}/>
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{renderPizzasBlock(items)}</div>
         <Pagination setCurPage={setCurPage}/>
      </div>
   );
};

export default MainPage;
