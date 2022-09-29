import { Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Cart from "./pages/Cart";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import PizzaInfo from "./components/pizzaInfo/PizzaInfo";

import "./scss/app.scss";

function App() {
   return (
      <div className="App">
         <div className="wrapper">
            <Header />
            <div className="content">
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/pizza/:id" element={<PizzaInfo />} />
               </Routes>
            </div>
         </div>
      </div>
   );
}

export default App;
