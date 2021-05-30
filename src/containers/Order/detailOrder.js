import React, { Component } from 'react';
import classes from './detailOrder.module.css';
import { Link } from 'react-router-dom';

import productImg from '../../assets/images/products/productImg.svg';

export default class detailOrder extends Component {
  render() {
    return (
      <div>
        <Link to="/my-transaction">
          <button className={classes.button}>
            <i className="fa fa-arrow-left "></i> back to transaction
          </button>
        </Link>

        <br />
        <br />
        <br />

        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className={classes.productreview}>
              <div className="col-md-12 col-lg-12 col-sm-12 ">
                <div className={classes.reviewContainer}>
                  <img
                    className={classes.productImg + ' nopadding '}
                    src={productImg}
                    alt="Product Pic"
                  />
                  <div className="col-md-8 col-lg-8">
                    <div className={classes.transactionDetails}>
                      <p>White Full Slive Top</p>
                      <p>Zara</p>
                      <p>unit : 1</p>
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-8">
                    <p className={classes.productPrice}>2500/-</p>
                  </div>
                </div>
                <div className={classes.centerd}>
                  <button className={classes.reviewProduct}>Review Product</button>
                </div>
              </div>

              <div className={classes.productreview}>
                <div className="col-md-12 col-lg-12 col-sm-12 ">
                  <div className={classes.reviewContainer}>
                    <img
                      className={classes.productImg + ' nopadding '}
                      src={productImg}
                      alt="Product Pic"
                    />
                    <div className="col-md-8 col-lg-8">
                      <div className={classes.transactionDetails}>
                        <p>White Full Slive Top</p>
                        <p>Zara</p>
                        <p>unit : 1</p>
                      </div>
                    </div>
                    <div className="col-md-8 col-lg-8">
                      <p className={classes.productPrice}>2500/-</p>
                    </div>
                  </div>
                  <div className={classes.centerd}>
                    <button className={classes.reviewProduct}>Review Product</button>
                  </div>
                </div>
              </div>
              <div className={classes.reviewAll}>
                <button className={classes.btnReviewAll}>Review All Product</button>
              </div>
              <div className={classes.shippingAddres}>
                <h2>shipping address</h2>
                <hr />
                <h2>JK Bassser</h2>
                <h4>Icon City, Petaling Jeya, Selangor, MY</h4>
                <h4>Mobile: +6012345678</h4>
              </div>
            </div>

            <div className={classes.non}>
              <div className="col-md-5">
                <div className={classes.trackOrderContainer}>
                  <div className={classes.trackOrderLeft}>
                    <div className={classes.trackOrder}>
                      <span>Track Order</span>
                      <br />
                      <span>Order ID - 123455</span>

                      <br />
                      <br />
                      <br />
                      <span className={classes.trackingHeader}>Order Placed</span>
                      <br />
                      <span className={classes.trackingDetail}>
                        Order#123455 from Fashion Point
                      </span>
                      <br />
                      <br />
                      <br />
                      <span className={classes.trackingHeader}>Payment Confirmed</span>
                      <br />
                      <span className={classes.trackingDetail}>Payment Confirmed Status</span>
                      <br />
                      <br />
                      <br />
                      <span className={classes.trackingHeader}>Processed</span>
                      <br />
                      <span className={classes.trackingDetail}>Processed Status</span>
                      <br />
                      <br />
                      <br />
                      <span className={classes.trackingHeader}>Shipped</span>
                      <br />
                      <span className={classes.trackingDetail}>Delivered Status</span>
                      <br />
                      <br />
                      <br />
                      <span className={classes.trackingHeader}>Delivered</span>
                      <br />
                      <span className={classes.trackingDetail}>Delivered Status</span>
                    </div>
                  </div>
                  <div className={classes.trackOrderRight}>
                    <div className={classes.orderAmont}>
                      <span>Amt</span>

                      <span>`2500/-</span>
                      <br />

                      <br />
                      <br />
                      <br />
                      <div className={classes.trackOrderRightStyle}>
                        <span>05/08/2019 </span>
                        <br />
                        <span>11:10 AM</span>
                        <br />
                        <br />
                        <br />
                        <span>05/08/2019</span>
                        <br />
                        <span>11:10 AM</span>
                        <br />
                        <br />
                        <br />
                        <span>05/08/2019</span>
                        <br />
                        <span>11:10 AM</span>
                        <br />
                        <br />
                        <br />
                        <span>05/08/2019</span>
                        <br />
                        <span>11:10 AM</span>
                        <br />
                        <br />
                        <br />
                        <span>05/08/2019</span>
                        <br />
                        <span>11:10 AM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className={classes.centerd}>
                    <button className={classes.btnGreen}>SEND REVIEW</button>
                    <button className={classes.btnGreen}>Leave Feedback</button>
                  </div>
                  <div className={classes.centerd}>
                    <button className={classes.cancelReview}>Cancel Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
