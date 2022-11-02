import { FC } from "react";
import { ResponseItem } from "../../@types/Order";
import s from './OrderCard.module.scss';

const OrderCard: FC<{ order: ResponseItem }> = ({ order }) => {
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
            )
         })}
          <div className={s.orderCardTitle}>{order.isAccepted ? "Заказ принят" : "Заказ в обработке"}</div>
      </div>
   );
};

export default OrderCard;
