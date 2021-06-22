import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  productDetails: [],
  error: false,
  message: null,
  listings: [],
  categoryLists: [],
  supplierLists: [],
  page: 1,
  total_records: 0,
};

const initProductDetails = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setProductDetails = (state, action) => {
  return updateObject(state, {
    productDetails: action.productDetails,
    loading: false,
    error: false,
    message: null,
  });
};

const fetchProductDetailsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true, message: 'Could not fetch result.' });
};

const initListings = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setListings = (state, action) => {
  return updateObject(state, {
    listings: action.listings.listings,
    page: action.listings.page,
    total_records: action.listings.total_records,
    loading: false,
    error: false,
    message: null,
  });
};

const fetchListingsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true, message: 'Could not fetch result.' });
};

const startCategoryLists = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setCategoryLists = (state, action) => {
  return updateObject(state, {
    categoryLists: action.listings,
    loading: false,
    error: false,
    message: null,
  });
};

const fetchCategoryListsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true, message: 'Could not fetch result.' });
};

const startSupplierLists = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setSupplierLists = (state, action) => {
  return updateObject(state, {
    supplierLists: action.data,
    loading: false,
    error: false,
    message: null,
  });
};

const fetchSupplierListsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true, message: 'Could not fetch result.' });
};

const startProductLikeDisLike = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setProductLikeDisLike = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: false,
    message: action.message,
  });
};

const fetchProductLikeDisLike = (state, action) => {
  return updateObject(state, { loading: false, error: true, message: 'Could not fetch result.' });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PRODUCT_DETAILS:
      return initProductDetails(state, action);
    case actionTypes.SET_PRODUCT_DETAILS:
      return setProductDetails(state, action);
    case actionTypes.FETCH_PRODUCT_DETAILS_FAILED:
      return fetchProductDetailsFailed(state, action);
    case actionTypes.INIT_LISTING:
      return initListings(state, action);
    case actionTypes.SET_LISTING:
      return setListings(state, action);
    case actionTypes.FETCH_LISTING_FAILED:
      return fetchListingsFailed(state, action);
    case actionTypes.SET_CATEGORY_LISTS:
      return setCategoryLists(state, action);
    case actionTypes.FETCH_CATEGORY_LISTS_FAILED:
      return fetchCategoryListsFailed(state, action);
    case actionTypes.INIT_CATEGORY_LISTS:
      return startCategoryLists(state, action);
    case actionTypes.SET_SUPPLIER_LISTS:
      return setSupplierLists(state, action);
    case actionTypes.FETCH_SUPPLIER_LISTS_FAILED:
      return fetchSupplierListsFailed(state, action);
    case actionTypes.INIT_SUPPLIER_LISTS:
      return startSupplierLists(state, action);
    case actionTypes.START_PRODUCT_LIKE_DISLIKE:
      return startProductLikeDisLike(state, action);
    case actionTypes.SET_PRODUCT_LIKE_DISLIKE:
      return setProductLikeDisLike(state, action);
    case actionTypes.FAILED_PRODUCT_LIKE_DISLIKE:
      return fetchProductLikeDisLike(state, action);
    default:
      return state;
  }
};

export default productReducer;
