import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';

export const setCatList = (cartList) => {
  return {
    type: actionTypes.GET_CART,
    storeDetails: cartList,
  };
};

export const getCartList = (authKey) => {
  return (dispatch) => {
    axios
      .get('/products/v1/cart', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tenant_key') ?? ACCESS_TOKEN,
          'X-Auth_key': authKey,
          'X-Currency': 'MYR',
        },
      })
      .then((response) => {
        if (response.data.status) {
          console.log(response);
        } else {
          console.log('error', response);
        }
      });
  };
};
