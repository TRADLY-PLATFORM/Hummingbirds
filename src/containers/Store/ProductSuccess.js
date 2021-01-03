import React, { Component } from 'react';
import classes from './StoreSuccess.module.css';
import{Link} from "react-router-dom";

import noProduct from '../../assets/images/store/noProduct.svg';

export default class NoProduct extends Component {
    render() {
        return (
            <div>
                 <div className="row">
                 <div className="container-fluid">
                 <div className={classes.groupSuccess + " col-md-12 "}>
                     <img src={noProduct} className={classes.successImage} alt="group success" title="group success"/>
                     <br />
                     <p className={classes.pageTitel}>your product has been added</p>
                     <br />
                     <p className={classes.pageNote}>you can see your product at my store and profile store</p>
                     <br />
                     <Link to="/store">
                     <button className={classes.btnGreenStyle}> Go to profile store</button> 
                     </Link>
                     <br />
                     < Link to = "/home" >
                     <p className={classes.pageNote}>Go to home</p>
                     </Link>
                     <br />
                 </div>
                 </div>
                 </div>
            </div>
        )
    }
}
