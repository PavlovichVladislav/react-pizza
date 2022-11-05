import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setNewProducActive } from "../../redux/modals/slice";
import { getOrders } from "../../redux/order/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import OrderCard from "../orderCard/OrderCard";

const AdminPannel: FC = () => {
   const dispatch = useAppDispatch();
   const orders = useSelector((state: RootState) => state.order.orders);

   useEffect(() => {
      dispatch(getOrders('getOrders'))
   }, [])

   return (
      <div>
         <div className="cart__top">
            <h2 className="content__title">Панель управления</h2>
         </div>
         <div className="content__title">Заказы</div>
         {orders.map((order,i) => <OrderCard order={order} key={i}/>)}


         {/* <div className="content__items">
            <div className="card">
               <div className="container">
                  <h4>
                     <b>Маргарита</b>
                     <p>89936722725</p>
                  </h4>
                  <div className="button pay-btn">
                     <span>Подтвердить заказ</span>
                  </div>
               </div>
            </div>
            <div className="card">
               <div className="container">
                  <h4>
                     <b>Четыре сезона</b>
                     <p>89936722723</p>
                  </h4>
                  <div className="button pay-btn">
                     <span>Подтвердить заказ</span>
                  </div>
               </div>
            </div>
            <div className="card">
               <div className="container">
                  <h4>
                     <b>Мясная</b>
                     <p>89936722724</p>
                  </h4>
                  <div className="button pay-btn">
                     <span>Подтвердить заказ</span>
                  </div>
               </div>
            </div>
         </div> */}

         <div className="cart__bottom">
            <div className="cart__bottom-buttons">
               <NavLink
                  to="/"
                  className="button button--outline button--add go-back-btn"
               >
                  <svg
                     width="8"
                     height="14"
                     viewBox="0 0 8 14"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M7 13L1 6.93015L6.86175 1"
                        stroke="#D3D3D3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>

                  <span>Вернуться назад</span>
               </NavLink>
               <div
                  className="button pay-btn"
                  onClick={() => dispatch(setNewProducActive(true))}
               >
                  <span>Добавить новый товар</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminPannel;
