import React from "react";

const TablePagination = ({
  pageIndex,
  pageOptions,
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) => {
  return (
    <div className="table-pagination">
      <div className="pagination-btn">
        <div className="page-controller">
          Page{" "}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
          <span>
            {" "}
            | Go to Page
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value && Number(e.target.value) - 1;

                gotoPage(pageNumber);
              }}
            />
          </span>
        </div>

        <div className="btn-group">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Prev
          </button>

          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
