import React, { Component } from 'react'
import { Link } from "react-router-dom";
import classes from "./noProduct.module.css";

import noProduct from "../../assets/images/store/noProduct.svg";
import productBanner from "../../assets/images/store/productBanner.svg";
import AvatarImage from "../../assets/images/header/avatar.jpg";

export default class NoProduct extends Component {
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

            <div className={classes.noProduct + " container-fluid"}>
              <div className="col-lg-12">You don't have a product</div>
              <div>
                <Link to="/addProduct">
                  <button className={"btnGreenStyle"}>Add a product</button>
                </Link>
              </div>

              <img src={noProduct} alt="Create Store" title="Create Store" />
            </div>
          </div>
        );
    }
}
