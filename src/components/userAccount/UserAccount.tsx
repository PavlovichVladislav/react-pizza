import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../redux/order/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import OrderCard from "../orderCard/OrderCard";
import s from "./UserAccount.module.scss";

const UserAccount: FC = () => {
   const user = useSelector((state: RootState) => state.auth.user);
   const dispatch = useAppDispatch();
   const orders = useSelector((state: RootState) => state.order.orders);

   useEffect(() => {
      dispatch(getUserOrders(user.email))
   }, [user])

   return (
      <>
         <div className={s.userInfo}>
            <h2>Личные данные</h2>
            <span className={s.label}>Имя</span>
            <div className={s.field}>{user.name}</div>
            <span className={s.label}>Фамилия</span>
            <div className={s.field}>{user.surname}</div>
            <span className={s.label}>Номер телефона</span>
            <div className={s.field}>{user.phone}</div>
            <span className={s.label}>Почта</span>
            <div className={s.field}>{user.email}</div>
            <span className={s.label}>Дата рождения</span>
            <div className={s.field}>{user.date}</div>
         </div>
         <div>
            <h2>Мои заказы</h2>
            {orders.map((order,i) => <OrderCard order={order} key={i}/>)}
         </div>
      </>
   );
};

export default UserAccount;
