import React, { useState, useMemo, useEffect } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import {
  MainTable,
  Pagination,
  CustomSearch,
  Loading,
  DataShow,
  FilterTable,
  FilterNumber,
} from "../components";
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
      setDataList(listProduct.filter((item) => item.komoditas !== null));
  }, [listProduct]);

  const data = useMemo(() => dataList, [dataList]);
  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: (product, d) => d + 1,
        Filter: FilterTable,
        disableFilters: true,
      },
      {
        Header: "Komoditas",
        accessor: "komoditas",
        Filter: FilterTable,
      },
      {
        Header: "Harga",
        accessor: "price",
        Cell: (item) => convertToIdr(item.value),
        Filter: FilterTable,
      },
      {
        Header: "Ukuran",
        accessor: "size",
        Cell: (item) => Number(item.value),
        Filter: FilterTable,
      },
      {
        Header: "Kota/Kab",
        accessor: "area_kota",
        Filter: FilterTable,
      },
      {
        Header: "Provinsi",
        accessor: "area_provinsi",
        Filter: FilterTable,
      },
      {
        Header: "Tanggal",
        accessor: (d) => formatDate(d.tgl_parsed),
        Filter: FilterTable,
        disableFilters: true,
      },
    ],
    []
  );
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
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
    setPageSize,
  } = tableInstance;
  const { pageIndex, globalFilter, pageSize } = state;

  return (
    <div className="container main">
      <div className="title-container">
        <h2>Daftar Produk eFishery</h2>
      </div>
      <div className="searchbar-container">
        {/* <CustomSearch
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        /> */}
        <DataShow pageSize={pageSize} setPageSize={setPageSize} />
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
