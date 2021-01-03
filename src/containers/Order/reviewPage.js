import React, { Component } from 'react';
import classes from "./reviewPage.module.css";
import { Link } from "react-router-dom";

import productImg from "../../assets/images/products/productImg.svg";
import starReview from "../../assets/images/Order/starReview.svg";
import yourPhoto from "../../assets/images/Order/yourPhoto.svg";

export default class reviewPage extends Component {
    render() {
        return (
          <div>
            <Link to="/myorder">
              <button className={classes.button}>
                <i className="fa fa-arrow-left "></i> back to my store
              </button>
            </Link>

            <br />
            <br />
            <br />

            <div className="row">
              <div className="col-md-12">
                <div className={classes.productreview}>
                  <div className="col-md-12  col-sm-12 ">
                    <div className={classes.reviewContainer}>
                      <img
                        className={classes.productImg + " nopadding "}
                        src={productImg}
                        alt="Product Pic"
                      />
                      <div className="col-md-8">
                        <div className={classes.transactionDetails}>
                          <p>White Full Slive Top</p>
                          <p>Zara</p>
                          <p>unit : 1</p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <p className={classes.productPrice}>2500/-</p>
                      </div>
                    </div>
                    <div className={classes.centerd}>
                      <button className={classes.reviewProduct}>
                        Review Product
                      </button>
                    </div>
                  </div>
                </div>

                <div className={classes.rate}>
                  <div className="col-md-5">
                    <div className={classes.rateContainer}>
                      <p> What is you rating?</p>
                      <div className={classes.rating}>
                        <span>
                          {" "}
                          <img
                            className={classes.ratingStar}
                            src={starReview}
                            alt="Product Pic"
                          />
                        </span>
                        <span>
                          {" "}
                          <img
                            className={classes.ratingStar}
                            src={starReview}
                            alt="Product Pic"
                          />
                        </span>
                        <span>
                          {" "}
                          <img
                            className={classes.ratingStar}
                            src={starReview}
                            alt="Product Pic"
                          />
                        </span>
                        <span>
                          {" "}
                          <img
                            className={classes.ratingStar}
                            src={starReview}
                            alt="Product Pic"
                          />
                        </span>
                        <span>
                          {" "}
                          <img
                            className={classes.ratingStar}
                            src={starReview}
                            alt="Product Pic"
                          />
                        </span>
                      </div>

                      <p className={classes.titleProduct}>
                        Share your feedback
                      </p>
                      <br />

                      <div className={classes.reviewUpBtn}>
                        <button className={classes.btnGreenStyle}>
                          Excelent Service
                        </button>
                        <button className={classes.btnGreenStyle}>
                          Great Product
                        </button>
                      </div>

                      <div className={classes.reviewBtn}>
                        <button className={classes.btnGreenStyle}>
                          Good Packaging
                        </button>
                        <button className={classes.btnGreenStyle}>
                          Fast Responses
                        </button>
                      </div>

                      <input
                        className={classes.input + " form-control input-lg "}
                        name="Hash Tag"
                        type="text"
                        placeholder="Write your thank you note....."
                      />
                      <div className="row">
                        <img
                          className={classes.addPhoto}
                          src={yourPhoto}
                          alt="Product Pic"
                        />
                      </div>
                      <div className="row">
                        <button className={classes.btnGreen}>
                          SEND REVIEW
                        </button>
                        <div className={classes.centerd}>
                          <button className={classes.cancelReview}>
                            Cancel Review
                          </button>
                        </div>
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
