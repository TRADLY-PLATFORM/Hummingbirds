import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';

export const connectStripe = () => {
  return (dispatch) => {
    var config = {
      method: 'get',
      url: '/v1/payments/stripe/connect/oauth',
      
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
