import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';

export const setStoreDetails = (storeDetails) => {
  return {
    type: actionTypes.SET_STORE_DETAILS,
    storeDetails: storeDetails,
  };
};

export const fetchStoreDetailsFailed = () => {
  return {
    type: actionTypes.FETCH_STORE_DETAILS_FAILED,
  };
};

export const startStoreDetails = () => {
  return {
    type: actionTypes.INIT_STORE_DETAILS,
  };
};

export const initStoreDetails = (id) => {
  return (dispatch) => {
    axios
      .get('/v1/accounts/' + id)
      .then((response) => {
        if (response.data.status) {
          dispatch(setStoreDetails(response.data.data.account));
        } else {
          dispatch(fetchStoreDetailsFailed());
        }
      })
      .catch((error) => {
        dispatch(fetchStoreDetailsFailed());
      });
  };
};

export const setStoreLists = (storeLists) => {
  return {
    type: actionTypes.SET_STORE_LISTS,
    storeLists: storeLists,
  };
};

export const fetchStoreListsFailed = () => {
  return {
    type: actionTypes.FETCH_STORE_LISTS_FAILED,
  };
};

export const initStoreLists = () => {
  return {
    type: actionTypes.INIT_STORE_LISTS,
  };
};

export const userStoreLists = (userId, authKey) => {
  return (dispatch) => {
    dispatch(initStoreLists());
    axios
      .get('/v1/stores?page=1&user_id=' + userId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tenant_key') ?? ACCESS_TOKEN,
          'X-Auth_key': authKey,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        if (response.data.status) {
          dispatch(setStoreLists(response.data.data.stores));
        } else {
          dispatch(fetchStoreListsFailed());
        }
      })
      .catch((error) => {
        dispatch(fetchStoreListsFailed());
      });
  };
};

export const createStoreFailed = () => {
  return {
    type: actionTypes.CREATE_STORE_FAILED,
  };
};

export const initCreateStore = () => {
  return {
    type: actionTypes.INIT_CREATE_STORE,
  };
};

export const createStoreSuccess = () => {
  return {
    type: actionTypes.CREATE_STORE_SUCCESS,
  };
};

export const CreateStore = (store, token) => {
  console.log(store);
  return (dispatch) => {
    dispatch(initCreateStore());
    axios
      .post('/v1/stores', store, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tenant_key') ?? ACCESS_TOKEN,
          'X-Auth-Key': token,
        },
      })
      .then((response) => {
        if (response.data.status) {
          dispatch(createStoreSuccess());
        } else {
          dispatch(createStoreFailed());
        }
      })
      .catch((error) => {
        dispatch(createStoreFailed());
      });
  };
};

export const postStoreFollowFailed = () => {
  return {
    type: actionTypes.POST_STORE_FOLLOW_FAILED,
  };
};

export const postStoreFollowRequest = () => {
  return {
    type: actionTypes.POST_STORE_FOLLOW_REQUEST,
  };
};

export const postStoreFollowSuccess = () => {
  return {
    type: actionTypes.POST_STORE_FOLLOW_SUCCESS,
  };
};

export const postStoreFollow = (storeId) => {
  return (dispatch) => {
    dispatch(postStoreFollowRequest());
    axios
      .post(`/v1/accounts/${storeId}/follow`, {})
      .then((response) => {
        if (response.data.status) {
          dispatch(postStoreFollowSuccess());
        } else {
          dispatch(postStoreFollowFailed());
        }
      })
      .catch((error) => {
        dispatch(postStoreFollowFailed());
      });
  };
};
