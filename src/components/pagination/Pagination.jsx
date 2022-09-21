import ReactPaginate from "react-paginate";

import s from "./Pagination.module.scss";

const Pagination = ({ setCurPage }) => {
   return (
      <ReactPaginate
         className={s.paginate}
         breakLabel="..."
         nextLabel=">"
         onPageChange={(e) => setCurPage(e.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={3}
         previousLabel="<"
         renderOnZeroPageCount={null}
      />
   );
};

export default Pagination;
