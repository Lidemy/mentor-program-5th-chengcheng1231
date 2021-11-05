import ReactPaginate from 'react-paginate';
import "./styles.css";

export default function PaginatedSection({
  perPageCount,
  totalCount,
  handlePageClick,
}) {

  const pageCount = Math.ceil(totalCount / perPageCount);

  return (
    <div className="PaginatedContainer">
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
}


