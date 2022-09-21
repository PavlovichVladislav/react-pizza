import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Cart from "./pages/Cart";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

export const PizzaAppContext = createContext();

function App() {
   const [searchValue, setSearchValue] = useState("");

   return (
      <div className="App">
         <div className="wrapper">
            <PizzaAppContext.Provider value={{ searchValue, setSearchValue }}>
               <Header />
               <div className="content">
                  <Routes>
                     <Route path="/" element={<MainPage />} />
                     <Route path="/cart" element={<Cart />} />
                     <Route path="*" element={<NotFound />} />
                  </Routes>
               </div>
            </PizzaAppContext.Provider>
         </div>
      </div>
   );
}

export default App;
