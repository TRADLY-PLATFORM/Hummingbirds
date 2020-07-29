import React, { Component } from 'react'
import { Link } from "react-router-dom";
import classes from "./addProduct.module.css";


import productImg from "../../assets/images/products/productImg.svg";
import addProductIcon from "../../assets/images/products/addProductIcon.svg";

export default class addProduct extends Component {
    render() {
        return (
          <div>
            <Link to="Store">
              <button className={classes.button}>
                <i className="fa fa-arrow-left "></i> back to my store
              </button>
            </Link>
            <br />
            <div className={classes.mycontainer}>
              <div className="row">
                <div className="p-2">
                  <img
                    className={classes.productImg}
                    src={productImg}
                    alt="Product Pic"
                  />
                  <img
                    className={classes.productImg}
                    src={productImg}
                    alt="Product Pic"
                  />
                  
                    <img
                      className={classes.addProductImg}
                      src={addProductIcon}
                      alt="Product Pic"
                    />
                  
                </div>

                <div className="p-2">
                  <p className={classes.productImgRule}>
                    Max. 4 photos per product
                  </p>
                </div>
              </div>

              <div className={classes.productDetails}>
                <div className="form-group mt-2 ">
                  <input
                    className={classes.input + " form-control input-lg "}
                    name="Product Title"
                    type="text"
                    placeholder="Product Title"
                  />
                </div>

                <div className="form-group mt-2 ">
                  <input
                    className={classes.input + " form-control input-lg "}
                    name="Selling Price"
                    type="text"
                    placeholder="Selling Price"
                  />
                </div>

                <div className="form-group mt-2">
                  <input
                    className={classes.input + " form-control input-lg "}
                    name="Stock Quantity"
                    type="text"
                    placeholder="Stock Quantity"
                  />
                </div>

                <div className="form-group mt-2">
                  <input
                    className={classes.input + " form-control input-lg "}
                    name="Category"
                    type="text"
                    placeholder="Category"
                  />
                </div>

                <div className="form-group mt-2">
                  <input
                    className={classes.input + " form-control input-lg "}
                    name="Product Description"
                    type="text"
                    placeholder="Product Description"
                  />
                </div>

                <div className="form-group mt-2">
                  <input
                    className={classes.input + " form-control input-lg "}
                    name="Hash Tag"
                    type="text"
                    placeholder="Hash Tag"
                  />
                </div>
              </div>

              <div className="text-center">
                <button className={classes.btnGreenStyle}>Add Product</button>
              </div>
              <br />
            </div>
          </div>
        );
    }
}
