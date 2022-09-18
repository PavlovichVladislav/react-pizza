import { useEffect, useState } from "react";

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaCard from "../components/pizzaCard/PizzaCard.";
import Skeleton from "../components/pizzaCard/Skeleton";
import PizzaService from "../services/PizzaService";

const MainPage = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

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
    pizzaService
        .getPizzas()
        .then(onLoaded)
        .catch(onError);
    
    window.scrollTo(0, 0);
   }, []);

   const renderPizzasBlock = (items) => {
      return loading
         ? [...new Array(10)].map((item, i) => <Skeleton key={i} />)
         : items.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />);
   };

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{renderPizzasBlock(items)}</div>
      </div>
   );
};

export default MainPage;
