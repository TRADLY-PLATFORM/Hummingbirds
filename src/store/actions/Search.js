import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setSearchList = (list) => {
  return {
    type: actionTypes.SET_SEARCH,
    searchList: list,
  };
};
export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const getSearchingResult = (key) => {
  return (dispatch) => {
     dispatch(startLoading());
    axios
      .get('/products/v1/listings?page=1&search_key='+ key)
      .then((response) => {
        if (response.data.status) {
           
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


