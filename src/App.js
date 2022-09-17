import Categories from "./components/categories/Categories";
import Header from "./components/header/Header";
import PizzaCard from "./components/pizzaCard/pizzaCard.";
import Sort from "./components/sort/Sort";
import "./scss/app.scss";

import { useEffect, useState } from "react";

function App() {
   const [items, setItems] = useState([]);

   useEffect(() => {
      fetch("https://6325f72270c3fa390f922d7b.mockapi.io/items").then((res) =>
         res.json().then((data) => setItems(data))
      );
   }, []);

   const renderPizzasBlock = (pizzas) => {
      return pizzas.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />);
   };

   return (
      <div className="App">
         <div className="wrapper">
            <Header />
            <div className="content">
               <div className="container">
                  <div className="content__top">
                     <Categories />
                     <Sort />
                  </div>
                  <h2 className="content__title">Все пиццы</h2>
                  <div className="content__items">
                     {renderPizzasBlock(items)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
