import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN, EXPIRY_TIME, ENCRYPT, DECRYPT } from '../../shared/utility';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: data,
  };
};

export const setAuthRedirectPath = (path, id) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
    verify_id: id,
  };
};

export const setVerifyID = ( id) => {
  return {
    type: actionTypes.VERIFY_ID,
     verify_id: id,
  };
};

export const authVerify = () => {
  return {
    type: actionTypes.AUTH_VERIFY,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.clear();
  window.location.reload();

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const getConfigs = (data) => {
  return {
    type: actionTypes.SET_CONFIGS,
    data: data,
  };
};
export const getOnboardingConfigs = (data) => {
  return {
    type: actionTypes.SET_ONBOARDING_CONFIGS,
    data: data,
  };
};

export const checkAuthTimeout = (expirationTime) => {
   return (dispatch) => {
    setTimeout(() => {
      if (localStorage.getItem('response')) {
        dispatch(refreshToken());
        // dispatch(logout());
      }
    }, expirationTime * 1000);
  };
};

export const authVerification = (verificationData) => {
  return (dispatch) => {
    dispatch(authVerify());
    let url = '/v1/users/verify';
    axios
      .post(url, verificationData)
      .then((response) => {
        //  console.log(response.data.data);
        if (response.data.status) {
          const setTimeExpiry = EXPIRY_TIME;
          const expirationDate = new Date(new Date().getTime() + setTimeExpiry * 1000);
          localStorage.setItem('token', response.data.data.user.key.auth_key);
          //   localStorage.setItem('refresh_key', response.data.data.user.key.refresh_key);
          //   localStorage.setItem('userId', response.data.data.user.id);
          //   localStorage.setItem('expirationDate', expirationDate);
          //   sessionStorage.setItem('userData', JSON.stringify(response.data.data.user));

          localStorage.setItem('response', JSON.stringify(response.data.data.user));
          // localStorage.setItem('token', response.data.data.user.id);
          localStorage.setItem('expirationDate', expirationDate);
          dispatch(authSuccess(response.data.data.user));
          dispatch(setAuthRedirectPath('/', null));
          dispatch(checkAuthTimeout(setTimeExpiry));
        }
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const auth = (userData, isSignup) => {
   return (dispatch) => {
    const token = process.env.REACT_APP_API_KEY;
    dispatch(authStart());
    let url = '/v1/users/register';
    if (!isSignup) {
      url = '/v1/users/login';
    }
    var config = {
      method: 'post',
      url: url,
  
      data: userData,
    };
    axios(config)
      .then((response) => {
           if (isSignup) {
            if (response.data.status) {
              let encodeVerifyId = btoa(response.data.data.verify_id);
               dispatch(setVerifyID(encodeVerifyId));
              // dispatch(setAuthRedirectPath('/verification/' + encodeVerifyId, encodeVerifyId));
            } else {
              dispatch(authFail('Something is wrong, Please try again'));
              return false;
            }
          } else {
            if (response.data.status) {
               const setTimeExpiry = EXPIRY_TIME;
              const expirationDate = new Date(new Date().getTime() + setTimeExpiry * 1000);
              //   localStorage.setItem('token', response.data.data.user.key.auth_key);
              //   localStorage.setItem('refresh_key', response.data.data.user.key.refresh_key);
              //   localStorage.setItem('userId', response.data.data.user.id);
              //   localStorage.setItem('expirationDate', expirationDate);
              //   sessionStorage.setItem('userData', JSON.stringify(response.data.data.user));
              localStorage.setItem('response', JSON.stringify(response.data.data.user));
              // localStorage.setItem('token', response.data.data.user.id);
              localStorage.setItem('expirationDate', expirationDate);
              dispatch(authSuccess(response.data.data.user));
              dispatch(checkAuthTimeout(setTimeExpiry));
              // dispatch(setAuthRedirectPath('/', null));
            } else {
              dispatch(authFail('Something is wrong, Please try again'));
            }
          }
       
      })
      .catch((error) => {
      
           dispatch(authFail(error.response.data.error.message));
 
        
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    // const token = localStorage.getItem('token');
    // console.log('checking----------1', token);
    // if (!token) {
    //   console.log('checking----------2');
    //   dispatch(logout());
    // } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //   if (expirationDate <= new Date()) {
    //     console.log('checking----------3');
    //     dispatch(logout());
    //   } else {
    //     console.log('checking----------4');
    const response = localStorage.getItem('response');
    dispatch(authSuccess(JSON.parse(response)));
    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    //   }
    // }
  };
};


// forgot-password
export const passwordChange = (data) => {
  return {
    type: actionTypes.PASSWORD_RECOVERY,
   };
};

export const password_recovery = (userData) => {
  return (dispatch) => {
     dispatch(authStart());
    let url = 'v1/users/password/recovery';
 
    var config = {
      method: 'post',
      url: url,

      data: userData,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          let encodeVerifyId = btoa(response.data.data.verify_id);
           dispatch(setVerifyID(encodeVerifyId));
        } else {
          dispatch(authFail('Something is wrong, Please try again'));
          return false;
        }
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

// set New password
// export const passwordChange = (data) => {
//   return {
//     type: actionTypes.PASSWORD_RECOVERY,
//     data: data,
//   };
// };

export const set_password = (userData) => {
  return (dispatch) => {
     dispatch(authStart());
    let url = 'v1/users/password/set';
 
    var config = {
      method: 'post',
      url: url,
      data: userData,
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          dispatch(passwordChange());
        } else {
          dispatch(authFail('Something is wrong, Please try again'));
          return false;
        }
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error.message));
     });
      
  };
};






export const refreshToken = () => {
  return (dispatch) => {
    dispatch(authStart());

    let url = '/app/v1/users/token/refresh';

    axios
      .get(url, {
        headers: {
          auth_key: localStorage.getItem('refresh_key'),
        },
      })
      .then((response) => {
        const setTimeExpiry = EXPIRY_TIME;
        const expirationDate = new Date(new Date().getTime() + setTimeExpiry * 1000);
        localStorage.setItem('token', response.data.data.user.key.auth_key);
        localStorage.setItem('refresh_key', response.data.data.user.key.refresh_key);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(response.data.data.user.key.auth_key, localStorage.getItem('userId')));
        dispatch(checkAuthTimeout(setTimeExpiry));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail('')); 
      });
  };
};

export const setCountries = (CountryItems) => {
  return {
    type: actionTypes.SET_COUNTRIES,
    countries: CountryItems,
  };
};

export const fetchCountriesFailed = () => {
  return {
    type: actionTypes.FETCH_COUNTRIES_FAILED,
  };
};

export const startCountries = () => {
  return {
    type: actionTypes.INIT_COUNTRIES,
    loading: true,
  };
};

export const initCountries = () => {
  return (dispatch) => {
    let countryStorage = localStorage.getItem('countryStorage');
    if (!countryStorage) {
      // dispatch(startCountries());
      axios
        .get('/v1/tenants/countries', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('tenant_key') ?? ACCESS_TOKEN, // should be configured in axios
          },
        })
        .then((response) => {
           var result = response.data.data.countries.map((v) => {
            return v;
          });
          // localStorage.setItem('countryStorage', ENCRYPT(JSON.stringify(result)));
          dispatch(setCountries(result));
        })
        .catch((error) => {
          dispatch(fetchCountriesFailed());
        });
    } else {
      let countryDetails = JSON.parse(DECRYPT(countryStorage));
      dispatch(setCountries(countryDetails));
    }
  };
};

export const initTenantConfig = () => {
  return {
    type: actionTypes.INIT_TENANT_CONFIG,
  };
};

export const successTenantConfig = (data) => {
  return {
    type: actionTypes.SUCCESS_TENANT_CONFIG,
    data: data,
  };
};

export const failedTenantConfig = (error) => {
  return {
    type: actionTypes.FAILED_TENANT_CONFIG,
    error: error,
  };
};

export const setTenantConfig = () => {
  return (dispatch) => {
    dispatch(initTenantConfig());
    const tenantData = localStorage.getItem('tenant_data');
    if (!tenantData) {
      axios
        .get(`/v1/tenants/${process.env.REACT_APP_TENANT_NAME}/configs`)
        .then((response) => {
           localStorage.setItem('tenant_key', response.data.data.key.app_key);
          localStorage.setItem('tenant_data', JSON.stringify(response.data.data));
          dispatch(successTenantConfig(response.data.data));
        })
        .catch((error) => {
          dispatch(failedTenantConfig('Tenant API Error.'));
        });
    } else {
      dispatch(successTenantConfig(JSON.parse(tenantData)));
    }
  };
};

export const setGeneralConfigsData = () => {
  return (dispatch) => {
    axios
      .get('v1/configs?key_group=general')
      .then((response) => {
         if (response.status) {
          dispatch(getConfigs(response.data.data.configs));
           
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const setOnboardingConfigsData = () => {
  return (dispatch) => {
    axios
      .get('v1/configs?key_group=onboarding')
      .then((response) => {
         if (response.status) {
          dispatch(getOnboardingConfigs(response.data.data.configs));
          localStorage.setItem('primary_color', response.data.data.configs.app_color_primary);
          localStorage.setItem('logo_path', response.data.data.configs.splash_image);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};



// SEO configs


export const SEOConfigs = (data) => {
  return {
    type: actionTypes.SEO_CONFIGS,
    configs: data,
  };
};

export const setSeoConfigs = () => {
  return (dispatch) => {
    axios
      .get('v1/configs?key_group=seo')
      .then((response) => {
         if (response.status) {
 
          dispatch(SEOConfigs(response.data.data.configs));
           
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// Accounts configs


export const AccountsConfigs = (data) => {
  return {
    type: actionTypes.ACCOUNTS_CONFIGS,
    configs: data,
  };
};

export const setAccountsConfigs = () => {
  return (dispatch) => {
    axios
      .get('v1/configs?key_group=accounts')
      .then((response) => {
         if (response.status) {
 
          dispatch(AccountsConfigs(response.data.data.configs));
           
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// Accounts configs


export const ListingsConfigs = (data) => {
  return {
    type: actionTypes.LISTINGS_CONFIGS,
    configs: data,
  };
};

export const setListingsConfigs = () => {
  return (dispatch) => {
    axios
      .get('v1/configs?key_group=listings')
      .then((response) => {
         if (response.status) {

          dispatch(ListingsConfigs(response.data.data.configs));
           
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// User Details


export const setUserDetails = (data) => {
  return {
    type: actionTypes.USER_DETAILS,
    details: data,
  };
};

export const getUserDetails = (userID) => {
  return (dispatch) => {
    axios
      .get(`v1/users/${userID}`)
      .then((response) => {
         if (response.status) {
          dispatch(setUserDetails(response.data.data.user));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


// Payment configs


export const PaymentsConfigs = (data) => {
  return {
    type: actionTypes.PAYMENTS_CONFIGS,
    configs: data,
  };
};

export const setPaymentsConfigs = () => {
  return (dispatch) => {
    axios
      .get('v1/configs?key_group=payments')
      .then((response) => {
         if (response.status) {

          dispatch(PaymentsConfigs(response.data.data.configs));
           
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};