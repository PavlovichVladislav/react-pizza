import { useState } from "react";

const Categories = () => {
   const [activeCategory, setActiveCategory] = useState("Все");

   const categoriesArr = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
   ];

   return (
      <div className="categories">
         <ul>
            {categoriesArr.map((category, i) => (
               <li
                  className={category === activeCategory ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
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
