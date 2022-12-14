import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../redux/cart/slice";
import { CartItemType } from "../../redux/cart/types";
import { RootState } from "../../redux/store";

type PizzaCardProps = {
   id: string;
   title: string;
   price: number;
   imageUrl: string;
   types: number[];
   sizes: number[];
}

const PizzaCard: FC<PizzaCardProps> = ({ id, title, price, imageUrl, types, sizes }) => {
   const typeNames = ["тонкое", "традиционное"];
   const [activeType, setActiveType] = useState(0);
   const [activeSize, setActiveSize] = useState(sizes[0]);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const count = useSelector((state: RootState) => {
      let count = 0;

      state.cart.items.forEach((item: CartItemType) => {
         if (item.id === id) {
            count += item.count;
         }
      });

      return count;
   });

   const onAddPizza = () => {
      const item: CartItemType = {
         id,
         title,
         price,
         imageUrl,
         type: activeType,
         size: activeSize,
         count: 1
      }

      dispatch(
         addItem(item)
      );
   };

   const onPizzaClick = () => {
      navigate(`/pizza/${id}`)
   }

   return (
      <div className="pizza-block">
         <img onClick={onPizzaClick} className="pizza-block__image" src={imageUrl} alt="Pizza" />
         <h4 className="pizza-block__title">{title}</h4>
         <div className="pizza-block__selector">
            <ul>
               {types.map((type) => {
                  return (
                     <li
                        onClick={() => setActiveType(type)}
                        className={type == activeType ? "active" : ""}
                        key={type}
                     >
                        {typeNames[type]}
                     </li>
                  );
               })}
            </ul>
            <ul>
               {sizes.map((size) => {
                  return (
                     <li
                        onClick={() => setActiveSize(size)}
                        className={size === activeSize ? "active" : ""}
                        key={size}
                     >
                        {size} см.
                     </li>
                  );
               })}
            </ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">От {price} ₽</div>
            <button
               onClick={onAddPizza}
               className="button button--outline button--add"
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
               <span>Добавить</span>
               {count > 0 && <i>{count}</i>}
            </button>
         </div>
      </div>
   );
};

export default PizzaCard;
