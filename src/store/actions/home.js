import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';


export const setCollections= ( collectionItems ) => {
    return {
        type: actionTypes.SET_HOME_COLLECTIONS,
        collectionItems: collectionItems
    };
};

export const fetchCollectionsFailed = () => {
    return {
        type: actionTypes.FETCH_COLLECTIONS_FAILED
    };
};

export const initCollections= () => {
    return {
        type: actionTypes.INIT_HOME_COLLECTIONS,
    };
};

export const initHomeCollections = () => {
    return dispatch => {
        dispatch(initCollections());
        axios.get( '/app/products/v1/home/en',{
            headers:   {
                                'tenant_key': ACCESS_TOKEN//(localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN
                       }
            })
                        .then( response => {
                            
                            if(response.data.status){
                                let promo_banners = response.data.data.promo_banners;
                                let categories = response.data.data.categories;
                               
                                // let categories = [
                                //         {
                                //             id : 1, name : "1", image_path: "https://storage.googleapis.com/tradlyapp/images/29796/469a14a2-ff59-4e76-9d85-f6e034d7d844.png", has_sub_category: true
                                //         },
                                //         {
                                //             id : 2, name : "2", image_path: "https://storage.googleapis.com/tradlyapp/images/29796/469a14a2-ff59-4e76-9d85-f6e034d7d844.png", has_sub_category: true
                                //         },
                                //         {
                                //             id : 3, name : "3", image_path: "https://storage.googleapis.com/tradlyapp/images/29796/469a14a2-ff59-4e76-9d85-f6e034d7d844.png", has_sub_category: true
                                //         },
                                //         {
                                //             id : 4, name : "4", image_path: "https://storage.googleapis.com/tradlyapp/images/29796/469a14a2-ff59-4e76-9d85-f6e034d7d844.png", has_sub_category: true
                                //         },
                                //         {
                                //             id : 5, name : "5", image_path: "https://storage.googleapis.com/tradlyapp/images/29796/469a14a2-ff59-4e76-9d85-f6e034d7d844.png", has_sub_category: true
                                //         },{
                                //             id : 6, name : "6", image_path: "https://storage.googleapis.com/tradlyapp/images/29796/469a14a2-ff59-4e76-9d85-f6e034d7d844.png", has_sub_category: true
                                //         },
                                //         {
                                //             id : 7, name : "7", image_path: "https://storage.googleapis.com/tradlyapp/images/29796/469a14a2-ff59-4e76-9d85-f6e034d7d844.png", has_sub_category: true
                                //         },
                                //         {
                                //             id : 8, name : "8", image_path: "https://storage.googleapis.com/tradlyapp/images/29796/469a14a2-ff59-4e76-9d85-f6e034d7d844.png", has_sub_category: true
                                //         }

                                // ];

                                let collections = response.data.data.collections;
                                console.log(collections);
                                dispatch(setCollections({promo_banners,categories,collections}));
                                
                            }else{
                                dispatch(fetchCollectionsFailed());
                            }
                        } )
                        .catch( error => {
                            dispatch(fetchCollectionsFailed());
                        } );  

          
    };
};