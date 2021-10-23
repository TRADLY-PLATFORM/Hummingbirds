import React, { Component } from 'react';
import classes from './StoreSuccess.module.css';
import{Link} from "react-router-dom";

import groupSuccessImg from '../../assets/images/Group/groupSuccessImg.svg';

export default class storeSuccess extends Component {
    render() {
        return (
                   
                 <div className={classes.groupSuccess + " col-md-12 "}>
                     <img src={groupSuccessImg} className={classes.successImage} alt="group success" title="group success"/>
                     <br />
                     <p className={classes.pageTitel}>Store has been created successfully</p>
                     <br />
                     <p className={classes.pageNote}>Now, you can add and sell your product in store.</p>
                     <br />
                     <Link to="/store">
                     <button className={classes.btnGreenStyle}> Go to my store</button> 
                     </Link>
                     <br />
                     < Link to = "/home" >
                     <p className={classes.pageNote}>Go to home</p>
                     </Link>
                     <br />
                 </div>
                   
         )
    }
}
