const Categories = ({categoryId, setCategoryId}) => {
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
                  className={ i === categoryId ? "active" : ""}
                  onClick={() => setCategoryId(i)}
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
