import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';

export const setCatList = (cartList) => {
  return {
    type: actionTypes.GET_CART,
    data: cartList,
  };
};
export const setCartItem = (cartItem) => {
  return {
    type: actionTypes.ADD_TO_CART,
    data: cartItem,
  };
};

//

export const getCartList = () => {
  return (dispatch) => {
    axios
      .get('/products/v1/cart', {
        headers: {
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

export const addToCart = (cartItem) => {
  return (dispatch) => {
    console.log(JSON.stringify(cartItem));
    var config = {
      method: 'post',
      url: '/products/v1/cart',
      headers: {
        'Content-Type': 'application/json',
        'X-Currency': 'INR',
      },
      data: cartItem,
    };

    axios(config)
      .then((response) => {
        if (response.data.status) {
          console.log(response);
        } else {
          console.log('error', response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
