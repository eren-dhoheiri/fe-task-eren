import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaTimesCircle } from "react-icons/fa";
import { Success, LoadingGif } from "../../assets";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { IoMdCloseCircle } from "react-icons/io";
import { InputField } from "..";
import { connect } from "react-redux";
import {
  createProduct,
  getSize,
  getListProduct,
  getArea,
  requestError,
} from "../../redux/actions";
import { v4 as uuid } from "uuid";

const CreateProductModal = ({
  openCreateModal,
  setOpenCreateModal,
  isRequestSuccess,
  error,
  listArea,
  listSize,
  isLoadingComponent,
  isLoadingButton,
  getListProduct,
  createProduct,
  getSize,
  getArea,
  requestError,
}) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    listArea.length === 0 && getSize();
    listSize.length === 0 && getArea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && requestError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateModal]);

  const handleChange = (e) => {
    const inputedData = { ...newData };
    inputedData[e.target.name] = e.target.value;
    setNewData(inputedData);
  };

  const errorNotif = () => {
    NotificationManager.error(
      "Tolong isi semua fied yang ada",
      "Terjadi Kesalahan",
      500
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newData.uuid = uuid();
    newData.tgl_parsed = new Date().toISOString();
    newData.timestamp = new Date().getTime();
    if (newData.area) {
      newData.area_province = newData.area.split(" - ")[0];
      newData.area_kota = newData.area.split(" - ")[1];
    }

    const { komoditas, area_kota, area_province, size, price } = newData;

    if (komoditas && area_kota && area_province && size && price) {
      createProduct([newData]);
    } else {
      errorNotif();
    }
  };

  const closeModal = () => {
    (error !== null || isRequestSuccess) && getListProduct();
    const resetData = {
      komoditas: null,
      area: null,
      size: null,
      price: null,
    };
    setNewData(resetData);
    setOpenCreateModal(false);
  };

  return (
    <Modal
      open={openCreateModal}
      onClose={closeModal}
      center
      showCloseIcon={false}
    >
      <NotificationContainer />
      <div className="modal container-modal">
        <div className="modal-title container-modal-title">
          <div className="title-text">Tambah Produk Baru</div>
          <button onClick={closeModal} className="close-modal">
            <IoMdCloseCircle size={24} />
          </button>
        </div>
        <div className="modal-body">
          {isRequestSuccess ? (
            <div className="text-wrapper">
              <img
                className="success-notif"
                src={Success}
                alt="success_add_data"
              />
              <p>Selamat Produk Anda Berhasil Ditambahkan!</p>
            </div>
          ) : error !== null ? (
            <div className="text-wrapper">
              <FaTimesCircle size={48} />
              <p>Ada Kesalahan!</p>
            </div>
          ) : (
            <div className="form">
              <InputField
                label="Komoditas*"
                type="text"
                placeholder="ex: Ikan Mujair"
                name="komoditas"
                onChange={handleChange}
              />
              <div className="select-option">
                <label htmlFor="area">Area*</label>
                <select id="area" name="area" onChange={handleChange}>
                  <option defaultChecked value="">
                    {isLoadingComponent ? "Memuat..." : "Pilih Area"}
                  </option>
                  {listArea.map((area) => (
                    <option>
                      {area.province} - {area.city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-option">
                <label htmlFor="size">Ukuran*</label>
                <select id="size" name="size" onChange={handleChange}>
                  <option defaultChecked value="">
                    {isLoadingComponent ? "Memuat..." : "Pilih Ukuran"}
                  </option>
                  {listSize.map((item) => (
                    <option>{item.size}</option>
                  ))}
                </select>
              </div>
              <InputField
                label="Harga dalam Rupiah*"
                type="number"
                placeholder="ex: 120000"
                name="price"
                onChange={handleChange}
              />
              <div className="btn-group">
                <button
                  className="confirm-edit-btn"
                  disabled={isLoadingButton}
                  onClick={handleSubmit}
                >
                  {isLoadingButton ? (
                    <img src={LoadingGif} alt="Loading..." className="load" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isRequestSuccess: state.isRequestSuccess,
    error: state.error,
    listArea: state.listArea,
    listSize: state.listSize,
    cities: state.cities,
    isLoadingComponent: state.isLoadingComponent,
    isLoadingButton: state.isLoadingButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (newData) => dispatch(createProduct(newData)),
    getListProduct: () => dispatch(getListProduct()),
    getSize: () => dispatch(getSize()),
    getArea: () => dispatch(getArea()),
    requestError: () => dispatch(requestError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductModal);
