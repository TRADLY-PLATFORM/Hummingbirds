import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN, EXPIRY_TIME } from '../../shared/utility';
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('refresh_key');
    localStorage.removeItem('appDetails');
    localStorage.removeItem('brandImage');
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
        let url = '/app/v1/users/verify';
        axios.post(url, verificationData, {
            headers:   {
                'tenant_key': (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN
            }
        })
        .then(response => {           
                console.log(response.data.data);
                if(response.data.status){
                    const setTimeExpiry = EXPIRY_TIME;
                    const expirationDate = new Date(new Date().getTime() + setTimeExpiry * 1000);
                    localStorage.setItem('token',response.data.data.user.key.auth_key);
                    localStorage.setItem('refresh_key',response.data.data.user.key.refresh_key);
                    localStorage.setItem('userId',response.data.data.user.id);
                    localStorage.setItem('expirationDate',expirationDate);
                    sessionStorage.setItem('userData',JSON.stringify(response.data.data.user));
                    dispatch(authSuccess(response.data.data.user.key.auth_key,response.data.data.user.id,response.data.status));
                    dispatch(setAuthRedirectPath('/home', null));
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

       let url = '/app/v1/users/register';
       if(!isSignup){
           url = '/app/v1/users/login';
       }
     

        axios.post(url, userData, {
                headers:   {
                    'tenant_key': (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN
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
                    dispatch(setAuthRedirectPath('/home', null));
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
            dispatch(initCountries());
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
        dispatch(startCountries());
        axios.get( '/app/v1/countries',{
            headers:   {
                                'tenant_key': (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN
                       }
            })
                        .then( response => {
                            var result = response.data.data.countries.map( v => {
                                return v;
                            });
                            dispatch(setCountries(result));
                        } )
                        .catch( error => {
                            dispatch(fetchCountriesFailed());
                        } );  

          
    };
};

export const initTenantConfig= () =>{
    return{
        type:actionTypes.INIT_TENENT_CONFIG,
    }
}

export const setTenantConfig = () => {
    return dispatch => {
        if(!localStorage.getItem('tenant_key')){
            dispatch(initTenantConfig());
            axios.get( '/tenants/kasd123345/configs')
                            .then( response => {
                              console.log(response.data.data);
                              localStorage.setItem('logo_path',response.data.data.logo_path);
                              localStorage.setItem('tenant_key',response.data.data.key.tenant_key);
                              localStorage.setItem('tenantData',JSON.stringify(response.data.data));
                            } )
                            .catch( error => {
                                console.log(error);
                            } );  
        }          
    };
};