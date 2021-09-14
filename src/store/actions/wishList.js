import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setWishList = (list) => {
  return {
    type: actionTypes.GET_WISH_LIST,
    wishList: list,
  };
};
export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const getWishlist = () => {
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .get('/products/v1/listings/likes?page=1&per_page=30')
      .then((response) => {
        if (response.data.status) {
          dispatch(setWishList(response.data.data.listings));
          console.log(response);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
