import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading : false,
    error   : false,
    success : false,
    message : null,
    promo_banners: [],
    categories: [],
    collections: []
}

const initCollections= ( state, action ) => {
    return updateObject( state, {
        loading: true
    } );
};

const setCollections= ( state, action ) => {
    return updateObject( state, {
        promo_banners: action.collectionItems.promo_banners,
        categories: action.collectionItems.categories,
        collections: action.collectionItems.collections,
        loading: false
    } );
};

const fetchCollectionsFailed = (state, action) => {
    return updateObject( state, { loading: false, error: true, message: 'Could not fetch collecions result.' } );
};

const homeReducer = ( state = initialState, action) =>{
    switch(action.type){
        case actionTypes.INIT_HOME_COLLECTIONS: return initCollections(state, action);   
        case actionTypes.SET_HOME_COLLECTIONS: return setCollections(state, action);    
        case actionTypes.FETCH_COLLECTIONS_FAILED: return fetchCollectionsFailed(state, action);
        default:
            return state;

    }
}



export default homeReducer;