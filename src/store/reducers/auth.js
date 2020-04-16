import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    // token   : null,
    // userId  : null,
    loading : false,
    error   : false,
    disabled: false,
    message : null,
    verify_id : null,
    authRedirectPath: '/'
}

const authStart = (state,action) =>{
    return updateObject(state,{error:false,loading:true,disabled : true})
}

const authSuccess = (state,action) =>{
    return updateObject(state,
        {
            token: action.token,
            userId : action.userId,
            loading : false,
            message : null,
            disabled : false,
            error : null,
            verify_id : null,
            authRedirectPath: '/home'
        })
}

const authFail = (state,action) =>{
    return updateObject(state,
        {
            error: true,
            loading:false,
            disabled : false,
            message : action.error
        })
}

const authLogout = (state, action) => {
    return updateObject(state,{token:null,userId:null,disabled : false,error : null,message : null,authRedirectPath:"/"})
}

const startCountries= ( state, action ) => {
    return updateObject( state, {
        loading: action.loading
    } );
};

const setCountries= ( state, action ) => {
    return updateObject( state, {
        countries: action.countries,
        loading: false
    } );
};

const fetchCountriesFailed = (state, action) => {
    return updateObject( state, { loading: false, error: true, message: 'Could not fetch coutries result.' } );
};

// const initTenantConfig = (state, action) => {
//     return updateObject( state, { loading: false, error: false} );
// };

const setAuthRedirectPath = (state, action) => {
    return updateObject(state,{authRedirectPath:action.path,verify_id:action.verify_id,loading:false,error:false,disabled:false})
}



const authVerify = (state,action) =>{
    return updateObject(state,{error:false,loading:false,disabled : true, message:null})
}


const authReducer = ( state = initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.AUTH_VERIFY: return authVerify(state,action);
       // case actionTypes.INIT_TENENT_CONFIG: return initTenantConfig(state, action);  
        case actionTypes.INIT_COUNTRIES: return startCountries(state, action);   
        case actionTypes.SET_COUNTRIES: return setCountries(state, action);    
        case actionTypes.FETCH_COUNTRIES_FAILED: return fetchCountriesFailed(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;

    }
}



export default authReducer;