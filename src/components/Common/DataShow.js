import React from "react";

function DataShow({ pageSize, setPageSize }) {
  return (
    <div className="datashow-container">
      <span>Show </span>
      <select
        className="select-btn"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize} entries
          </option>
        ))}
      </select>
    </div>
  );
}

export default DataShow;
