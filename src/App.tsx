import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Header, NewProducModal, OrderModal, SignInModal, SignUpModal } from "./components";
import AdminPage from "./pages/AdminPage";
import MainPage from "./pages/MainPage";
import { checkAuth } from "./redux/auth/slice";
import { useAppDispatch } from "./redux/store";

import "./scss/app.scss";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */"./pages/Cart"));
const PizzaPage = lazy(() => import(/* webpackChunkName: "PizzaInfo" */ "./pages/PizzaPage"));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

function App() {
   const dispatch = useAppDispatch();

   useEffect( () => {
      if (localStorage.getItem('token')) {
         dispatch(checkAuth());
      }
   }, [])

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
                           <PizzaPage />
                        </Suspense>
                     }
                  />
                  <Route
                     path="/user/admin"
                     element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                           <AdminPage />
                        </Suspense>
                     }
                  />
                  
               </Routes>
            </div>
         </div>
         <SignUpModal/>
         <SignInModal/>
         <OrderModal/>
         <NewProducModal/>
      </div>
   );
}

export default App;
