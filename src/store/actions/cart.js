import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';


// start Loading
export const startLoading = () => {
  return {
    type: actionTypes.CART_LOADING,
  };
};


// Error
export const failedMessage = (msg) => {
  return {
    type: actionTypes.ERROR_MESSAGE,
    msg: msg,
  };
};

// Add To Cart


export const setCartItem = () => {
  return {
    type: actionTypes.ADD_TO_CART,
   };
};

export const addToCart = (cartItem, currency) => {

  return (dispatch) => {
    dispatch(startLoading());

     var config = {
      method: 'post',
      url: '/products/v1/cart',
      headers: {
        'Content-Type': 'application/json',
        'X-Currency': currency.code,
      },
      data: cartItem,
    };

    axios(config)
      .then((response) => {
        if (response.data.status) {
               dispatch(setCartItem());
        } else {
          console.log('error', response);
        }
      })
      .catch((error) => {
       dispatch(failedMessage( error.response.data.error.message));       
 
      });
  };
};





//Get Cart List

export const setCartList = (cartList) => {
  return {
    type: actionTypes.GET_CART,
    cart_list: cartList,
  };
};

export const getCartList = (currency,shippingMethodId) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .get('/products/v1/cart?shipping_method_id=' + shippingMethodId, {
        headers: {
          'X-Currency': currency.code,
        },
      })
      .then((response) => {
        if (response.data.status) {
          dispatch(setCartList(response.data.data));
        } else {
          console.log('error', response);
        }
      });
  };
};


//Delete Cart  

// export const setCartList = (cartList) => {
//   return {
//     type: actionTypes.GET_CART,
//     cart_list: cartList,
//   };
// };

export const deleteCart = (data,currency,shippingMethod) => {
  return (dispatch) => {
    dispatch(startLoading());
     var config = {
       method: 'patch',
       url: '/products/v1/cart',
       headers: {
         'Content-Type': 'application/json',
        },
       data: data,
     };

    axios(config).then((response) => {
      if (response.data.status) {
          dispatch(getCartList(currency, shippingMethod));
      } else {
        console.log('error', response);
      }
    });
  };
};


