import axios from "../utils/axios";
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
} from "./constants";

const headers = {
  headers: { "Content-Type": "application/json" },
};

const getListProductRequest = () => {
  return { type: GET_PRODUCT_REQUEST };
};

const getListProductSuccess = (listProduct) => {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload: listProduct,
  };
};

const getListProductError = (error) => {
  return {
    type: GET_PRODUCT_ERROR,
    payload: error,
  };
};

export const getListProduct = () => {
  return (dispatch) => {
    dispatch(getListProductRequest());

    axios
      .get("/list")
      .then((response) => dispatch(getListProductSuccess(response.data)))
      .catch((error) => dispatch(getListProductError(error.response.data)));
  };
};
