import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setSearchList = (list) => {
  return {
    type: actionTypes.SET_SEARCH,
    searchList: list,
  };
};

export const getSearchingResult = (key) => {
  return (dispatch) => {
    axios
      .get('/products/v1/listings?page=1&search_key=' + key)
      .then((response) => {
        if (response.data.status) {
          console.log('====================================');
          console.log(response);
          console.log('====================================');
          dispatch(setSearchList(response.data.data));
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
