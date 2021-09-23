import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: false,
  message: null,
  payment_methods: [],
  shipping_methods: [],
  address_list:[]
};

const setLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setPaymentMethods = (state, action) => {
  console.log(state, action);
  return updateObject(state, {
    error: false,
    payment_methods: action.payment_methods,
    loading: false,
  });
};

const setAddressList = (state, action) => {
  console.log(state, action);
  return updateObject(state, {
    error: false,
    address_list: action.addressList,
    loading: false,
  });
};

const setShippingMethods = (state, action) => {
  console.log(state, action);
  return updateObject(state, {
    error: false,
    shipping_methods: action.shipping_methods,
    loading: false,
  });
};


const checkoutSuccess = (state, action) => {
  console.log(state, action);
  return updateObject(state, {
     loading: false,
  });
};



const PaymentReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.START_PAYMENT_LOADING:
      return setLoading(state, action);

    case actionTypes.GET_ADDRESS:
      return setAddressList(state, action);

    case actionTypes.SET_PAYMENT_METHOD:
      return setPaymentMethods(state, action);
    case actionTypes.SET_SHIPPING_METHOD:
      return setShippingMethods(state, action);

    case actionTypes.CHECKOUT:
      return checkoutSuccess(state, action);

    default:
      return state;
  }
};

export default PaymentReducer;
