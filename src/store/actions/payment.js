import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';
import PickupAddress from '../../containers/StoreOrders/PickupAddress';
import { updateOrderDetails } from './order';

export const connectStripe = () => {
  return (dispatch) => {
    var config = {
      method: 'get',
      url: '/v1/payments/stripe/connect/oauth',
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// start Loading
export const startLoading = () => {
  return {
    type: actionTypes.START_PAYMENT_LOADING,
  };
};

// set Shipping Method

export const setShippingMethod = (data) => {
  return {
    type: actionTypes.SET_SHIPPING_METHOD,
    shipping_methods: data,
  };
};

export const getShippingMethod = () => {
  return (dispatch) => {
    axios
      .get('v1/tenants/shipping_methods')
      .then((response) => {
        if (response.data.status) {
          dispatch(setShippingMethod(response.data.data.shipping_methods));
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Set Payment Method
export const setPaymentMethod = (data) => {
  return {
    type: actionTypes.SET_PAYMENT_METHOD,
    payment_methods: data,
  };
};

export const getPaymentMethods = () => {
  return (dispatch) => {
    axios
      .get('v1/tenants/payment_methods')
      .then((response) => {
        if (response.data.status) {
          dispatch(setPaymentMethod(response.data.data.payment_methods));
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// Add Address
export const setAddress = (data) => {
  return {
    type: actionTypes.ADD_ADDRESS,
    address: data,
  };
};

export const addAddress = (data, changePickupAddress,orderID, store_id) => {
  return (dispatch) => {
    const url = 'v1/addresses';
    var config = {
      method: 'post',
      url: url,
      data: data,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(setAddress(response.data.data));
          if (changePickupAddress) {
            dispatch(updateOrderDetails(orderID,response.data.data.address.id, store_id));
          }
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// change Address
export const changeAddress = (data ,id) => {
  return (dispatch) => {
    const url = 'v1/addresses/'+id;
    var config = {
      method: 'put',
      url: url,
      data: data,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(setAddress(response.data.data));
           
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// Get Address
export const setgetAddress = (data) => {
  return {
    type: actionTypes.GET_ADDRESS,
    addressList: data,
  };
};

export const getAddress = (type) => {
  return (dispatch) => {
    const url = 'v1/addresses/?type=' + type;
    var config = {
      method: 'get',
      url: url,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(setgetAddress(response.data.data.addresses));
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Checkout

export const checkoutSuccess = (data, callback) => {
  return {
    type: actionTypes.CHECKOUT,
  };
};

export const clickCheckout = (data, callback, type) => {
  return (dispatch) => {
    dispatch(startLoading());
    const url = 'products/v1/cart/checkout';
    var config = {
      method: 'post',
      url: url,
      data: data,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          if (type === 'stripe') {
            dispatch(callPaymentIntent(response.data.data.order_reference, callback));
           } else {
            dispatch(checkoutSuccess());
            callback()
           }
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// call EPHEMERAL_KEY

export const setEphemeralKey = (data) => {
  return {
    type: actionTypes.EPHEMERAL_KEY,
    data: data,
  };
};

export const callEphemeralKey = () => {
  return (dispatch) => {
    dispatch(startLoading());
    const url = 'app/v1/payments/stripe/ephemeralKey';
    var config = {
      method: 'post',
      url: url,
      data: { api_version: '2019-09-09' },
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(setEphemeralKey(response.data.data));
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// call payment Intent

export const setPaymentIntent = (data) => {
  return {
    type: actionTypes.PAYMENT_INTENT,
    data: data,
  };
};

export const callPaymentIntent = (key, callback) => {
  return (dispatch) => {
    dispatch(startLoading());
    const url = 'app/v1/payments/stripe/paymentIntent';
    var config = {
      method: 'post',
      url: url,
      data: { order_reference: key },
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(setPaymentIntent(response.data.data));
          callback ();
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
