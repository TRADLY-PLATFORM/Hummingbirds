import React, { Component } from 'react'
import { Link } from "react-router-dom";
import classes from "./withProduct.module.css";

import productBanner from "../../assets/images/store/productBanner.svg";
import AvatarImage from "../../assets/images/header/avatar.jpg";
import StoreLogo from "../../assets/images/home/store/store1.svg";
import StoreLogo2 from "../../assets/images/home/store/store2.svg";
import AllenSollyLogo from "../../assets/images/home/store/allenSolly.svg";

export default class withProduct extends Component {
    render() {
        return (
          <div>
            <div className="row ">
              <div className={classes.banner}>
                <img src={productBanner} alt="banner" title="banner" />
              </div>
              <div className={classes.mycontainer}>
                <div className="row">
                  <div class="col-md-1 col-lg-1 col-sm-1 col-sx-1">
                    <img
                      className={classes.userAvatar}
                      src={AvatarImage}
                      alt="User Avatar"
                    />
                  </div>
                  <div className="col-md-8 col-lg-8 col-sm-1 col-sx-1">
                    <span>Rahul Store</span>
                    <br />
                    <span>@rahulstore</span>
                  </div>
                  <div>
                    <div className="">
                      <Link to="/store">
                        <button className={classes.btnGreenStyle}>
                          Go to profile store
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className={classes.productFilter}>
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <span className="glyphicon glyphicon-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control input-lg"
                    placeholder="Search Product"
                  />
                </div>

                <div className="col-md-5">
                  <div className={classes.SortbyMenu + " dropdown"}>
                    <button
                      className={classes.SortbyMenu + " dropdown-toggle "}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                      <span className="caret"></span>
                    </button>
                    <ul className=" dropdown-menu ">
                      <li>
                        <a href="/#">A</a>
                      </li>
                      <li>
                        <a href="/#">B</a>
                      </li>
                      <li>
                        <a href="/#">C</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={classes.pageTitle + " col-md-2 "}>
                  <Link to="/store">
                    <button className={classes.btnGreenStyle}>
                      + Add new product
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="container-fluid mt-5">
                <div className="row">
                  <div
                    className={
                      "col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "
                    }
                  >
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4"}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo2}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4"}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4"}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo2}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4 "}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4 "}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4 "}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4 "}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4 "}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-5th-1 col-sm-4 "}>
                    <div className={classes.latestTrend}>
                      <img
                        src={StoreLogo}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>White Full Slive Top</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={AllenSollyLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{" "}
                        <span>Rahul</span>
                        <div className={classes.amountTitle}>$25</div>
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
