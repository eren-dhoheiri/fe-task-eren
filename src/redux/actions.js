import axios from "../utils/axios";
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_AREA_REQUEST,
  GET_AREA_SUCCESS,
  GET_AREA_ERROR,
  GET_SIZE_REQUEST,
  GET_SIZE_SUCCESS,
  GET_SIZE_ERROR,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  REQUEST_ERROR,
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

const getAreaRequest = () => {
  return { type: GET_AREA_REQUEST };
};

const getAreaSuccess = (areaList) => {
  return {
    type: GET_AREA_SUCCESS,
    payload: areaList,
  };
};

const getAreaError = (error) => {
  return {
    type: GET_AREA_ERROR,
    payload: error,
  };
};

export const getArea = () => {
  return (dispatch) => {
    dispatch(getAreaRequest());

    axios
      .get("/option_area")
      .then((response) => dispatch(getAreaSuccess(response.data)))
      .catch((error) => dispatch(getAreaError(error.response.data)));
  };
};

const getSizeRequest = () => {
  return { type: GET_SIZE_REQUEST };
};

const getSizeSuccess = (sizeList) => {
  return {
    type: GET_SIZE_SUCCESS,
    payload: sizeList,
  };
};

const getSizeError = (error) => {
  return {
    type: GET_SIZE_ERROR,
    payload: error,
  };
};

export const getSize = () => {
  return (dispatch) => {
    dispatch(getSizeRequest());

    axios
      .get("/option_size")
      .then((response) => dispatch(getSizeSuccess(response.data)))
      .catch((error) => dispatch(getSizeError(error.response.data)));
  };
};

const createProductRequest = () => {
  return { type: CREATE_PRODUCT_REQUEST };
};

const createProductSuccess = () => {
  return { type: CREATE_PRODUCT_SUCCESS };
};

const createProductError = (error) => {
  return {
    type: CREATE_PRODUCT_ERROR,
    payload: error,
  };
};

export const createProduct = (newData) => {
  return (dispatch) => {
    dispatch(createProductRequest());

    axios
      .post("/list", newData, headers)
      .then(() => dispatch(createProductSuccess()))
      .catch((error) => dispatch(createProductError(error.response.data)));
  };
};

const editProductRequest = () => {
  return { type: UPDATE_PRODUCT_REQUEST };
};

const editProductSuccess = () => {
  return { type: UPDATE_PRODUCT_SUCCESS };
};

const editProductError = (error) => {
  return {
    type: UPDATE_PRODUCT_ERROR,
    payload: error,
  };
};

export const editProduct = (updatedData) => {
  return (dispatch) => {
    dispatch(editProductRequest());

    axios
      .put("/list", updatedData, headers)
      .then(() => dispatch(editProductSuccess()))
      .catch((error) => dispatch(editProductError(error.response.data)));
  };
};

const deleteProductRequest = () => {
  return { type: DELETE_PRODUCT_REQUEST };
};

const deleteProductSuccess = () => {
  return { type: DELETE_PRODUCT_SUCCESS };
};

const deleteProductError = (error) => {
  return {
    type: DELETE_PRODUCT_ERROR,
    payload: error,
  };
};

export const deleteProduct = (deleteItem) => {
  return (dispatch) => {
    dispatch(deleteProductRequest());

    axios
      .delete("/list", { headers, data: deleteItem })
      .then(() => dispatch(deleteProductSuccess()))
      .catch((error) => dispatch(deleteProductError(error.response.data)));
  };
};

export const requestError = () => {
  return { type: REQUEST_ERROR };
};
