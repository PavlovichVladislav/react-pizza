import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeSortType } from "../../redux/slices/filterSlice";

export const filters = [
   { name: "популярности(от больш.)", sort: "rating", order: 'desc'},
   { name: "популярности(от меньш.)", sort: "rating", order: 'asc'},
   { name: "цене(от больш.)", sort: "price", order: 'desc'},
   { name: "цене(от меньш.)", sort: "price", order: 'asc'},
   { name: "алфавиту(обр.)", sort: "title", order: 'desc'},
   { name: "алфавиту(прям.)", sort: "title", order: 'asc'},
];

const Sort = () => {
   const [popupShow, setPopupShow] = useState(false);

   const sortType = useSelector((state) => state.filter.sortType);
   const dispatch = useDispatch();

   const sortRef = useRef();

   const onFilterClick = (sortProp) => {
      dispatch(changeSortType(sortProp));
      setPopupShow(false);
   };

   useEffect(() => {
      const clickOutsidePopup = e => {
         if (!e.path.includes(sortRef.current)){
            setPopupShow(false);
         }
      }

      document.body.addEventListener('click', clickOutsidePopup)

      return function cleanUp() {
         document.body.removeEventListener('click', clickOutsidePopup);
      }
   }, []);

   return (
      <div 
         ref={sortRef} 
         className="sort" 
         onClick={() => setPopupShow((popupShow) => !popupShow)}
      >
         <div className="sort__label">
            <svg
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Сортировка по:</b>
            <span>
               {sortType.name}
            </span>
         </div>
         {popupShow && (
            <div className="sort__popup">
               <ul>
                  {filters.map((filter, i) => {
                     return (
                        <li
                           key={i}
                           className={filter.name === sortType.name ? "active" : ""}
                           onClick={() => onFilterClick(filter)}
                        >
                           {filter.name}
                        </li>
                     );
                  })}
               </ul>
            </div>
         )}
      </div>
   );
};

export default Sort;
