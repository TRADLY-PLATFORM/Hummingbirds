import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: false,
  message: null,
  searchList: [],
};

const setSearchList = (state, action) => {
  console.log(state, action);
  return updateObject(state, {
    loading: false,
    error: false,
    searchList: action.searchList.listings,
  });
};

const SearchReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_SEARCH:
      return setSearchList(state, action);

    default:
      return state;
  }
};

export default SearchReducer;
