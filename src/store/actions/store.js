import * as actionTypes from './actionTypes';
import axios from '../../axios';

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

export const userStoreLists = (userId) => {
  return (dispatch) => {
    dispatch(initStoreLists());
    axios
      .get('/v1/accounts?page=1&type=accounts&user_id=' + userId)
      .then((response) => {
        if (response.data.status) {
          dispatch(setStoreLists(response.data.data.accounts));
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

export const CreateStore = (store, callBack) => {
  return (dispatch) => {
    dispatch(initCreateStore());
    axios
      .post('/v1/accounts', store)
      .then((response) => {
        if (response.data.status) {
          dispatch(createStoreSuccess());
          callBack && callBack();
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
