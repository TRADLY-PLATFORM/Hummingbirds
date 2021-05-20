import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN, EXPIRY_TIME, ENCRYPT, DECRYPT } from '../../shared/utility';

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:idToken,
        userId :userId
    }
}

export const setAuthRedirectPath = (path,id) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
        verify_id: id
    }
}



export const authVerify = () =>{
    return{
        type:actionTypes.AUTH_VERIFY
    }
}


export const authFail= (error) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () =>{
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('refresh_key');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    sessionStorage.setItem('userData','');
    sessionStorage.clear();
    

  
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    //console.log(expirationTime);
    return dispatch => {
        setTimeout(()=> {
            //dispatch(logout());
            dispatch(refreshToken());
        }, expirationTime * 1000)
    }
}


export const authVerification = (verificationData) =>{
    return dispatch => {
        dispatch(authVerify());
        let url = '/v1/users/verify';
        axios.post(url, verificationData, {
            headers:   {
                'Authorization': 'Bearer '+ (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN
            }
        })
        .then(response => {           
              //  console.log(response.data.data);
                if(response.data.status){
                    const setTimeExpiry = EXPIRY_TIME;
                    const expirationDate = new Date(new Date().getTime() + setTimeExpiry * 1000);
                    localStorage.setItem('token',response.data.data.user.key.auth_key);
                    localStorage.setItem('refresh_key',response.data.data.user.key.refresh_key);
                    localStorage.setItem('userId',response.data.data.user.id);
                    localStorage.setItem('expirationDate',expirationDate);
                    sessionStorage.setItem('userData',JSON.stringify(response.data.data.user));
                    dispatch(authSuccess(response.data.data.user.key.auth_key,response.data.data.user.id,response.data.status));
                    dispatch(setAuthRedirectPath('/', null));
                    dispatch(checkAuthTimeout(setTimeExpiry)); 
                }  
        })
        .catch(error=>{   
            dispatch(authFail('verification code is invalid or expired'));         
        });

    }
}

export const auth = (userData, isSignup) =>{
   return dispatch => {
       dispatch(authStart());
       let url = '/v1/users/register';
       if(!isSignup){
           url = '/v1/users/login';
       }
     
       alert(ACCESS_TOKEN);
        axios.post(url, userData, {
                headers :   {
                    Authorization   : 'Bearer '+ACCESS_TOKEN
                }
        })  
        .then(response => {
            if(isSignup){
                console.log(response.data);
                if(response.data.status){
                    let encodeVerifyId = btoa(response.data.data.verify_id);                            
                    dispatch(setAuthRedirectPath('/verification/'+encodeVerifyId, encodeVerifyId));
                }else{
                    dispatch(authFail('Invalid credentials'));
                    return false;
                }          
            }
            else{    
                console.log(response.data);              
                const setTimeExpiry = EXPIRY_TIME;
                const expirationDate = new Date(new Date().getTime() + setTimeExpiry * 1000);
                localStorage.setItem('token',response.data.data.user.key.auth_key);
                localStorage.setItem('refresh_key',response.data.data.user.key.refresh_key);
                localStorage.setItem('userId',response.data.data.user.id);
                localStorage.setItem('expirationDate',expirationDate);
                sessionStorage.setItem('userData',JSON.stringify(response.data.data.user));
                dispatch(authSuccess(response.data.data.user.key.auth_key,response.data.data.user.id,response.data.status));
                dispatch(checkAuthTimeout(setTimeExpiry));  
                //dispatch(setAuthRedirectPath('/', null));
            }               
            
        })
        .catch(error=>{   
            dispatch(authFail('Invalid credentials or user not registered'));          
        });
   }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
            //dispatch(initCountries());
        }else{
            const expirationDate =  new Date(localStorage.getItem('expirationDate'));

            if(expirationDate <= new Date()){
                //dispatch(logout());
                dispatch(refreshToken());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId, null));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }

        }
    }
}


export const refreshToken = () =>{
    return dispatch => {
        dispatch(authStart());
 
        let url = '/app/v1/users/token/refresh';    
 
        axios.get(url, {
            headers:   {
                'auth_key':  localStorage.getItem('refresh_key')              
            }
            })
             .then(response => {
                
                    console.log(response);          
                    const setTimeExpiry = 250;
                    const expirationDate = new Date(new Date().getTime() + setTimeExpiry * 1000);
                    localStorage.setItem('token',response.data.data.user.key.auth_key);
                    localStorage.setItem('refresh_key',response.data.data.user.key.refresh_key);
                    localStorage.setItem('expirationDate',expirationDate);
                    dispatch(authSuccess(response.data.data.user.key.auth_key,localStorage.getItem('userId')));
                    dispatch(checkAuthTimeout(setTimeExpiry));  
                            
                
             })
             .catch(error=>{   
                
                console.log(error);  
                dispatch(authFail(''));          
             });
    }
}


export const setCountries= ( CountryItems ) => {
    return {
        type: actionTypes.SET_COUNTRIES,
        countries: CountryItems
    };
};

export const fetchCountriesFailed = () => {
    return {
        type: actionTypes.FETCH_COUNTRIES_FAILED
    };
};

export const startCountries= () => {
    return {
        type: actionTypes.INIT_COUNTRIES,
        loading: true
    };
};

export const initCountries = () => {    
    return dispatch => {
        let countryStorage = localStorage.getItem('countryStorage');
        if(!countryStorage){
            dispatch(startCountries());
            axios.get( '/app/v1/countries',{
                headers:{
                            'Authorization': 'Bearer '+ (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN // should be configured in axios
                        }
                })
                .then( response => {
                    var result = response.data.data.countries.map( v => {
                        return v;
                    });
                    localStorage.setItem('countryStorage',ENCRYPT(JSON.stringify(result)));
                    dispatch(setCountries(result));
                } )
                .catch( error => {
                    dispatch(fetchCountriesFailed());
                } );  
        }else{
            let countryDetails = JSON.parse(DECRYPT(countryStorage));
            dispatch(setCountries(countryDetails));
        }
    };
};

export const initTenantConfig= () =>{
    return{
        type:actionTypes.INIT_TENENT_CONFIG,
    }
}

export const successTenantConfig= (data) =>{
    return{
        type:actionTypes.SUCCESS_TENENT_CONFIG,
        data : data
    }
}

export const failedTenantConfig= (error) =>{
    return{
        type:actionTypes.FAILED_TENENT_CONFIG,
        error : error
    }
}



export const setTenantConfig = () => {
    return dispatch => {
        // let tenantStorage = localStorage.getItem('tenantDatas');
        // if(!tenantStorage){
            dispatch(initTenantConfig());
            axios.get( `/v1/tenants/${process.env.REACT_APP_TENANT_NAME}/configs`)
                .then( response => {
                    let data = {
                        logo_path : response.data.data.logo_path,
                        tenant_key : response.data.data.key.app_key,
                        auth_type : response.data.data.configs.auth_type,
                        tenantData: response.data.data
                    }
                    console.log(data);
                    localStorage.setItem('logo_path',response.data.data.logo_path);
                    localStorage.setItem('tenant_key',response.data.data.key.app_key);
                    localStorage.setItem('tenantDatas',JSON.stringify(data.tenantData));
                    dispatch(successTenantConfig(data));
                } )
                .catch( error => {
                    dispatch(failedTenantConfig('Tenant API Error.'));
                } );  
        // }else{
        //     let tenantDetails = JSON.parse(tenantStorage);
        //     let data = {
        //         logo_path : tenantDetails.logo_path,
        //         tenant_key : tenantDetails.key.app_key,
        //         auth_type : tenantDetails.configs.auth_type,
        //         tenantData: tenantDetails
        //     }
        //     console.log(data);
        //     dispatch(successTenantConfig(data));
        // }
    };
};