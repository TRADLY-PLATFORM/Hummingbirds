import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: false,
  disabled: false,
  recoveryPassword:false,
  message: null,
  verify_id: null,
  countries: null,
  general_configs: {},
  onboarding_configs: {},
  seo_configs:{},
  accounts_configs:{},
  listings_configs:{},
  payments_configs:null,
  authRedirectPath: '/',
  userData: {},
  tenantData: {},
  userDetails:{}
};

const authStart = (state, action) => {
  return updateObject(state, { error: false, loading: true, disabled: true });
};

const authSuccess = (state, action) => {
   return updateObject(state, {
    userData: action.data,
    loading: false,
    message: null,
    disabled: false,
    error: false,
    verify_id: null,
  });
};
const passwordChangeSuccess = (state, action) => {
   return updateObject(state, {
    loading: false,
    message: null,
    error: false,
    verify_id: null,
    recoveryPassword:true,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: true,
    loading: false,
    disabled: false,
    message: action.error,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, initialState);
};

const startCountries = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
  });
};

const setCountries = (state, action) => {
  return updateObject(state, {
    countries: action.countries,
    loading: false,
  });
};
const setGeneralConfigs = (state, action) => {
  
  return updateObject(state, {
    general_configs: action.data,
    loading: false,
  });
};
const setOnboardingConfigs = (state, action) => {
  
  return updateObject(state, {
    onboarding_configs: action.data,
    loading: false,
  });
};
const setSeoConfigs = (state, action) => {
  
  return updateObject(state, {
    seo_configs: action.configs,
    loading: false,
  });
};
const setAccountsConfigs = (state, action) => {
  
  return updateObject(state, {
    accounts_configs: action.configs,
    loading: false,
  });
};
const setListingsConfigs = (state, action) => {
  
  return updateObject(state, {
    listings_configs: action.configs,
    loading: false,
  });
};
const setPaymentsConfigs = (state, action) => {
  
  return updateObject(state, {
    payments_configs: action.configs,
    loading: false,
  });
};

const fetchCountriesFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true,
    message: 'Could not fetch coutries result.',
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path,
    verify_id: action.verify_id,
    loading: false,
    error: false,
    disabled: false,
  });
};
const setVerifyID = (state, action) => {
  return updateObject(state, {
     verify_id: action.verify_id,
    loading: false,
    error: false,
   });
};

const authVerify = (state, action) => {
  return updateObject(state, { error: false, loading: false, disabled: true, message: null });
};

export const successTenantConfig = (state, action) => {
  return updateObject(state, {
    tenantData: action.data,
    error: false,
    message:null,
  });
};
export const setUserDetails = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: false,
    message: null,
    userDetails: action.details,
  });
};

export const failedTenantConfig = (state, action) => {
  return updateObject(state, {
    error: true,
    message:action.error
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.PASSWORD_RECOVERY:
      return passwordChangeSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_VERIFY:
      return authVerify(state, action);
    case actionTypes.USER_DETAILS:
      return setUserDetails(state, action);
    case actionTypes.INIT_COUNTRIES:
      return startCountries(state, action);
    case actionTypes.SET_COUNTRIES:
      return setCountries(state, action);

    case actionTypes.SET_CONFIGS:
      return setGeneralConfigs(state, action);
    case actionTypes.SET_ONBOARDING_CONFIGS:
      return setOnboardingConfigs(state, action);
    case actionTypes.SEO_CONFIGS:
      return setSeoConfigs(state, action);
    case actionTypes.ACCOUNTS_CONFIGS:
      return setAccountsConfigs(state, action);
    case actionTypes.LISTINGS_CONFIGS:
      return setListingsConfigs(state, action);
    case actionTypes.PAYMENTS_CONFIGS:
      return setPaymentsConfigs(state, action);

    case actionTypes.FETCH_COUNTRIES_FAILED:
      return fetchCountriesFailed(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    case actionTypes.VERIFY_ID:
      return setVerifyID(state, action);

    case actionTypes.SUCCESS_TENANT_CONFIG:
      return successTenantConfig(state, action);
    case actionTypes.FAILED_TENANT_CONFIG:
      return failedTenantConfig(state, action);
    default:
      return state;
  }
};

export default authReducer;
