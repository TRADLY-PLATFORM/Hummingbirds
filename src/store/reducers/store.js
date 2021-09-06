import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  storeDetails: {},
  storeLists: [],
  storesLists: [],
  addresses: [],
  categories: [],
  attribute:null,
  file:[],
  error: false,
  message: null,

};



const initStoreDetails = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const setLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const errorMessage = (state, action) => {
  return updateObject(state, {
    loading: false,
    message:action.msg
  });
};

const setStoreDetails = (state, action) => {
  return updateObject(state, {
    storeDetails: action.storeDetails,
    loading: false,
    error: false,
    message: null,
  });
};

const fetchStoreDetailsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true, message: 'Could not fetch result.' });
};

const initStoreLists = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const setStoreLists = (state, action) => {
  return updateObject(state, {
    storeLists: action.storeLists,
    loading: false,
    error: false,
    message: null,
  });
};
const setStoresLists = (state, action) => {
  return updateObject(state, {
    storesLists: action.storesData,
    loading: false,
    error: false,
    message: null,
  });
};

const fetchStoreListsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true, message: 'Could not fetch result.' });
};


const initCreateStore = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const initSearch = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

 const setSearchAddresses = (state, action) => {
  return updateObject(state, {
    addresses: action.addresses,
    loading:false,
  });
};

const createStoreFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const createStoreSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const postStoreFollowRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const postStoreFollowFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const postStoreFollowSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};
const setCategories = (state, action) => {
  return updateObject(state, {
    categories: action.categories,
    loading: false,
  });
};


const setFile = (state, action) => {
  return updateObject(state, {
    file: action.filesURL,
    message:null ,
  });
};
const setAttribute = (state, action) => {
  return updateObject(state, {
    attribute: action.attribute,
   });
};

const storeReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.ERROR_MESSAGE:
      return errorMessage(state, action);

    case actionTypes.START_LOADING:
      return setLoading(state, action);

    case actionTypes.INIT_STORE_DETAILS:
      return initStoreDetails(state, action);
    case actionTypes.SET_STORE_DETAILS:
      return setStoreDetails(state, action);
    case actionTypes.FETCH_STORE_DETAILS_FAILED:
      return fetchStoreDetailsFailed(state, action);

    case actionTypes.INIT_STORE_LISTS:
      return initStoreLists(state, action);
    case actionTypes.SET_STORE_LISTS:
      return setStoreLists(state, action);
    case actionTypes.FETCH_STORE_LISTS_FAILED:
      return fetchStoreListsFailed(state, action);

    case actionTypes.INIT_CREATE_STORE:
      return initCreateStore(state, action);
    case actionTypes.CREATE_STORE_FAILED:
      return createStoreFailed(state, action);
    case actionTypes.CREATE_STORE_SUCCESS:
      return createStoreSuccess(state, action);

    case actionTypes.POST_STORE_FOLLOW_REQUEST:
      return postStoreFollowRequest(state, action);
    case actionTypes.POST_STORE_FOLLOW_SUCCESS:
      return postStoreFollowSuccess(state, action);
    case actionTypes.POST_STORE_FOLLOW_FAILED:
      return postStoreFollowFailed(state, action);

    case actionTypes.SET_ALL_STORES:
      return setStoresLists(state, action);

    case actionTypes.START_SEARCHING:
      return initSearch(state, action);
    case actionTypes.ADDRESS_SEARCH:
      return setSearchAddresses(state, action);

    case actionTypes.SET_ACCOUNTS_CATEGORIES:
      return setCategories(state, action);

    case actionTypes.SET_IMAGE_FILE:
      return setFile(state, action);

    case actionTypes.SET_ATTRIBUTE:
      return setAttribute(state, action);

    default:
      return state;
  }
};

export default storeReducer;
