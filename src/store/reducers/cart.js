import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: false,
  message: null,
  cart_list: [],
};


const setLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setMessage = (state, action) => {
  return updateObject(state, {
    loading: false,
    error:true,
    message: action.msg,
  });
};

const addToCart = (state, action) => {
   return updateObject(state, {
    error: false,
    // loading: false,
  });
};
const setCartlist = (state, action) => {
   return updateObject(state, {
    cart_list: action.cart_list,
    loading: false,
    error: false,
  });
};

const CartReducer = (state = initialState, action) => {
   switch (action.type) {
    case actionTypes.CART_LOADING:
      return setLoading(state, action);
    case actionTypes.ERROR_MESSAGE:
      return setMessage(state, action);

    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.GET_CART:
      return setCartlist(state, action);

    default:
      return state;
  }
};

export default CartReducer;
