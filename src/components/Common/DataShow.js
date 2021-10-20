import React from "react";

function DataShow({ pageSize, setPageSize }) {
  return (
    <div className="datashow-container">
      <select
        className="select-btn"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DataShow;
