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


// Checkout

export const checkoutSuccess = (data) => {
  return {
    type: actionTypes.CHECKOUT,
   };
};

export const clickCheckout = (data) => {
  return (dispatch) => {
    const url = 'products/v1/cart/checkout';
    var config = {
      method: 'post',
      url: url,
      data: data,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          console.log('====================================');
          console.log(response);
          console.log('====================================');
         } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

