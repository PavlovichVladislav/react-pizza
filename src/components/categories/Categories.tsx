import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategoryId } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

const Categories: FC = () => {
   const categoriesArr: string[] = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
   ];
   
   const categoryId = useSelector((state: RootState) => state.filter.categoryId);
   const dispatch = useDispatch();

   return (
      <div className="categories">
         <ul>
            {categoriesArr.map((category, i) => (
               <li
                  className={ i === categoryId ? "active" : ""}
                  onClick={() => dispatch(changeCategoryId(i))}
                  key={i}
               >
                  {category}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Categories;
