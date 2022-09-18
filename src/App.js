import { Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Cart from "./pages/Cart";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

function App() {
   return (
      <div className="App">
         <div className="wrapper">
            <Header />
            <div className="content"></div>
            <Routes>
               <Route path="/" element={<MainPage />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </div>
   );
}

export default App;
