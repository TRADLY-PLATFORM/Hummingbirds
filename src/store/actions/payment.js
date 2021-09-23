import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';

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

export const addAddress = (data) => {
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
    const url = 'v1/addresses/?type='+type;
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

export const clickCheckout = (data, callback) => {
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
          dispatch(checkoutSuccess());
          callback();

        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

