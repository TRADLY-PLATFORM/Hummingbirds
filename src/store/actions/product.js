import * as actionTypes from './actionTypes';
import axios from '../../axios';

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

export const initListings = (count, filterValue, totalCountOfProducts) => {
  return (dispatch) => {
    dispatch(startListings());
    axios
      .get(
        '/products/v1/listings?page=1&per_page=' +
          (parseInt(count) + totalCountOfProducts) +
          filterValue
      )
      .then((response) => {
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
          dispatch(setCategoryLists(response.data?.data?.categories));
        } else {
          dispatch(fetchCategoryListsFailed());
        }
      })
      .catch((error) => {
        dispatch(fetchCategoryListsFailed());
      });
  };
};

export const setSupplierLists = (listings) => {
  return {
    type: actionTypes.SET_SUPPLIER_LISTS,
    data: listings,
  };
};

export const fetchSupplierListsFailed = () => {
  return {
    type: actionTypes.FETCH_SUPPLIER_LISTS_FAILED,
  };
};

export const startSupplierLists = () => {
  return {
    type: actionTypes.INIT_SUPPLIER_LISTS,
  };
};

export const initSupplierLists = () => {
  return (dispatch) => {
    dispatch(startSupplierLists());
    axios
      .get('/v1/accounts?page=1&type=account')
      .then((response) => {
        if (response.data.status) {
          dispatch(setSupplierLists(response.data?.data?.accounts));
        } else {
          dispatch(fetchSupplierListsFailed());
        }
      })
      .catch((error) => {
        dispatch(fetchSupplierListsFailed());
      });
  };
};

export const fetchProductLikeDisLike = (productDetails) => {
  return {
    type: actionTypes.FAILED_PRODUCT_LIKE_DISLIKE,
    productDetails: productDetails,
  };
};

export const setProductLikeDisLike = (message) => {
  return {
    type: actionTypes.SET_PRODUCT_LIKE_DISLIKE,
    message: message,
  };
};

export const startProductLikeDisLike = () => {
  return {
    type: actionTypes.START_PRODUCT_LIKE_DISLIKE,
  };
};

export const onProductLikeDisLike = (id) => {
  return (dispatch) => {
    dispatch(startProductLikeDisLike());
    axios
      .post('/products/v1/listings/' + id + '/likes')
      .then((response) => {
        console.log('response', response);
        if (response.data.status) {
          dispatch(setProductLikeDisLike('Product Liked Successfully'));
        } else {
          dispatch(fetchProductLikeDisLike());
        }
      })
      .catch((error) => {
        dispatch(fetchProductLikeDisLike());
      });
  };
};
