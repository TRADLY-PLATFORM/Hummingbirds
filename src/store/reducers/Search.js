import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: false,
  message: null,
  searchList: [],
};
const setLoading=(state, action) => {
  return updateObject(state, {
    loading: true,
    });
}

const setSearchList = (state, action) => {
  console.log(state, action);
  return updateObject(state, {
    error: false,
    searchList: action.searchList.listings,
    loading: false,
  });
};

const SearchReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.START_LOADING:
      return setLoading(state, action);
    
    case actionTypes.SET_SEARCH:
      return setSearchList(state, action);

    default:
      return state;
  }
};

export default SearchReducer;
