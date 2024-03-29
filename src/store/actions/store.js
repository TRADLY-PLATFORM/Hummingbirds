/* eslint-disable no-loop-func */
import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';

export const failedMessage = (msg) => {
  return {
    type: actionTypes.ERROR_MESSAGE,
    msg: msg,
  };
};
export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

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

// Create Store
export const createStoreFailed = (msg) => {
  return {
    type: actionTypes.CREATE_STORE_FAILED,
    message: msg,
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
          dispatch(createStoreFailed(response.data.error.message));
        }
      })
      .catch((error) => {
        dispatch(createStoreFailed(error.response.data.error.message));
      });
  };
};

// Image File Post for Create store

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
  file,
  attributeData,
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
      data: {
        files: [
          {
            name: fileName,
            type: contentType,
          },
        ],
      },
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(SetFiles(response.data.data.result[0]));
          const fileURL = response.data.data.result[0];
          const path = fileURL.signedUrl;
          const ImagePath = fileURL.fileUri;
          fetch(path, {
            method: 'put',
            headers: {
              ContentType: contentType,
            },
            body: file,
          })
            .then((res) => {
              if (res.status) {
                if (attributeData !== null) {
                  const check = attributeData.find((attr) => attr.uploadFile);
                  if (check === undefined) {
                    let stores = {
                      account: {
                        name: name,
                        category_id: [categoryId],
                        description: description,
                        web_address: '',
                        images: [ImagePath],
                        coordinates: coordinates,
                        attributes: attributeData,
                        type: 'accounts',
                      },
                    };
                    dispatch(CreateStore(stores, callBack));
                  } else {
                    let imageUploadConfig = {
                      method: 'post',
                      url: 'v1/utils/S3signedUploadURL',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      data: {
                        files: [
                          {
                            name: check.values[0].name,
                            type: check.values[0].type,
                          },
                        ],
                      },
                    };

                    axios(imageUploadConfig).then((response) => {
                      if (response.data.status) {
                        const fileURL = response.data.data.result[0];
                        const path = fileURL.signedUrl;
                        const ImagePath2 = fileURL.fileUri;
                        fetch(path, {
                          method: 'put',
                          headers: {
                            ContentType: check.values[0].type,
                          },
                          body: check.values[0],
                        })
                          .then((res) => {
                            const filter = attributeData.filter((attr) => !attr.uploadFile);
                            const attributeUpdate = [
                              ...filter,
                              { values: [ImagePath2], id: check.id },
                            ];
                            let stores = {
                              account: {
                                name: name,
                                category_id: [categoryId],
                                description: description,
                                web_address: '',
                                images: [ImagePath],
                                coordinates: coordinates,
                                attributes: attributeUpdate,
                                type: 'accounts',
                              },
                            };
                            dispatch(CreateStore(stores, callBack));
                          })
                          .catch((error) => {
                            console.log('Error:' + error.message);
                          });
                      }
                    });
                  }
                } else {
                  let stores = {
                    account: {
                      name: name,
                      category_id: [categoryId],
                      description: description,
                      web_address: '',
                      images: [ImagePath],
                      coordinates: coordinates,
                      type: 'accounts',
                    },
                  };
                  dispatch(CreateStore(stores, callBack));
                }
              }
            })
            .catch((error) => {
              console.log('Error:' + error.message);
              dispatch(failedMessage(error.response.data.error.message));
            });
        }
      })
      .catch((error) => {
        dispatch(failedMessage(error.response.data.error.message));
      });
  };
};

// Edit Store
export const editStore = (
  file,
  image,
  name,
  categoryId,
  description,
  coordinates,
  attributeData,
  accountId,
  callBack
) => {
  return (dispatch) => {
    dispatch(startLoading());

    if (file !== null) {
      let imageUploadConfig = {
        method: 'post',
        url: 'v1/utils/S3signedUploadURL',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          files: [
            {
              name: file.name,
              type: file.type,
            },
          ],
        },
      };
      axios(imageUploadConfig)
        .then((response) => {
          if (response.data.status) {
            dispatch(SetFiles(response.data.data.result[0]));
            const fileURL = response.data.data.result[0];
            const path = fileURL.signedUrl;
            const ImagePath = fileURL.fileUri;
            fetch(path, {
              method: 'put',
              headers: {
                ContentType: file.type,
              },
              body: file,
            })
              .then((res) => {
                if (res.status) {
                  if (attributeData !== null) {
                    const check = attributeData.find((attr) => attr.uploadFile);
                    if (check === undefined) {
                      const data = {
                        account: {
                          name: name,
                          category_id: [categoryId],
                          description: description,
                          web_address: '',
                          images: [ImagePath],
                          coordinates: coordinates,
                          attributes: attributeData,
                          type: 'accounts',
                        },
                      };
                      var editStoreConfig = {
                        method: 'put',
                        url: `v1/accounts/${accountId}`,
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        data: data,
                      };
                      axios(editStoreConfig)
                        .then((response) => {
                          if (response.data.status) {
                            dispatch(createStoreSuccess());
                            callBack && callBack();
                          } else {
                            dispatch(createStoreFailed(response.data.error.message));
                          }
                        })
                        .catch((error) => {
                          dispatch(createStoreFailed(error.response.data.error.message));
                        });
                    } else {
                      var imageUploadConfig = {
                        method: 'post',
                        url: 'v1/utils/S3signedUploadURL',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        data: {
                          files: [
                            {
                              name: check.values[0].name,
                              type: check.values[0].type,
                            },
                          ],
                        },
                      };

                      axios(imageUploadConfig).then((response) => {
                        if (response.data.status) {
                          const fileURL = response.data.data.result[0];
                          const path = fileURL.signedUrl;
                          const ImagePath2 = fileURL.fileUri;
                          fetch(path, {
                            method: 'put',
                            headers: {
                              ContentType: check.values[0].type,
                            },
                            body: check.values[0],
                          })
                            .then((res) => {
                              const filter = attributeData.filter((attr) => !attr.uploadFile);
                              const attributeUpdate = [
                                ...filter,
                                { values: [ImagePath2], id: check.id },
                              ];
                              const data = {
                                account: {
                                  name: name,
                                  category_id: [categoryId],
                                  description: description,
                                  web_address: '',
                                  images: [ImagePath],
                                  coordinates: coordinates,
                                  attributes: attributeUpdate,
                                  type: 'accounts',
                                },
                              };
                              var editStoreConfig = {
                                method: 'put',
                                url: `v1/accounts/${accountId}`,
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                data: data,
                              };
                              axios(editStoreConfig)
                                .then((response) => {
                                  if (response.data.status) {
                                    dispatch(createStoreSuccess());
                                    callBack && callBack();
                                  } else {
                                    dispatch(createStoreFailed(response.data.error.message));
                                  }
                                })
                                .catch((error) => {
                                  dispatch(createStoreFailed(error.response.data.error.message));
                                });
                            })
                            .catch((error) => {
                              console.log('Error:' + error.message);
                            });
                        }
                      });
                    }
                  } else {
                    const data = {
                      account: {
                        name: name,
                        category_id: [categoryId],
                        description: description,
                        web_address: '',
                        images: [ImagePath],
                        coordinates: coordinates,
                        type: 'accounts',
                      },
                    };
                    let editStoreConfig = {
                      method: 'put',
                      url: `v1/accounts/${accountId}`,
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      data: data,
                    };
                    axios(editStoreConfig)
                      .then((response) => {
                        if (response.data.status) {
                          dispatch(createStoreSuccess());
                          callBack && callBack();
                        } else {
                          dispatch(createStoreFailed(response.data.error.message));
                        }
                      })
                      .catch((error) => {
                        dispatch(createStoreFailed(error.response.data.error.message));
                      });
                  }
                }
              })
              .catch((error) => {
                console.log('Error:' + error);
                dispatch(failedMessage(error.response.data.error.message));
              });
          }
        })
        .catch((error) => {
          dispatch(failedMessage(error.response.data.error.message));
        });
    } else {
      if (attributeData !== null) {
        const check = attributeData.find((attr) => attr.uploadFile);
        if (check === undefined) {
          const data = {
            account: {
              name: name,
              category_id: [categoryId],
              description: description,
              web_address: '',
              images: [image],
              coordinates: coordinates,
              attributes: attributeData,
              type: 'accounts',
            },
          };
          let editStoreConfig = {
            method: 'put',
            url: `v1/accounts/${accountId}`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: data,
          };
          axios(editStoreConfig)
            .then((response) => {
              if (response.data.status) {
                dispatch(createStoreSuccess());
                callBack && callBack();
              } else {
                dispatch(createStoreFailed(response.data.error.message));
              }
            })
            .catch((error) => {
              dispatch(createStoreFailed(error.response.data.error.message));
            });
        } else {
          let imageUploadConfig = {
            method: 'post',
            url: 'v1/utils/S3signedUploadURL',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              files: [
                {
                  name: check.values[0].name,
                  type: check.values[0].type,
                },
              ],
            },
          };

          axios(imageUploadConfig).then((response) => {
            if (response.data.status) {
              const fileURL = response.data.data.result[0];
              const path = fileURL.signedUrl;
              const ImagePath = fileURL.fileUri;
              fetch(path, {
                method: 'put',
                headers: {
                  ContentType: check.values[0].type,
                },
                body: check.values[0],
              })
                .then((res) => {
                  const filter = attributeData.filter((attr) => !attr.uploadFile);
                  const attributeUpdate = [...filter, { values: [ImagePath], id: check.id }];
                  const data = {
                    account: {
                      name: name,
                      category_id: [categoryId],
                      description: description,
                      web_address: '',
                      images: [image],
                      coordinates: coordinates,
                      attributes: attributeUpdate,
                      type: 'accounts',
                    },
                  };
                  let editStoreConfig = {
                    method: 'put',
                    url: `v1/accounts/${accountId}`,
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    data: data,
                  };
                  axios(editStoreConfig)
                    .then((response) => {
                      if (response.data.status) {
                        dispatch(createStoreSuccess());
                        callBack && callBack();
                      } else {
                        dispatch(createStoreFailed(response.data.error.message));
                      }
                    })
                    .catch((error) => {
                      dispatch(createStoreFailed(error.response.data.error.message));
                    });
                })
                .catch((error) => {
                  console.log('Error:' + error.message);
                });
            }
          });
        }
      } else {
        const data = {
          account: {
            name: name,
            category_id: [categoryId],
            description: description,
            web_address: '',
            images: [image],
            coordinates: coordinates,
            type: 'accounts',
          },
        };
        let editStoreConfig = {
          method: 'put',
          url: `v1/accounts/${accountId}`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };
        axios(editStoreConfig)
          .then((response) => {
            if (response.data.status) {
              dispatch(createStoreSuccess());
              callBack && callBack();
            } else {
              dispatch(createStoreFailed(response.data.error.message));
            }
          })
          .catch((error) => {
            dispatch(createStoreFailed(error.response.data.error.message));
          });
      }
    }
  };
};

// Store Follow
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

// Get Store List
export const getStores = (page, perPageData) => {
  return (dispatch) => {
    dispatch(initStoreLists());
    axios
      .get(`v1/accounts?page=${page}&type=accounts&per_page=${perPageData}`)
      .then((response) => {
        if (response.data.status) {
          let stores = response.data.data.accounts;
          dispatch(setAllStores(response.data.data));
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
        } else {
          dispatch(setAddress(''));
        }
      })
      .catch((error) => {
        dispatch(setAddress(''));
        dispatch(createStoreFailed(error.response.data.error.message));
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
          dispatch(setCategories(response.data.data.categories));
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

export const initAttribute = (categoryID, type) => {
  return (dispatch) => {
    var config = {
      method: 'get',
      url: `/v1/attributes/?category_id=${categoryID}&type=${type}`,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(setAttribute(response.data.data.attributes));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Call currency

export const setCurrencies = (currencies) => {
  return {
    type: actionTypes.INIT_CURRENCIES,
    currencies: currencies,
  };
};

export const initCurrencies = () => {
  return (dispatch) => {
    var config = {
      method: 'get',
      url: `v1/currencies`,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(setCurrencies(response.data.data.currencies));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// create Product

export const initAddProduct = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT,
    product: product,
  };
};

export const initFiles = (
  accountId,
  title,
  price,
  shippingCharge,
  description,
  quantity,
  selectedCategory,
  attributeData,
  currency,
  coordinates,
  files,
  fullFile,
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
      data: {
        files: files,
      },
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          // dispatch(SetFiles(response.data.data.result[0]));
          const responseFiles = response.data.data.result;

          var increment = 0;
          for (let index = 0; index < responseFiles.length; index++) {
            const path = responseFiles[index].signedUrl;
            const ImagePath = responseFiles[index].fileUri;

            fetch(path, {
              method: 'PUT',
              headers: {
                ContentType: files[index].type,
              },
              body: fullFile[0],
            })
              .then((res) => {
                if (res.ok) {
                  increment = increment + 1;
                  if (increment === files.length) {
                     
                    if (attributeData !== null) {
                      const check = attributeData.find((attr) => attr.uploadFile);
                      if (check === undefined) {
                        const listingData = {
                          listing: {
                            list_price: price,
                            shipping_charges: shippingCharge,
                            description: description,
                            account_id: accountId,
                            currency_id: currency,
                            stock: quantity,
                            attributes: attributeData ,
                            title: title,
                            offer_percent: 0,
                            images: responseFiles.map((res) => res.fileUri),
                            category_id: [selectedCategory],
                            coordinates: coordinates,
                            type: 'listings',
                          },
                        };
                      dispatch(createProduct(listingData, callBack));
                      } else {
                        let imageUploadConfig = {
                          method: 'post',
                          url: 'v1/utils/S3signedUploadURL',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          data: {
                            files: [
                              {
                                name: check.values[0].name,
                                type: check.values[0].type,
                              },
                            ],
                          },
                        };

                        axios(imageUploadConfig).then((response) => {
                          if (response.data.status) {
                            const fileURL = response.data.data.result[0];
                            const path = fileURL.signedUrl;
                            const ImagePath2 = fileURL.fileUri;
                            fetch(path, {
                              method: 'put',
                              headers: {
                                ContentType: check.values[0].type,
                              },
                              body: check.values[0],
                            })
                              .then((res) => {
                                const filter = attributeData.filter((attr) => !attr.uploadFile);
                                const attributeUpdate = [
                                  ...filter,
                                  { values: [ImagePath2], id: check.id },
                                ];
                               const listingData = {
                                 listing: {
                                   list_price: price,
                                   shipping_charges: shippingCharge,
                                   description: description,
                                   account_id: accountId,
                                   currency_id: currency,
                                   stock: quantity,
                                   attributes: attributeUpdate,
                                   title: title,
                                   offer_percent: 0,
                                   images: responseFiles.map((res) => res.fileUri),
                                   category_id: [selectedCategory],
                                   coordinates: coordinates,
                                   type: 'listings',
                                 },
                               };
                               dispatch(createProduct(listingData, callBack));
                              })
                              .catch((error) => {
                                console.log('Error:' + error.message);
                              });
                          }
                        });
                      }
                    } else {
                     const listingData = {
                       listing: {
                         list_price: price,
                         shipping_charges: shippingCharge,
                         description: description,
                         account_id: accountId,
                         currency_id: currency,
                         stock: quantity,
                          title: title,
                         offer_percent: 0,
                         images: responseFiles.map((res) => res.fileUri),
                         category_id: [selectedCategory],
                         coordinates: coordinates,
                         type: 'listings',
                       },
                     };
                     dispatch(createProduct(listingData, callBack));
                    }

                  }
                }
              })
              .catch((error) => {
                dispatch(failedMessage(error.response.data.error.message));
              });
          }
        }
      })
      .catch((error) => {
        dispatch(failedMessage(error.response.data.error.message));
      });
  };
};

export const createProduct = (listing, callBack) => {
  return (dispatch) => {
    dispatch(startLoading());
    var config = {
      method: 'post',
      url: 'products/v1/listings',
      headers: {
        'Content-Type': 'application/json',
      },
      data: listing,
    };

    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(createStoreSuccess());
          callBack && callBack();
        } else {
          dispatch(failedMessage(response.data.error.message));
        }
      })
      .catch((error) => {
        dispatch(failedMessage(error.response?.data?.error?.message));
      });
  };
};

// Attribute file upload
const attributeFileUpload = (attributes) => {
  const check = attributes.find((attr) => attr.uploadFile);
  const filter = attributes.filter((attr) => !attr.uploadFile);

  if (check !== undefined) {
    var imageUploadConfig = {
      method: 'post',
      url: 'v1/utils/S3signedUploadURL',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        files: [
          {
            name: check.values[0].name,
            type: check.values[0].type,
          },
        ],
      },
    };

    axios(imageUploadConfig).then((response) => {
      if (response.data.status) {
        const fileURL = response.data.data.result[0];
        const path = fileURL.signedUrl;
        const ImagePath = fileURL.fileUri;
        fetch(path, {
          method: 'put',
          headers: {
            ContentType: check.values[0].type,
          },
          body: check.values[0],
        })
          .then((res) => {
            const change = { values: [ImagePath], id: check.id };
            console.log('====================================');
            console.log([...filter, change]);
            console.log('====================================');
            return [...filter, change];
          })
          .catch((error) => {
            console.log('Error:' + error.message);
          });
      }
    });
  } else {
    return attributes;
  }
};
