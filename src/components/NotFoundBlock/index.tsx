import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./NotFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
   return (
      <div className={s.notFound}>
         <h2 className={s.notFoundTitle}>Ничего не найдено 😕</h2>
         <p className={s.notFoundDescr}>
            Вероятней всего, вы указали не существующий адрес страницы. <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу
         </p>

         <NavLink to="/" className={s.notFoundBtn}>
            Вернуться назад
         </NavLink>
      </div>
   );
};

export default NotFoundBlock;
