import { filterProduct } from "../utils/helper";
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

const initState = {
  isLoading: false,
  isLoadingButton: false,
  isLoadingComponent: false,
  listProduct: [],
  listArea: [],
  listSize: [],
  error: null,
  isRequestSuccess: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        listProduct: action.payload,
        isLoading: false,
      };

    case GET_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_AREA_REQUEST:
      return {
        ...state,
        isLoadingComponent: true,
      };

    case GET_AREA_SUCCESS:
      return {
        ...state,
        isLoadingComponent: false,
        listArea: action.payload,
      };

    case GET_AREA_ERROR:
      return {
        ...state,
        isLoadingComponent: false,
        error: action.payload,
      };

    case GET_SIZE_REQUEST:
      return {
        ...state,
        isLoadingComponent: true,
      };

    case GET_SIZE_SUCCESS:
      return {
        ...state,
        isLoadingComponent: false,
        listSize: action.payload,
      };

    case GET_SIZE_ERROR:
      return {
        ...state,
        isLoadingComponent: false,
        error: action.payload,
      };

    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingButton: true,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoadingButton: false,
        isRequestSuccess: true,
      };

    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingButton: false,
        error: action.payload,
      };

    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingButton: true,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoadingButton: false,
        isRequestSuccess: true,
      };

    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingButton: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingButton: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isRequestSuccess: true,
        isLoadingButton: false,
      };

    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingButton: false,
        error: action.payload,
      };

    case REQUEST_ERROR: {
      return {
        ...state,
        isRequestSuccess: null,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
