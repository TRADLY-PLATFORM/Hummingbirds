import React, { useEffect, useState } from 'react';
import classes from './detailOrder.module.css';
import { Link, useParams } from 'react-router-dom';

import productImg from '../../assets/images/products/productImg.svg';
// images
import locationMarker from '../../assets/images/products/locationMarker (1).svg';
import directionImage from '../../assets/images/products/direction (1).svg';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { changeStatus, orderStatus } from '../../shared/Status';
import Modal from '../../components/UI/Modal/Modal';
import Loader from 'react-loader-spinner';

const DetailOrder = () => {
  const [statusModal, setStatusModal] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getOrderDetails(id));
  }, [0]);

  // reducer
  const orderDetails = useSelector((state) => state.order.order_details);
  const loading = useSelector((state) => state.order.loading);

  // function
  const changeDateFormat = (timestamp, format) => {
    return moment(new Date(timestamp * 1000)).format(format);
  };

  // statusOpen
  const statusOpen = () => {
    setStatusModal(true);
  };

  const closeModal = () => {
    setStatusModal(false);
  };

  //
  const changeOrderStatus = (status) => {
    const data = {
      order: {
        status: status,
      },
    };
    dispatch(actions.setNewOrderStatus(data, id));
    setStatusModal(false);
  };

  return (
    <div className={classes.orderDetalsBox}>
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
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </>
      )}
      {orderDetails !== null && (
        <>
          <div className={classes.orderReceipt}>
            <div className={classes.receiptHeader}>
              <h4>Order Details</h4>
              <h4>#{orderDetails.id}</h4>
            </div>
            <div className={classes.receiptDetails}>
              <div className={classes.receiptDescriptionPart}>
                <div className={classes.receiptRow}>
                  <p>Order Id</p>
                  <p>#{orderDetails.id}</p>
                </div>
                <div className={classes.receiptRow}>
                  <p>Timestamp</p>
                  <p>{changeDateFormat(orderDetails.created_at, 'DD,MMM,YYYY')}</p>
                </div>
                <div className={classes.receiptRow} style={{ alignItems: 'start' }}>
                  <p>{orderDetails.shipping_method.name} Address</p>
                  {orderDetails.shipping_method.type === 'delivery' && (
                    <p>
                      <p className={classes.shortAddress} style={{ marginTop: '0' }}>
                        {orderDetails.shipping_address.address_line_1}
                      </p>
                      <p className={classes.formattedAddress}>
                        {orderDetails.shipping_address.formatted_address}
                      </p>
                    </p>
                  )}
                  {orderDetails.shipping_method.type === 'pickup' &&
                    (Object.keys(orderDetails.pickup_address).length !== 0 ? (
                      <p>
                        <p className={classes.shortAddress} style={{ marginTop: '0' }}>
                          {orderDetails.pickup_address.address_line_1}
                          {orderDetails.pickup_address.state}
                        </p>
                        <p className={classes.formattedAddress}>
                          {orderDetails.pickup_address.formatted_address}
                        </p>
                      </p>
                    ) : (
                      <p>
                        <p className={classes.shortAddress} style={{ marginTop: '0' }}>
                          {orderDetails.account.location.city}
                          {orderDetails.account.location.country}
                        </p>
                        <p className={classes.formattedAddress}>
                          {orderDetails.account.location.formatted_address}
                        </p>
                      </p>
                    ))}
                </div>
              </div>
              <div className={classes.receiptAmountPart}>
                <div>
                  {orderDetails.order_details.map((item, index) => {
                    return (
                      <div key={index} className={classes.receiptRow}>
                        <p className="textBold">{item.listing.title}</p>
                        <p className="textColor center">{item.list_price.formatted}</p>
                      </div>
                    );
                  })}
                  <div className={classes.receiptRow}>
                    <p>Delivery</p>
                    <p className="center">{orderDetails.shipping_total.formatted}</p>
                  </div>
                  <div className={classes.receiptRow}>
                    <p className="textBold">Total</p>
                    <p className="textColor center">{orderDetails.grand_total.formatted}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.receiptFooter}>
              <h4>{orderDetails.account.name}</h4>
              <button
                style={{ width: '160px', height: '36px' }}
                className=" btnGreenStyle"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <div className={classes.productsDetailsBox}>
                {orderDetails.order_details.map((item, index) => {
                  return (
                    <div className={classes.productItem} key={Math.random() * 1000}>
                      <div className={classes.productImage}>
                        <img src={item.listing.images[0]} alt="" />
                      </div>
                      <div className={classes.productDescription}>
                        <p>{item.listing.title}</p>
                        <p>
                          <span>Quantity : {item.quantity}</span>{' '}
                          <span className="textColor" style={{ marginLeft: '40%' }}>
                            {item.list_price.formatted}
                          </span>
                        </p>
                        <div className={classes.reviewButtonBox}>
                          <button className="simpleBtn">Review Product</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={classes.Address}>
                <h4 className={classes.AddressHeader}>
                  {' '}
                  {orderDetails.shipping_method.name} Address
                </h4>
                <div className={classes.AddressBox}>
                  <div className={classes.markerImage}>
                    <img src={locationMarker} alt="" />
                  </div>
                  <div>
                    {orderDetails.shipping_method.type === 'delivery' && (
                      <>
                        <p className={classes.shortAddress} style={{ marginTop: '0' }}>
                          {orderDetails.shipping_address.address_line_1}
                        </p>
                        <p className={classes.formattedAddress}>
                          {orderDetails.shipping_address.formatted_address}
                        </p>
                      </>
                    )}
                    {orderDetails.shipping_method.type === 'pickup' && (
                      <>
                        <p className={classes.shortAddress} style={{ marginTop: '0' }}>
                          {orderDetails.account.location.city}
                          {orderDetails.account.location.country}
                        </p>
                        <p className={classes.formattedAddress}>
                          {orderDetails.account.location.formatted_address}
                        </p>
                      </>
                    )}
                  </div>
                  <div className={classes.directionImage}>
                    <img src={directionImage} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="colo-12 col-md-6">
              <div className={classes.TimelineBox}>
                <div className={classes.trackOrder}>
                  <div className={classes.trackOrderHeader}>
                    <p className={classes.timelineHeader}>Track Order</p>
                    <p className={classes.orderIdInTimeline}>Order Id - {orderDetails.id}</p>
                  </div>
                  <div>
                    <p className={classes.AmmountInTimeline}>
                      <span>Amt:</span>{' '}
                      <span className="textColor">{orderDetails.grand_total.formatted}</span>
                    </p>
                  </div>
                </div>
                <div className={classes.timeline}>
                  {/* <div className={classes.progressBar}></div> */}
                  {orderDetails.status_history.map((item, index) => {
                    return (
                      <>
                        <div
                          className={
                            orderDetails.status_history.length - 1 === index
                              ? classes.timelineItem
                              : classes.timelineItemActive
                          }
                          key={index}
                        >
                          <div className={classes.statusHeader}>
                            <p style={{ color: ' #212121' }}> {orderStatus(item.status)}</p>
                          </div>
                          <div className={classes.statusTime}>
                            <p>{changeDateFormat(item.created_at, 'DD,MM,YYYY')}</p>
                            <p> {changeDateFormat(item.created_at, 'hh:mm:ss a')}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className={classes.timelineButtons}>
                <Link
                  to={
                    '/l/' +
                    orderDetails.order_details[0].listing.id +
                    '-' +
                    orderDetails.order_details[0].listing.title
                  }
                  className="btnOutlineGreenStyle"
                  style={{ marginRight: '15px' }}
                >
                  
                  Reorder
                </Link>
                <button
                  onClick={statusOpen}
                  className={classes.btnGreenStyle}
                  style={{ marginLeft: '15px' }}
                >
                  Change Status
                </button>
                <Modal show={statusModal} modalClosed={closeModal}>
                  {' '}
                  <div className={classes.AvailableStatus}>
                    <h4 className={classes.AvailableStatusHeader}>
                      {orderDetails.next_status.length > 0
                        ? 'Available Status'
                        : 'No status Available'}
                    </h4>
                    {orderDetails.next_status.map((button) => {
                      return (
                        <button
                          onClick={() => changeOrderStatus(button)}
                          className="btnGreenStyle"
                          key={Math.random() * 40000}
                        >
                          {changeStatus(button)}
                        </button>
                      );
                    })}
                  </div>
                </Modal>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default DetailOrder;
