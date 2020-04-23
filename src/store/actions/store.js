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
        axios.get( '/app/v1/stores/'+id,{
            headers:   {
                         "tenant_key" : (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN,
                          "auth_key"  : ""
                         
                       }
            })
                        .then( response => {
                            
                            console.log(response.data.data);
                            if(response.data.status){
                                dispatch(setStoreDeatils(response.data.data.listing));
                                
                            }else{
                                dispatch(fetchStoreDeatilsFailed());
                            }
                        } )
                        .catch( error => {
                            dispatch(fetchStoreDeatilsFailed());
                        } );  

          
     };
};