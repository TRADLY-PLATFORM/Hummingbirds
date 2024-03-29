import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: null,
  promo_banners: [],
  categories: [],
  collections: [],
  stores: {},
  products:{}
};

const initCollections = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setCollections = (state, action) => {
  return updateObject(state, {
     collections: action.collectionItems.collections,
    loading: false,
  });
};
const setCategories = (state, action) => {
  return updateObject(state, {
    categories: action.categories,
    loading: false,
  });
};
const setPromoBanners = (state, action) => {
  return updateObject(state, {
    promo_banners: action.bannersItems,
  });
};
const setStoresToFollow = (state, action) => {
  return updateObject(state, {
    stores: action.storesItems,
  });
};
const setproducts = (state, action) => {
  return updateObject(state, {
    products: action.products,
  });
};

const fetchCollectionsFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true,
    message: 'Could not fetch collecions result.',
  });
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_HOME_COLLECTIONS:
      return initCollections(state, action);
    case actionTypes.SET_HOME_COLLECTIONS:
      return setCollections(state, action);
    case actionTypes.SET_CATEGORIES:
      return setCategories(state, action);
    case actionTypes.SET_PROMO_BANNERS:
      return setPromoBanners(state, action);
    case actionTypes.SET_STORES_TO_FOLLOW:
      return setStoresToFollow(state, action);
    case actionTypes.SET_LATEST_PRODUCTS:
      return setproducts(state, action);
    case actionTypes.FETCH_COLLECTIONS_FAILED:
      return fetchCollectionsFailed(state, action);
    default:
      return state;
  }
};

export default homeReducer;
