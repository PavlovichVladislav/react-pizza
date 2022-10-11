import { FC, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PizzaService from "../../services/PizzaService";

import s from "./PizzaInfo.module.scss";

// interface PizzaInterface

const PizzaInfo: FC = () => {
   console.log(s);
   const [pizza, setPizza] = useState<{
      imageUrl: string;
      title: string;
      price: number;
   }>({
      imageUrl: "",
      title: "",
      price: 0,
   });

   const { id } = useParams();
   const pizzaService = new PizzaService();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await pizzaService.getPizza(id);
            setPizza(res);
         } catch (error) {
            console.log(error);
            navigate("/");
         }
      };

      fetchData();
   }, [id]);

   if (!Object.keys(pizza).length) {
      return <div>Загрузка....</div>;
   }

   return (
      <div className={s.pizzaWrapper}>
         <img className={s.pizzaImg} src={pizza.imageUrl} alt={pizza.title} />
         <div className={s.pizzaDescr}>
            <h2 className={s.pizzaTitle}>{pizza.title}</h2>
            <p className={s.pizzaText}>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
               consectetur itaque vero in illo, blanditiis voluptatum quam nihil
               architecto. Beatae itaque minima iure rerum quas quaerat unde
               dolore explicabo. Pariatur?
            </p>
            <span>Стоимость : {pizza.price} руб</span>
            <div className={s.pizzaButtons}>
               <button className="button button--outline button--add">
                  <span>добавить в корзину</span>
               </button>
               <Link to="/" className="button button--outline button--add">
                  <span>Назад</span>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default PizzaInfo;

