import axios from 'axios';
import LocalStorageService from './LocalStorageService';

const URL = process.env.REACT_APP_BACKEND_API_URL;
const instance = axios.create({
  baseURL: URL,
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Cache-Control'] = 'no-cache';
instance.defaults.headers.common['Pragma'] = 'no-cache';
instance.defaults.headers.common['Expires'] = '0';

instance.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getApiToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    const authKey = LocalStorageService.getAccessToken();
    if (authKey) {
      config.headers['X-Auth-Key'] = authKey;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
var check = false;
instance.interceptors.response.use(
  (response) => {
    const originalRequest = response.config;
    if (
      response.status === 200 &&
      [`/v1/tenants/${process.env.REACT_APP_TENANT_NAME}/configs`].includes(originalRequest.url)
    ) {
      const tokenObject = {
        access_token: response.data.data.key.app_key,
        refresh_token: response.data.data.key.app_key,
        x_api_key: response.data.data.key.app_key,
      };
      LocalStorageService.setToken(tokenObject);
      instance.defaults.headers.common['Authorization'] =
        'Bearer ' + LocalStorageService.getApiToken();
      instance.defaults.headers.common['X-Auth-Key'] = LocalStorageService.getAccessToken();
      return response;
    } else if (
      response.status === 200 &&
      [`/v1/users/verify`, `/v1/users/login`].includes(originalRequest.url)
    ) {
      const tokenObject = {
        access_token: response.data.data.user.key.auth_key,
        refresh_token: response.data.data.user.key.refresh_key,
        x_api_key: LocalStorageService.getApiToken(),
      };
      LocalStorageService.setToken(tokenObject);
      instance.defaults.headers.common['Authorization'] =
        'Bearer ' + LocalStorageService.getApiToken();
      instance.defaults.headers.common['X-Auth-Key'] = LocalStorageService.getAccessToken();
      return response;
    }
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status !== undefined && error.response.status === 401 && check) {
      //originalRequest.url === '/user/refresh_token'
      //localStorage.clear();
      return Promise.reject(error);
    }

    if (error.response.status !== undefined && error.response.status === 401 && !check) {
      originalRequest._retry = true;
      return axios
        .get(URL + '/v1/users/token/refresh', {
          headers: {
            Authorization: 'Bearer ' + LocalStorageService.getApiToken(),
            'X-Refresh-Key': LocalStorageService.getRefreshToken(),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const tokenObject = {
              access_token: res.data.data.user.key.auth_key,
              refresh_token: res.data.data.user.key.refresh_key,
              x_api_key: LocalStorageService.getApiToken(),
            };
            LocalStorageService.setToken(tokenObject);
            originalRequest.headers['Authorization'] = 'Bearer ' + tokenObject.x_api_key;
            originalRequest.headers['X-Auth-Key'] = LocalStorageService.getAccessToken();
            return axios(originalRequest);
          }
        })
        .catch((error) => {
          check = true;
          //localStorage.clear();
        });
    }
    return Promise.reject(error);
  }
);

export default instance;
