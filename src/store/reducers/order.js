import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
   error: false,
  message: null,
  orders: [],
  order_details:null
};


const setLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setOrdersList = (state, action) => {
   return updateObject(state, {
    loading: false,
    error: false,
    orders: action.orders,
  });
};
const setOrderDetails = (state, action) => {
   return updateObject(state, {
    loading: false,
    error: false,
    order_details: action.order_details,
  });
};

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
    case actionTypes.ORDER_LOADING:
      return setLoading(state, action);

    case actionTypes.GET_ORDERS:
      return setOrdersList(state, action);
    case actionTypes.ORDER_DETAILS:
      return setOrderDetails(state, action);

    default:
      return state;
  }
};

export default orderReducer;
