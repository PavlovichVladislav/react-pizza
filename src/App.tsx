import { lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
// import Cart from "./pages/Cart";
import MainPage from "./pages/MainPage";
// import NotFound from "./pages/NotFound";
// import PizzaInfo from "./components/pizzaInfo/PizzaInfo";

import "./scss/app.scss";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */"./pages/Cart"));
const PizzaInfo = lazy(() => import(/* webpackChunkName: "PizzaInfo" */ "./components/pizzaInfo/PizzaInfo"));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

function App() {
   return (
      <div className="App">
         <div className="wrapper">
            <Header />
            <div className="content">
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route
                     path="/cart"
                     element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                           <Cart />
                        </Suspense>
                     }
                  />
                  <Route
                     path="*"
                     element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                           <NotFound />
                        </Suspense>
                     }
                  />
                  <Route
                     path="/pizza/:id"
                     element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                           <PizzaInfo />
                        </Suspense>
                     }
                  />
               </Routes>
            </div>
         </div>
      </div>
   );
}

export default App;
