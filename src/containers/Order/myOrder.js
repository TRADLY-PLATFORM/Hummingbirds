import React, { Component } from "react";
import classes from "./myOrder.module.css";

import orderIcon1 from "../../assets/images/Order/orderIcon1.svg";
import orderIcon from "../../assets/images/Order/orderIcon.svg";

export default class myOrder extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className={classes.pageTitle + " col-md-4 "}>
            <h2 className={classes.pageTitle}>My Orders </h2>
          </div>

          <div className="col-md-3">
            <div className={classes.SortbyMenu + "  dropdown"}>
              <span className={classes.filter}>Filter by:</span>
              <button
                className={classes.btnGreen + " dropdown-toggle "}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Delivered<span> </span>
                <span className="fa fa-angle-down"></span>
              </button>
              <ul className=" dropdown-menu ">
                <li>
                  <a href="/#">Processed</a>
                </li>
                {/* <li>
                      <a href="/#">B</a>
                    </li>
                    <li>
                      <a href="/#">C</a>
                    </li> */}
              </ul>
            </div>
          </div>

          <div className="col-md-5 col-sm-12 col-xs-12">
            <span className="glyphicon glyphicon-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control input-lg"
              placeholder="Search transaction"
            />
          </div>
        </div>

        <div className="row">
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
        </div>

        <br />
        <br />
        <div className="row">
          <div className="col-md-4">
            <h4 className={classes.orderHistory}>Order History</h4>
          </div>
          <div className="col-md-2 ">
            <h4 className={classes.orderHistory}>Date</h4>
          </div>
          <div className="col-md-2 ">
            <h4 className={classes.orderHistory}>Price</h4>
          </div>
          <div className="col-md-2">
            <h4 className={classes.orderHistory}>Status</h4>
          </div>
        </div>

        <div className={classes.transactionContainer}>
          <div className={" nopadding col-md-4 "}>
            <img
              className={classes.productImg}
              src={orderIcon}
              alt="product img"
            />
            <p className={classes.transactionDetails}>ABC item title</p>
            <div className={classes.bottomDesc}>
              {" "}
              <span>#OrderID</span>
              <br />
              <span>01/01/2021 : 9AM</span>
            </div>
          </div>
          <div className="col-md-2 ">
            <span>21 </span>
            <span>Dec </span>
            <span>2019 </span>
          </div>
          <div className="col-md-2">
            {" "}
            <h4> $ </h4>
          </div>
          <div className="col-md-2 nopaddingLeft ">
            <button className={classes.btnGreenStyle + " text-center "}>
              Delivered
            </button>
          </div>
          <div className="col-md-2">
            <button className={classes.button}>View Receipt</button>
          </div>
        </div>

        <br />

        <div className={classes.transactionContainer}>
          <div className="nopadding col-md-4">
            <img
              className={classes.productImg}
              src={orderIcon1}
              alt="product img"
            />
            <p className={classes.transactionDetails}>ABC item title</p>
            <div className={classes.bottomDesc}>
              {" "}
              <span>#OrderID</span>
              <br />
              <span>01/01/2021 : 9AM</span>
            </div>
          </div>
          <div className="col-md-2">
            <span>21 </span>
            <span>Dec </span>
            <span>2019 </span>
          </div>
          <div className="col-md-2">
            <h4>$</h4>
          </div>
          <div className="col-md-2 nopaddingLeft ">
            <button className={classes.btnGreenStyle + " text-center "}>
              Delivered
            </button>
          </div>
          <div className="col-md-2">
            <button className={classes.button}>View Receipt</button>
          </div>
        </div>

        <br />
        <div>
          <h4 className={classes.lastWeek}>Last Week</h4>
        </div>

        <div className={classes.transactionContainer}>
          <div className="nopadding col-md-4 col-lg-4">
            <img
              className={classes.productImg}
              src={orderIcon}
              alt="product img"
            />
            <p className={classes.transactionDetails}> ABC item title</p>
            <div className={classes.bottomDesc}>
              {" "}
              <span>#OrderID</span>
              <br />
              <span>01/01/2021 : 9AM</span>
            </div>
          </div>
          <div className="col-md-2">
            <span>21 </span>
            <span>Dec </span>
            <span>2019 </span>
          </div>
          <div className="col-md-2">
            <h4>$</h4>
          </div>
          <div className="col-md-2 nopaddingLeft ">
            <button className={classes.btnGreenStyle + " text-center "}>
              Delivered
            </button>
          </div>
          <div className="col-md-2">
            <button className={classes.button}>View Receipt</button>
          </div>
        </div>

        <br />

        <div className={classes.transactionContainer}>
          <div className="nopadding col-md-4 ">
            <img
              className={classes.productImg}
              src={orderIcon1}
              alt="product img"
            />
            <p className={classes.transactionDetails}> ABC item title</p>
            <div className={classes.bottomDesc}>
              {" "}
              <span>#OrderID</span>
              <br />
              <span>01/01/2021 : 9AM</span>
            </div>
          </div>
          <div className="col-md-2">
            <span>21 </span>
            <span>Dec </span>
            <span>2019 </span>
          </div>
          <div className="col-md-2">
            <h4>$</h4>
          </div>
          <div className="col-md-2 nopaddingLeft ">
            <button className={classes.btnGreenStyle + " text-center "}>
              Delivered
            </button>
          </div>
          <div className="col-md-2">
            <button className={classes.button}>View Receipt</button>
          </div>
        </div>
      </div>
    );
  }
}
