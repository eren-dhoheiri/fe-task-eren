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
  CreateProductModal,
  EditProductModal,
  DeleteProductModal,
} from "../components";
import { convertToIdr, formatDate } from "../utils/helper";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { connect } from "react-redux";
import { getListProduct } from "../redux/actions";

const MainApp = ({ isLoading, listProduct, getListProduct }) => {
  const [dataList, setDataList] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataSelected, setDataSelected] = useState({});

  useEffect(() => {
    getListProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    listProduct !== undefined &&
      setDataList(listProduct.filter((item) => item.komoditas !== null));
  }, [listProduct]);

  const openEditProductModal = (item) => {
    setDataSelected(item);
    setOpenEditModal(true);
  };

  const openDeleteProductModal = (item) => {
    setDataSelected(item);
    setOpenDeleteModal(true);
  };

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
      {
        Header: " ",
        accessor: (item) => (
          <div className="row-btn">
            <button
              className="edit-btn"
              title={`Edit "${item.komoditas}" Info`}
              onClick={() => openEditProductModal(item)}
            >
              <AiFillEdit />
            </button>
            <button
              className="delete-btn"
              title={`Hapus "${item.komoditas}"`}
              onClick={() => openDeleteProductModal(item)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
        disableSortBy: true,
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
        <h2>Data Produk Pembudidaya Indonesia</h2>
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
            <div className="table-top">
              <DataShow pageSize={pageSize} setPageSize={setPageSize} />
              <button
                className="add-btn"
                onClick={() => setOpenCreateModal(true)}
              >
                Tambah Produk
              </button>
            </div>
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
      <CreateProductModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <DeleteProductModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        dataSelected={dataSelected}
      />
      <EditProductModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        dataSelected={dataSelected}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
