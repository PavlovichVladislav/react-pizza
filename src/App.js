import Categories from "./components/categories/Categories";
import Header from "./components/header/Header";
import PizzaCard from "./components/pizzaCard/pizzaCard.";
import Sort from "./components/sort/Sort";
import "./scss/app.scss";

import pizzas from "./assets/pizza.json";

function App() {
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
                     {renderPizzasBlock(pizzas)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
