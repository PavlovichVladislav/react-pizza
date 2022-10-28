import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import s from "./UserAccount.module.scss";

const UserAccount: FC = () => {
   const user = useSelector((state: RootState) => state.auth.user);

   return (
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
   );
};

export default UserAccount;
