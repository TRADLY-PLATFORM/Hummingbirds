import * as actionTypes from './actionTypes';
import axios from '../../axios';


// start Loading
export const startLoading = () => {
  return {
    type: actionTypes.ORDER_LOADING,
  };
};


// get order list
export const setOrders = (list) => {
  return {
    type: actionTypes.GET_ORDERS,
    orders: list,
  };
};
 

export const getOrders = (store_id,filterId) => {
  return (dispatch) => {
         dispatch(startLoading());
    
    let url;
    if (store_id) {
       if (filterId) {
           url = `products/v1/orders?page=1&type=listings&order_status=${filterId}&${store_id}`;
      } else {
        url = `products/v1/orders?page=1&type=listings&${store_id}`;
      }
    } else {
      if (filterId) {
         url = 'products/v1/orders?page=1&type=listings&order_status='+filterId;
      } else {
         url ='products/v1/orders?page=1&type=listings'
      }
     
    }
     axios
      .get(url)
      .then((response) => {
        if (response.data.status) {
          dispatch(setOrders(response.data.data.orders));
          console.log(response);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// get orderdetails
export const setOrderDetails= (data) => {
  return {
    type: actionTypes.ORDER_DETAILS,
    order_details: data,
  };
};
 

export const getOrderDetails = (id, store_id) => {
  return (dispatch) => {
    dispatch(startLoading());

        let url;
        if (store_id) {
          url = `products/v1/orders/${id}${store_id}`;
        } else {
          url = 'products/v1/orders/'+id;
        }
    axios
      .get(url)
      .then((response) => {
        if (response.data.status) {
          dispatch(setOrderDetails(response.data.data.order));
          console.log(response);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


// Order status change 

export const setOrderStatus = (data) => {
  return {
    type: actionTypes.ORDER_STATUS_UPDATE,
    order_details: data,
  };
};

export const setNewOrderStatus = (data,id,store_id) => {
  return (dispatch) => {
     let url;
     if (store_id) {
       url =`/products/v1/orders/${id}/status${store_id}`;
     } else {
       url =`/products/v1/orders/${id}/status`;
     }
        var config = {
          method: 'patch',
          url: url,
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          if (store_id) {
                dispatch(getOrderDetails(id,store_id));
          } else {
             dispatch(getOrderDetails(id));
             }
         } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// Order Details change 

export const setNewOrderDetails = (data) => {
  return {
    type: actionTypes.ORDER_DETAILS_UPDATE,
    order_details: data,
  };
};

export const updateOrderDetails = (id, addressID,store_id) => {
  return (dispatch) => {
    let url = `products/v1/orders/${id}`;
     
    var config = {
      method: 'patch',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        operation: 'update_pickup_address',
        order: {
          pickup_address_id: addressID,
        },
      },
    };
    axios(config)
      .then((response) => {
        if (response.data.status) {
          if (store_id) {
            dispatch(getOrderDetails(id, store_id));
          } else {
            dispatch(getOrderDetails(id));
          }
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};