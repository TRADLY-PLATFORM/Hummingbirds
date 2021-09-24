import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: false,
  message: null,
  payment_methods: [],
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

const PaymentReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_PAYMENT_METHOD:
      return setPaymentMethods(state, action);

    
    default:
      return state;
  }
};

export default PaymentReducer;
