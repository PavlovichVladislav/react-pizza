import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

import s from "./Pagination.module.scss";

const Pagination = () => {
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
         renderOnZeroPageCount={null}
      />
   );
};

export default Pagination;
