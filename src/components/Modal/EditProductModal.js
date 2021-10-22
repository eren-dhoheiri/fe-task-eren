import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaTimesCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { Success, LoadingGif } from "../../assets";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { connect } from "react-redux";
import { InputField } from "..";
import {
  editProduct,
  getArea,
  getListProduct,
  getSize,
  requestError,
} from "../../redux/actions";

const EditProductModal = ({
  openEditModal,
  setOpenEditModal,
  dataSelected,
  isRequestSuccess,
  error,
  listArea,
  listSize,
  isLoadingComponent,
  isLoadingButton,
  getListProduct,
  editProduct,
  getArea,
  getSize,
  requestError,
}) => {
  const [editedData, setEditedData] = useState([
    {
      uuid: "",
      komoditas: "",
      area_provinsi: "",
      area_kota: "",
      size: "",
      price: "",
      tgl_parsed: "",
      timestamp: "",
    },
  ]);
  const [submitData] = useState({
    condition: {
      uuid: "",
    },
    set: {},
  });

  useEffect(() => {
    listArea.length === 0 && getArea();
    listSize.length === 0 && getSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEditedData(dataSelected);
  }, [dataSelected]);

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && requestError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditModal]);

  const handleChange = (e) => {
    const inputedData = { ...editedData };
    inputedData[e.target.name] = e.target.value;
    setEditedData(inputedData);
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
    editedData.tgl_parsed = new Date().toISOString();
    editedData.timestamp = new Date().getTime();
    submitData.condition.uuid = dataSelected.uuid;
    if (submitData.set.area) {
      submitData.set.area_provinsi = submitData.set.area.split(" - ")[0];
      submitData.set.area_kota = submitData.set.area.split(" - ")[1];
    }
    submitData.set = editedData;
    const { komoditas, area_kota, area_provinsi, size, price } = submitData.set;

    if (komoditas && area_kota && area_provinsi && size && price) {
      editProduct(submitData);
    } else {
      errorNotif();
    }
  };

  const closeModal = () => {
    (error !== null || isRequestSuccess) && getListProduct();
    setOpenEditModal(false);
    setEditedData(dataSelected);
  };
  return (
    <Modal
      open={openEditModal}
      onClose={closeModal}
      center
      showCloseIcon={false}
    >
      <NotificationContainer />
      <div className="modal container-modal">
        <div className="modal-title container-modal-title">
          <div className="title-text">Ubah Data Produk</div>
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
              <p>Selamat Produk Anda Berhasil DiUbah!</p>
            </div>
          ) : error !== null ? (
            <div className="text-wrapper">
              <FaTimesCircle size={48} />
              <p>Terjadi Kesalahan!</p>
            </div>
          ) : (
            <form>
              <InputField
                label="Komoditas"
                type="text"
                placeholder="Masukan Komoditas"
                name="komoditas"
                onChange={handleChange}
                value={editedData.komoditas}
              />
              <div className="select-option">
                <label htmlFor="area">Area</label>
                <select id="area" name="area" onChange={handleChange}>
                  <option
                    defaultChecked
                    value={
                      editedData.area_provinsi + " - " + editedData.area_kota
                    }
                  >
                    {isLoadingComponent
                      ? "Memuat..."
                      : editedData.area_provinsi + " - " + editedData.area_kota}
                  </option>
                  {listArea.map((area) => (
                    <option>
                      {" "}
                      {area.province} - {area.city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-option">
                <label htmlFor="size">Ukuran</label>
                <select id="size" name="size" onChange={handleChange}>
                  <option defaultChecked value={editedData.size}>
                    {isLoadingComponent ? "Memuat..." : editedData.size}
                  </option>
                  {listSize.map((item) => (
                    <option>{item.size}</option>
                  ))}
                </select>
              </div>
              <InputField
                label="Harga dalam Rupiah"
                type="number"
                placeholder="Masukan Harga"
                name="price"
                onChange={handleChange}
                value={editedData.price}
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
                    "Edit"
                  )}
                </button>
              </div>
            </form>
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
    isLoadingComponent: state.isLoadingComponent,
    isLoadingButton: state.isLoadingButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (newData) => dispatch(editProduct(newData)),
    getListProduct: () => dispatch(getListProduct()),
    getArea: () => dispatch(getArea()),
    getSize: () => dispatch(getSize()),
    requestError: () => dispatch(requestError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);
