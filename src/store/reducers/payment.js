import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: false,
  message: null,
  payment_methods: [],
  shipping_methods: [],
  address_list: [],
  ephemeral_key: {},
  paymentIntent: {},
  stripeConnect: {},
  logInLink:''
};

const setLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setPaymentMethods = (state, action) => {
   return updateObject(state, {
    error: false,
    payment_methods: action.payment_methods,
    loading: false,
  });
};

const setAddressList = (state, action) => {
   return updateObject(state, {
    error: false,
    address_list: action.addressList,
    loading: false,
  });
};

const setShippingMethods = (state, action) => {
   return updateObject(state, {
    error: false,
    shipping_methods: action.shipping_methods,
    loading: false,
  });
};

const setEphemeralKey = (state, action) => {
   return updateObject(state, {
    error: false,
    loading: false,
    ephemeral_key: action.data,
  });
};
const setPaymentIntent = (state, action) => {
   return updateObject(state, {
    error: false,
    loading: false,
    paymentIntent: action.data,
  });
};


const checkoutSuccess = (state, action) => {
   return updateObject(state, {
     loading: false,
  });
};

const setStripeConnect = (state, action) => {
   return updateObject(state, {
    loading: false,
    stripeConnect: action.stripeConnect,
  });
};

const setLoginLink = (state, action) => {
   return updateObject(state, {
    loading: false,
    logInLink: action.expressLogin,
  });
};



const PaymentReducer = (state = initialState, action) => {
   switch (action.type) {
    case actionTypes.START_PAYMENT_LOADING:
      return setLoading(state, action);

    case actionTypes.GET_ADDRESS:
      return setAddressList(state, action);

    case actionTypes.SET_PAYMENT_METHOD:
      return setPaymentMethods(state, action);
    case actionTypes.SET_SHIPPING_METHOD:
      return setShippingMethods(state, action);
    case actionTypes.EPHEMERAL_KEY:
      return setEphemeralKey(state, action);
    case actionTypes.PAYMENT_INTENT:
      return setPaymentIntent(state, action);
    case actionTypes.STRIPE_CONNECT:
      return setStripeConnect(state, action);
    case actionTypes.CREATE_EXPRESS_LOGIN:
      return setLoginLink(state, action);

    case actionTypes.CHECKOUT:
      return checkoutSuccess(state, action);

    default:
      return state;
  }
};

export default PaymentReducer;
