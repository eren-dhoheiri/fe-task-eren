import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
} from "./constants";

const initState = {
  isLoading: false,
  isLoadingButton: false,
  isLoadingComponent: false,
  listProduct: [],
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

    default:
      return state;
  }
};

export default reducer;
