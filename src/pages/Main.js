import React, { useState, useMemo, useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { MainTable, Pagination, CustomSearch, Loading } from "../components";
import { convertToIdr, formatDate } from "../utils/helper";
import { connect } from "react-redux";
import { getListProduct } from "../redux/actions";

const Main = ({ isLoading, listProduct, getListProduct }) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getListProduct();
  }, []);

  useEffect(() => {
    listProduct !== undefined &&
      setDataList(
        listProduct.filter(
          (item) => item.uuid !== null && item.komoditas !== null
        )
      );
  }, [listProduct]);

  const data = useMemo(() => dataList, [dataList]);
  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: (product, d) => d + 1,
      },
      {
        Header: "Komoditas",
        accessor: "komoditas",
      },
      {
        Header: "Harga",
        accessor: (d) => convertToIdr(d.price),
      },
      {
        Header: "Ukuran",
        accessor: "size",
      },
      {
        Header: "Kota/Kab",
        accessor: "area_kota",
      },
      {
        Header: "Provinsi",
        accessor: "area_provinsi",
      },
      {
        Header: "Tanggal",
        accessor: (d) => formatDate(d.tgl_parsed),
      },
    ],
    []
  );
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;
  const { pageIndex, globalFilter } = state;

  return (
    <div className="container main">
      <div className="title-container">
        <h2>Daftar Produk eFishery</h2>
      </div>
      <div className="searchbar-container">
        <CustomSearch
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="table-container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <MainTable
              getTableBodyProps={getTableBodyProps}
              getTableProps={getTableProps}
              tableDataValues={dataList}
              headerGroups={headerGroups}
              prepareRow={prepareRow}
              page={page}
            />
            <Pagination
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              gotoPage={gotoPage}
              canPreviousPage={canPreviousPage}
              previousPage={previousPage}
              canNextPage={canNextPage}
              nextPage={nextPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    listProduct: state.listProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListProduct: () => dispatch(getListProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
