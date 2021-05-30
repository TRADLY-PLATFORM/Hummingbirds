import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { DECRYPT } from '../../shared/utility';

export const setCollections = (collectionItems) => {
  return {
    type: actionTypes.SET_HOME_COLLECTIONS,
    collectionItems: collectionItems,
  };
};

export const fetchCollectionsFailed = () => {
  return {
    type: actionTypes.FETCH_COLLECTIONS_FAILED,
  };
};

export const initCollections = () => {
  return {
    type: actionTypes.INIT_HOME_COLLECTIONS,
  };
};

export const initHomeCollections = () => {
  return (dispatch) => {
    let homeStorage = localStorage.getItem('homeStorage');
    if (!homeStorage) {
      dispatch(initCollections());
      axios
        .get('/products/v1/home/')
        .then((response) => {
          if (response.data.status) {
            let promo_banners = response.data.data.promo_banners;
            let categories = response.data.data.categories;
            let collections = response.data.data.collections;

            dispatch(setCollections({ promo_banners, categories, collections }));

            // let data = {
            //   promo_banners: promo_banners,
            //   categories: categories,
            //   collections: collections,
            // };
            //localStorage.setItem('homeStorage', ENCRYPT(JSON.stringify(data)));
          } else {
            dispatch(fetchCollectionsFailed());
          }
        })
        .catch((error) => {
          dispatch(fetchCollectionsFailed());
        });
    } else {
      let homeDetails = JSON.parse(DECRYPT(homeStorage));
      let promo_banners = homeDetails.promo_banners;
      let categories = homeDetails.categories;
      let collections = homeDetails.collections;
      dispatch(setCollections({ promo_banners, categories, collections }));
    }
  };
};
