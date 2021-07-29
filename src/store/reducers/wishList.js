import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  productDetails: [],
  error: false,
  message: null,
  wishLists: [],
};

const setWishList = (state, action) => {
  console.log(state, action);
  return updateObject(state, {
    loading: false,
    error: false,
    wishLists: action.wishList,
  });
};

const wishListReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.GET_WISH_LIST:
      return setWishList(state, action);

    default:
      return state;
  }
};

export default wishListReducer;
