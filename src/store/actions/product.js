import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';

export const setProductDetails = (productDetails) => {
  return {
    type: actionTypes.SET_PRODUCT_DETAILS,
    productDetails: productDetails,
  };
};

export const fetchProductDetailsFailed = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_DETAILS_FAILED,
  };
};

export const startProductDetails = () => {
  return {
    type: actionTypes.INIT_PRODUCT_DETAILS,
  };
};

export const initProductDetails = (id) => {
  return (dispatch) => {
    dispatch(startProductDetails());
    axios
      .get('/products/v1/listings/' + id + '?locale=en')
      .then((response) => {
        if (response.data.status) {
          dispatch(setProductDetails(response.data.data));
        } else {
          dispatch(fetchProductDetailsFailed());
        }
      })
      .catch((error) => {
        dispatch(fetchProductDetailsFailed());
      });
  };
};

export const setListings = (listings) => {
  return {
    type: actionTypes.SET_LISTING,
    listings: listings,
  };
};

export const fetchListingsFailed = () => {
  return {
    type: actionTypes.FETCH_LISTING_FAILED,
  };
};

export const startListings = () => {
  return {
    type: actionTypes.INIT_LISTING,
  };
};

export const initListings = (count, filterValue) => {
  console.log(filterValue);

  return (dispatch) => {
    dispatch(startListings());
    axios
      .get('/products/v1/listings?page=1&per_page=' + (parseInt(count) + 4) + filterValue, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tenant_key') ?? ACCESS_TOKEN,
        },
      })
      .then((response) => {
        console.log('test');
        console.log(response.data.data);
        console.log('test');
        if (response.data.status) {
          dispatch(setListings(response.data.data));
        } else {
          dispatch(fetchListingsFailed());
        }
      })
      .catch((error) => {
        dispatch(fetchListingsFailed());
      });
  };
};

export const setCategoryLists = (listings) => {
  return {
    type: actionTypes.SET_CATEGORY_LISTS,
    listings: listings,
  };
};

export const fetchCategoryListsFailed = () => {
  return {
    type: actionTypes.FETCH_CATEGORY_LISTS_FAILED,
  };
};

export const startCategoryLists = () => {
  return {
    type: actionTypes.INIT_CATEGORY_LISTS,
  };
};

export const initCategoryLists = (count) => {
  return (dispatch) => {
    dispatch(startCategoryLists());
    axios
      .get('/v1/categories?parent=0&type=listings')
      .then((response) => {
        if (response.data.status) {
          dispatch(setCategoryLists(response.data.data));
        } else {
          dispatch(fetchCategoryListsFailed());
        }
      })
      .catch((error) => {
        dispatch(fetchCategoryListsFailed());
      });
  };
};
