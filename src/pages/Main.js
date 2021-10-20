import React, { useState, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { MainTable, Pagination, CustomSearch } from "../components";
import { toCurrency, toDateFormat } from "../utils/helper";

const Main = () => {
  const [dataList, setDataList] = useState([
    {
      uuid: "7f00354a-a6e1-40c1-9ad6-d9e673f079fe",
      komoditas: "Bandeng",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "20",
      price: "100000",
      tgl_parsed: "2021-01-15T16:35:45.929Z",
      timestamp: "1610728545929",
    },
    {
      uuid: "832aa6d5-aae1-4e6a-b523-7d55cd9500c9",
      komoditas: "Bandeng",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "20",
      price: "100000",
      tgl_parsed: "2021-01-15T16:35:47.218Z",
      timestamp: "1610728547218",
    },
    {
      uuid: "96161013-baf3-440a-9bcd-30db2a36e504",
      komoditas: "Bandeng",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "20",
      price: "100000",
      tgl_parsed: "2021-01-15T16:35:47.990Z",
      timestamp: "1610728547990",
    },
    {
      uuid: "07754845-958b-4826-bdb2-135b7c0f3da0",
      komoditas: "Bandeng",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "20",
      price: "100000",
      tgl_parsed: "2021-01-15T16:35:49.254Z",
      timestamp: "1610728549254",
    },
    {
      uuid: "b7571783-3256-4e70-9b56-7873d0c48e91",
      komoditas: "Bandeng",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "20",
      price: "100000",
      tgl_parsed: "2021-01-15T16:35:52.294Z",
      timestamp: "1610728552294",
    },
    {
      uuid: "20d2f098-87b4-4f8f-9c20-fc9ce1a8eae0",
      komoditas: "Udang Bandung Asli",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "20",
      price: "200000",
      tgl_parsed: "2021-01-15T17:16:27.675Z",
      timestamp: "1610730987675",
    },
    {
      uuid: "ea4d7086-e43a-4e08-872b-92e8d4184975",
      komoditas: "Udang Garut",
      area_provinsi: "JAWA BARAT",
      area_kota: "GARUT",
      size: "20",
      price: "1000",
      tgl_parsed: "2021-01-15T17:17:22.292Z",
      timestamp: "1610731042292",
    },
    {
      uuid: "ef8a69fc-9307-42d0-b57b-32dc8dbc4296",
      komoditas: "Bandeng Keren",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "212",
      price: "100000",
      tgl_parsed: "2021-01-16T17:02:23.681Z",
      timestamp: "1610816543681",
    },
    {
      uuid: "ab122aba-3de3-4565-a25c-894244df2d22",
      komoditas: "Bandeng Gundala",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "10",
      price: "200000",
      tgl_parsed: "2021-01-16T17:02:46.815Z",
      timestamp: "1610816566815",
    },
    {
      uuid: "f950c3ac-19cf-4c71-b17f-e0287f72df39",
      komoditas: "Komoditas Sapi",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "50",
      price: "2010210",
      tgl_parsed: "2021-08-03T12:22:17.844Z",
      timestamp: "1627993337844",
    },
    {
      uuid: "d1d8684e-700d-434d-bb77-d896cd4f5785",
      komoditas: "Ikan Keren",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "130",
      price: "210210",
      tgl_parsed: "2021-01-17T02:41:47.779Z",
      timestamp: "1610851307779",
    },
    {
      uuid: "241e7f13-6e53-4977-96e9-0fcb3c475f33",
      komoditas: "Ikan",
      area_provinsi: "JAWA BARAT",
      area_kota: "BANDUNG",
      size: "40",
      price: "210210",
      tgl_parsed: "2021-01-21T09:13:40.993Z",
      timestamp: "1611220420993",
    },
    {
      uuid: "e6152103-7d0e-44f0-ba1b-1ca1a0f758d5",
      komoditas: "Cupang",
      area_provinsi: "TOGO",
      area_kota: "BURKINA FASO",
      size: "69",
      price: "212212",
      tgl_parsed: "2021-01-18T02:45:03.614Z",
      timestamp: "1610937903614",
    },
  ]);

  const data = useMemo(() => dataList, [dataList]);
  const columns = useMemo(
    () => [
      {
        Header: "Komoditas",
        accessor: "komoditas",
      },
      {
        Header: "Harga",
        accessor: (d) => toCurrency(d.price),
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
        accessor: (d) => toDateFormat(d.tgl_parsed),
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
      </div>
    </div>
  );
};

export default Main;
