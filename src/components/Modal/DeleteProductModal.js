import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaWindowClose, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { LoadingGif } from "../../assets";
import { connect } from "react-redux";
import {
  getListProduct,
  deleteProduct,
  requestError,
} from "../../redux/actions";

const DeleteProductModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  dataSelected,
  isLoadingButton,
  isRequestSuccess,
  error,
  getListProduct,
  deleteProduct,
  requestError,
}) => {
  const [deleteItem, setDeleteItem] = useState({});

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && requestError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDeleteModal]);

  useEffect(() => {
    setDeleteItem({ condition: { uuid: dataSelected.uuid } });
  }, [dataSelected]);

  const closeModal = () => {
    (error !== null || isRequestSuccess) && getListProduct();
    setOpenDeleteModal(false);
  };

  return (
    <Modal
      open={openDeleteModal}
      onClose={closeModal}
      center
      showCloseIcon={false}
    >
      <div className="modal delete-modal">
        <div className="modal-title delete-modal-title">
          <div className="title-text">Hapus Data</div>
          <button onClick={closeModal} className="close-modal">
            <FaWindowClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          {isRequestSuccess ? (
            <div className="text-wrapper">
              <FaCheckCircle size={48} />
              <p>Hapus Data Berhasil!</p>
            </div>
          ) : error !== null ? (
            <div className="text-wrapper">
              <FaTimesCircle size={48} />
              <p>Terjadi Kesalahan!</p>
            </div>
          ) : (
            <>
              <div className="text-wrapper">
                <div className="delete-notif">
                  Apakah Anda sudah yakin akan menghapus produk
                  <br />
                  <br />
                  <b>
                    {dataSelected.komoditas} dari {dataSelected.area_kota} -{" "}
                    {dataSelected.area_provinsi}
                  </b>{" "}
                  ?
                </div>
              </div>
              <div className="btn-group">
                <button
                  className="cancel-delete-btn"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  Kembali
                </button>
                <button
                  className="confirm-delete-btn"
                  disabled={isLoadingButton}
                  onClick={() => deleteProduct(deleteItem)}
                >
                  {isLoadingButton ? (
                    <img src={LoadingGif} alt="Loading..." className="load" />
                  ) : (
                    "Hapus"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoadingButton: state.isLoadingButton,
    isRequestSuccess: state.isRequestSuccess,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListProduct: () => dispatch(getListProduct()),
    deleteProduct: (item) => dispatch(deleteProduct(item)),
    requestError: () => dispatch(requestError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProductModal);
