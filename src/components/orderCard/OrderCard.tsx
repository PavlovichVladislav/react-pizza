import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ResponseItem } from "../../@types/Order";
import { RootState } from "../../redux/store";
import OrderService from "../../services/OrderService";
import s from "./OrderCard.module.scss";

const OrderCard: FC<{ order: ResponseItem }> = ({ order }) => {
   const admin = useSelector((state: RootState) => state.auth.isAdmin);
   const [isAccepted, setIsAccepted] = useState(false);

   if (isAccepted) return null;

   return (
      <div className={s.orderCard}>
         {order.orderItems.map((item, i) => {
            return (
               <div className="cart__item" key={i}>
                  <div className="cart__item-img">
                     <img
                        className="pizza-block__image"
                        src={item.image}
                        alt="Pizza"
                     />
                  </div>
                  <div className="cart__item-info">
                     <h3>{item.title}</h3>
                     <p>
                        {item.dough} тесто, {item.size} см.
                     </p>
                  </div>

                  <div className="cart__item-count">
                     <b>{item.count}</b>
                  </div>
               </div>
            );
         })}
         {admin ? (
            <button
               className="button button--outline button--add"
               onClick={() => {
                  OrderService.acceptOrder(order._id);
                  setIsAccepted(true);
               }}
            >
               <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                     fill="white"
                  />
               </svg>
               <span>Принять заказ</span>
            </button>
         ) : (
            <div className={s.orderCardTitle}>
               {order.isAccepted ? "Заказ принят" : "Заказ в обработке"}
            </div>
         )}
      </div>
   );
};

export default OrderCard;
