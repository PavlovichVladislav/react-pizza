import { useEffect, useState } from "react";

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaCard from "../components/pizzaCard/PizzaCard.";
import Skeleton from "../components/pizzaCard/Skeleton";

const MainPage = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   const onError = () => {
      setLoading(false);
      setError(true);
   };

   const onLoaded = (data) => {
      setItems(data);
      setLoading(false);
   };

   useEffect(() => {
      fetch("https://6325f72270c3fa390f922d7b.mockapi.io/items").then((res) =>
         res.json().then(onLoaded).catch(onError)
      );
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
