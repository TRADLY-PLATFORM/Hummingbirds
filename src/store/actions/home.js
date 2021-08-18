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
export const setBanners = (banners) => {
  return {
    type: actionTypes.SET_PROMO_BANNERS,
    bannersItems: banners,
  };
};
export const setStores = (stores) => {
  return {
    type: actionTypes.SET_STORES_TO_FOLLOW,
    storesItems: stores,
  };
};
export const setCategories = (categories) => {
  return {
    type: actionTypes.SET_CATEGORIES,
    categories: categories,
  };
};
export const setLatestProducts = (products) => {
  return {
  type: actionTypes.SET_LATEST_PRODUCTS,
    products: products,
}
}

export const initHomeCollections = () => {
  return (dispatch) => {
    let homeStorage = localStorage.getItem('homeStorage');
    if (!homeStorage) {
      dispatch(initCollections());
      axios
        .get('/products/v1/home/')
        .then((response) => {
          if (response.data.status) {
            console.log(response);
            // categories
            let categories = response.data.data.categories;
            dispatch(setCategories( categories));

            // collections
            let collections = response.data.data.collections;
              dispatch(setCollections({ collections }));

            //  console.log(categories, collections);
            // stores
            let stores = response.data.data.collections.find(
              (item, i) => item.title === 'Stores to Follow'
            );
            dispatch(setStores(stores.accounts));
         //  products
             let products = response.data.data.collections.find(
               (item, i) => item.title === 'Latest Products'
             );

             dispatch(setLatestProducts(products.listings));

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
       let collections = homeDetails.collections;
      dispatch(setCollections({   collections }));
    }
  };
};

export const initPromoBanners = () => {
  return (dispatch) => {
    axios
      .get('v1/promos?medium=web')
      .then((response) => {
        if (response.data.status) {
          let promo_banners = response.data.data.promo_banners;
          console.log(promo_banners);
          dispatch(setBanners(response.data.data.promo_banners));
        }
      })
      .catch((error) => {
        dispatch(fetchCollectionsFailed());
      });
  };
};

export const initStoresToFollow = () => {
  return (dispatch) => {
    axios
      .get('/products/v1/home/')
      .then((response) => {
        if (response.data.status) {
          let stores = response.data.data.collections.find((item,i)=>item.title === "Stores to Follow")
           dispatch(
            setStores(stores.accounts)
          );
        }
      })
      .catch((error) => {
        dispatch(fetchCollectionsFailed());
      });
  };
};

export const initCategories = () => {
  return (dispatch) => {
    axios('v1/categories?parent=0&type=listings')
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

export const initLatestProducts = () => {
  return (dispatch) => {
   
      dispatch(initCollections());
      axios
        .get('/products/v1/home/')
        .then((response) => {
          if (response.data.status) {
            console.log(response);
            let products = response.data.data.collections.find(
              (item, i) => item.title === 'Latest Products'
            );

            dispatch(setLatestProducts(products.listings));

           
          } else {
            dispatch(fetchCollectionsFailed());
          }
        })
        .catch((error) => {
          dispatch(fetchCollectionsFailed());
        });
   
  };
}