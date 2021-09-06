import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';


export const  failedMessage = (msg) => {
  return {
    type: actionTypes.ERROR_MESSAGE,
    msg: msg,
  }; 
}
export const  startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
   }; 
}
 

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
export const setAllStores = (stores) => {
  return {
    type: actionTypes.SET_ALL_STORES,
    storesData: stores,
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
          console.log(response.data.data);
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
    var config = {
      method: 'post',
      url: '/v1/accounts',
      headers: {
        'Content-Type': 'application/json',
      },
      data: store,
    };

    axios(config)
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

export const postStoreFollow = (storeId, IsFollowing) => {
  return (dispatch) => {
    dispatch(postStoreFollowRequest());
    if (IsFollowing === false) {
      axios
        .post(`/v1/accounts/${storeId}/follow`)
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            dispatch(postStoreFollowSuccess());
          } else {
            dispatch(postStoreFollowFailed());
          }
        })
        .catch((error) => {
          dispatch(postStoreFollowFailed());
        });
    } else {
      axios
        .delete(`/v1/accounts/${storeId}/follow`)
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            dispatch(postStoreFollowSuccess());
          } else {
            dispatch(postStoreFollowFailed());
          }
        })
        .catch((error) => {
          dispatch(postStoreFollowFailed());
        });
    }
  };
};

export const getStores = () => {
  return (dispatch) => {
    dispatch(initStoreLists());
    axios
      .get('v1/accounts?page=1&type=accounts')
      .then((response) => {
        if (response.data.status) {
          let stores = response.data.data.accounts;
          console.log(stores);
          dispatch(setAllStores(response.data.data.accounts));
        } else {
          dispatch(fetchStoreListsFailed());
        }
      })
      .catch((error) => {
        dispatch(fetchStoreListsFailed());
      });
  };
};

// Address Search
export const startSearching = () => {
  return {
    type: actionTypes.START_SEARCHING,
  };
};

export const setAddress = (address) => {
  return {
    type: actionTypes.ADDRESS_SEARCH,
    addresses: address,
  };
};

export const addressSearch = (key) => {
  return (dispatch) => {
    dispatch(startSearching());

    axios
      .get('app/v1/addresses/search?key=' + key)
      .then((response) => {
        if (response.data.status) {
          dispatch(setAddress(response.data.data.addresses));
          console.log(response);
        } else {
          dispatch(setAddress(''));
        }
      })
      .catch((error) => {
        dispatch(setAddress(''));
      });
  };
};

// Set categories

export const setCategories = (categories) => {
  return {
    type: actionTypes.SET_ACCOUNTS_CATEGORIES,
    categories: categories,
  };
};

export const accountCategories = () => {
  return (dispatch) => {
    axios('v1/categories?parent=0&type=accounts')
      .then((response) => {
        if (response.data.status) {
          console.log(response);

          dispatch(setCategories(response.data.data.categories));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Image File Post

export const SetFiles = (file) => {
  return {
    type: actionTypes.SET_IMAGE_FILE,
    filesURL: file,
  };
};

export const initFile = (
  fileName,
  contentType,
  name,
  categoryId,
  description,
  coordinates,
  base64,
  callBack
) => {
  return (dispatch) => {
    dispatch(startLoading());
    var config = {
      method: 'post',
      url: 'v1/utils/S3signedUploadURL',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        files: [
          {
            name: fileName,
            type: contentType,
          },
        ],
      }),
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          console.log(response);
          dispatch(SetFiles(response.data.data.result[0]));
          const fileURL = response.data.data.result[0];
          const path = fileURL.signedUrl;
          const ImagePath = fileURL.fileUri;
          fetch(base64.file).then(async (res) => {
            console.log(res);
            fetch(path, {
              method: 'put',
              headers: {
                ContentType: contentType,
              },
              body: await res.blob(),
            })
              .then((res) => {
                if (res.status) {
                  console.log(res);
                  
                  const stores = {
                    account: {
                      name: name,
                      category_id: [categoryId],
                      description: description,
                      web_address: '',
                      image_path: ImagePath,
                      coordinates: coordinates,
                      type: 'accounts',
                    },
                  };

                  console.log(stores);

                  dispatch(CreateStore(stores,callBack));
                }
              })
              .catch((error) => {
                console.log('Error:' + error.message);
                dispatch(failedMessage('Some problem occurred in image upload. Please try again later.'))
              }); 
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Getting Attribute

export const setAttribute = (attribute) => {
  return {
    type: actionTypes.SET_ATTRIBUTE,
    attribute: attribute,
  };
};

export const initAttribute = (categoryID) => {
  return (dispatch) => {
    var config = {
      method: 'get',
      url: `/v1/attributes/?category_id=${categoryID}&type=accounts`,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          console.log(response);
          dispatch(setAttribute(response.data.data.attributes));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
