import React, { useEffect, useState } from 'react';
import classes from './StoreOrders.module.css';
import { Link, useLocation, useHistory} from 'react-router-dom';

 import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import moment from 'moment';
 
import Loader from 'react-loader-spinner';
import { options, orderStatus } from '../../shared/Status';
import Select from 'react-select';

import groupImage from '../../assets/images/Order/Group 3.png';

 
const StoreOrders = () => {
// 
  const[accountId,setAccountId]=useState(null)

  // reducer
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);

const history = useHistory();
 const location = useLocation();
  const dispatch = useDispatch();
  
    useEffect(() => {
      if (location.state === undefined) {
            dispatch(actions.getOrders(location.search.replace('?', '')));
      }
    }, [dispatch, location]);

    useEffect(() => {
      if (location.state !== undefined) {
        dispatch(actions.getOrders(location.search.replace('?', ''), location.state));
      }
    }, [dispatch, location]);
  

  // function
  // Date convertor
  const changeDateFormat = (timestamp, format) => {
    return moment(timestamp * 1000).format(format);
  };
  // 
    const handleChange = (newValue, actionMeta) => {

       if (newValue.id !== 0) {
         history.push({
           pathname: `/storeorders/${newValue.value.replace(' ', '-')}`,
           state: newValue.id,
           search: location.search.replace('?', ''),
         });
       } else {
          history.push({
            pathname: `/storeorders`,
            search: location.search.replace('?', ''),
            });
       }

     
    };


  return (
    <div className={classes.myOrdersBox}>
      {loading && (
        <>
          <div className={classes.Backdrop}></div>
          <Loader
            type="ThreeDots"
            color="var(--primary_color)"
            height={100}
            width={100}
            style={{
              position: 'absolute',
              right: 0,
              height: '70%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '500',
            }}
          />
        </>
      )}
      <div className={classes.headerLine} style={{ marginBottom: '37px' }}>
        <div className={classes.pageTitle}>
          <h2> Orders </h2>
        </div>

        <div className="  ">
          <div className={classes.SortbyMenu}>
            <p className={classes.filter}>Filter by:</p>
            <Select
              onChange={(newValue, actionMeta) => handleChange(newValue, actionMeta)}
              options={options}
            />
          </div>
        </div>

        {/* <div className="col-md-5 col-sm-12 col-xs-12">
           <span className="glyphicon glyphicon-search form-control-feedback"></span>
           <input type="text" className="form-control input-lg" placeholder="Search transaction" />
         </div> */}
      </div>

      {/* <div className="row">
         <div className="col-md-6">
           <div className="col-md-2">
             <button className={classes.filterDateBtn}>All</button>
           </div>
           <div className="col-md-2">
             <button className={classes.filterDateBtn}>Week</button>
           </div>
           <div className="col-md-2">
             <button className={classes.filterDateBtn}>Month</button>
           </div>
           <div className="col-md-2">
             <button className={classes.filterDateBtn}>Year</button>
           </div>
         </div>
       </div> */}

      {orders.length > 0 && (
        <div className={classes.headerRow}>
          <div className=" ">
            <h4 className={classes.orderHistory}>Order History</h4>
          </div>
          <div className={classes.orderDateBox}>
            <h4 className={classes.orderHistory}>Date</h4>
          </div>
          <div className=" center  ">
            <h4 className={classes.orderHistory}>Price</h4>
          </div>
          <div className={classes.currentStatus}>
            <h4 className={classes.orderHistory}>Current Status</h4>
          </div>
          <div className={classes.changeStatusButton}>
            <h4 className={classes.orderHistory}>Change Status</h4>
          </div>
        </div>
      )}

      <div className="">
        {orders.length > 0 ? (
          orders?.map((order, index) => {
            const { order_details } = order;
            return (
              <div className={classes.transactionContainer} key={index}>
                <div className={classes.orderShortDetails}>
                  <div>
                    <img
                      className={classes.productImg}
                      src={order_details[0].listing.images[0]}
                      alt="orderImage"
                    />
                  </div>

                  <Link
                    className="offTextDecoration"
                    to={{
                      pathname: '/storeorder-details/' + order.id,
                      search: location.search.replace('?', ''),
                    }}
                  >
                    <div style={{ cursor: 'pointer' }} onClick>
                      <p className={classes.transactionDetails}>{order_details[0].listing.title}</p>
                      <p className={classes.bottomDesc}>#Order ID : {order.id}</p>
                      <p className={classes.bottomDesc}>
                        {changeDateFormat(order.created_at, 'DD/MM/YYYY hh:mm')}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className={classes.orderDateBox}>
                  <span className="center">
                    {changeDateFormat(order.created_at, 'DD/MM/YYYY')}{' '}
                  </span>
                </div>
                <div className=" ">
                  {' '}
                  <h4 className="center"> {order.list_total.formatted}</h4>
                </div>
                <div className={classes.currentStatus}>
                  <button className={'btnOutlineGreenStyle text-center '}>
                    {orderStatus(order.order_status)}
                  </button>
                </div>
                <div className={classes.changeStatusButton}>
                  <button className={'btnGreenStyle'}>Change Status</button>
                </div>
              </div>
            );
          })
        ) : (
          <div className={classes.noOrderList}>
            <div>
              <img src={groupImage} alt="" />
            </div>
            <div className={classes.noOrderListMessage}>
              <h4>No Items in Orders List.</h4>
            </div>
            <div>
              <Link to="/" className="btnGreenStyle" style={{ textDecoration: 'none' }}>
                Back To Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOrders;

// <div>
//        <h4 className={classes.lastWeek}>Last Week</h4>
//      </div>

//      <div className={classes.transactionContainer}>
//        <div className="nopadding col-md-4 col-lg-4">
//          <img className={classes.productImg} src={orderIcon} alt="product img" />
//          <p className={classes.transactionDetails}> ABC item title</p>
//          <div className={classes.bottomDesc}>
//            {' '}
//            <span>#OrderID</span>
//            <br />
//            <span>01/01/2021 : 9AM</span>
//          </div>
//        </div>
//        <div className="col-md-2">
//          <span>21 </span>
//          <span>Dec </span>
//          <span>2019 </span>
//        </div>
//        <div className="col-md-2">
//          <h4>$</h4>
//        </div>
//        <div className="col-md-2 nopaddingLeft ">
//          <button className={classes.btnGreenStyle + ' text-center '}>Delivered</button>
//        </div>
//        <div className="col-md-2">
//          <button className={classes.button}>View Receipt</button>
//        </div>
//      </div>

//      <br />

//      <div className={classes.transactionContainer}>
//        <div className="nopadding col-md-4 ">
//          <img className={classes.productImg} src={orderIcon1} alt="product img" />
//          <p className={classes.transactionDetails}> ABC item title</p>
//          <div className={classes.bottomDesc}>
//            {' '}
//            <span>#OrderID</span>
//            <br />
//            <span>01/01/2021 : 9AM</span>
//          </div>
//        </div>
//        <div className="col-md-2">
//          <span>21 </span>
//          <span>Dec </span>
//          <span>2019 </span>
//        </div>
//        <div className="col-md-2">
//          <h4>$</h4>
//        </div>
//        <div className="col-md-2 nopaddingLeft ">
//          <button className={classes.btnGreenStyle + ' text-center '}>Delivered</button>
//        </div>
//        <div className="col-md-2">
//          <button className={classes.button}>View Receipt</button>
//        </div>
//      </div>
