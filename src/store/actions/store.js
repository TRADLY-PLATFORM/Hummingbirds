import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';



export const setStoreDeatils= ( storeDetails ) => {
    return {
        type: actionTypes.SET_STORE_DETAILS,
        storeDetails: storeDetails
    };
};

export const fetchStoreDeatilsFailed = () => {
    return {
        type: actionTypes.FETCH_STORE_DETAILS_FAILED
    };
};

export const startStoreDeatils = () => {
    return {
        type: actionTypes.INIT_STORE_DETAILS
    };
};

export const initStoreDetails = (id) => {
    return dispatch => {
        dispatch(startStoreDeatils());

        const storeDetails = localStorage.getItem('storeDetails_'+id);
        if(!storeDetails){

        axios.get( '/v1/stores/'+id,{
            headers:   {
                'Authorization': 'Bearer ff9294e1f1ac6c12361b4516c5e155d0'//+ (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN
                       }
            })
            .then( response => {
                
                console.log(response.data.data.store);
                if(response.data.status){
                    localStorage.setItem('storeDetails_'+id,JSON.stringify(response.data.data.store));
                    dispatch(setStoreDeatils(response.data.data.store));
                    
                }else{
                    dispatch(fetchStoreDeatilsFailed());
                }
            } )
            .catch( error => {
                dispatch(fetchStoreDeatilsFailed());
            } );  

        }
        else{
            dispatch(setStoreDeatils(JSON.parse(storeDetails)));
        }
     };
};


export const setStoreLists= ( storeLists ) => {
    return {
        type: actionTypes.SET_STORE_LISTS,
        storeLists: storeLists
    };
};

export const fetchStoreListsFailed = () => {
    return {
        type: actionTypes.FETCH_STORE_LISTS_FAILED
    };
};

export const initStoreLists = () => {
    return {
        type: actionTypes.INIT_STORE_LISTS
    };
};


export const userStoreLists = (userId,authKey) => {
    return dispatch => {
        dispatch(initStoreLists());
        axios.get( '/v1/stores?page=1&user_id='+userId,{
            headers:   {
                         'Authorization': 'Bearer '+ (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN,
                         "X-Auth_key"   :  authKey
                       }
            })
                        .then( response => {
                            
                            console.log(response.data.data);
                            if(response.data.status){
                                dispatch(setStoreLists(response.data.data.stores));
                                
                            }else{
                                dispatch(fetchStoreListsFailed());
                            }
                        } )
                        .catch( error => {
                            dispatch(fetchStoreListsFailed());
                        } );  

          
     };
};



export const createStoreFailed = () => {
    return {
        type: actionTypes.CREATE_STORE_FAILED
    };
};

export const initCreateStore = () => {
    return {
        type: actionTypes.INIT_CREATE_STORE
    };
};

export const createStoreSuccess = () => {
    return {
        type: actionTypes.CREATE_STORE_SUCCESS
    };
};


export const CreateStore = (store,token) => {
    console.log(store);
    return dispatch => {
        dispatch(initCreateStore());
        axios.post( '/v1/stores', store,{
            headers:   {
                'Authorization': 'Bearer '+ (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN,
                'X-Auth-Key' :token
                       }
            })
            .then( response => {
              
                if(response.data.status){
                    dispatch(createStoreSuccess());
                    
                }else{
                    dispatch(createStoreFailed());
                }
            } )
            .catch( error => {
                dispatch(createStoreFailed());
            } );  

        }
        
     };




