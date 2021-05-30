import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: false,
  disabled: false,
  message: null,
  verify_id: null,
  authRedirectPath: '/',
  userData: {},
  tenantData: {},
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
    error: null,
    verify_id: null,
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

const authVerify = (state, action) => {
  return updateObject(state, { error: false, loading: false, disabled: true, message: null });
};

export const successTenantConfig = (state, action) => {
  return updateObject(state, {
    tenantData: action.data,
  });
};

export const failedTenantConfig = (state, action) => {
  return updateObject(state, { error: action.error });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_VERIFY:
      return authVerify(state, action);
    case actionTypes.INIT_COUNTRIES:
      return startCountries(state, action);
    case actionTypes.SET_COUNTRIES:
      return setCountries(state, action);
    case actionTypes.FETCH_COUNTRIES_FAILED:
      return fetchCountriesFailed(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SUCCESS_TENANT_CONFIG:
      return successTenantConfig(state, action);
    case actionTypes.FAILED_TENANT_CONFIG:
      return failedTenantConfig(state, action);
    default:
      return state;
  }
};

export default authReducer;
