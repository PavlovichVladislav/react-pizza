import { useRef, useCallback, useState, FC, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";
import { RootState } from "../../redux/store";

import debounce from "../../utils/debounce";

import s from "./SearchPanel.module.scss";

const SearchPanel: FC = () => {
   const trueSearchValue = useSelector((state: RootState) => state.filter.searchValue);
   const dispatch = useDispatch();
   const [value, setValue] = useState("");
   const searchInput = useRef<HTMLInputElement>(null);

   useEffect(() => {
      setValue(trueSearchValue);
   }, [trueSearchValue])

   const onClear = () => {
      dispatch(setSearchValue(""));
      setValue("");
      if (searchInput.current) searchInput.current.focus();

      searchInput.current?.focus();
   };

   const updateSearchValue: (value: string) => void = useCallback(
      debounce((value: string) => {
         dispatch(setSearchValue(value));
      }, 300),
      []
   );



   const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      updateSearchValue(e.target.value);
   };

   return (
      <div className={s.searchPannel}>
         <svg
            className={s.icon}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
         >
            <title />
            <g id="search">
               <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
            </g>
         </svg>
         <input
            ref={searchInput}
            value={value}
            onChange={onInputChange}
            className={s.searchField}
            placeholder="Поиск пиццы..."
         />
         <svg
            className={s.clear}
            onClick={onClear}
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
            <path d="M0 0h48v48H0z" fill="none" />
         </svg>
      </div>
   );
};

export default SearchPanel;
