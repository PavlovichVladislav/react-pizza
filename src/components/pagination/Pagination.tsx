import { FC } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/filter/slice";

import s from "./Pagination.module.scss";

const Pagination: FC = () => {
   const dispatch = useDispatch();

   return (
      <ReactPaginate
         className={s.paginate}
         breakLabel="..."
         nextLabel=">"
         onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
         pageRangeDisplayed={4}
         pageCount={3}
         previousLabel="<"
         // forcePage={}
      />
   );
};

export default Pagination;
