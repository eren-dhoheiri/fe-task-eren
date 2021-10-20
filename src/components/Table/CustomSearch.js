import React from "react";

const customSearch = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Apa yang kamu cari?"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="searchbar-input"
      />
    </div>
  );
};

export default customSearch;
