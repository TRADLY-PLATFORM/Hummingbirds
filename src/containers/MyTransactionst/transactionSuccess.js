import React, { Component } from 'react'
import classes from './transactionSuccess.module.css';
import{Link} from "react-router-dom";

import transcationSuccessImg from '../../assets/images/MyTransaction/transactionSuccessImg.svg';

export default class transactionSuccess extends Component {
    render() {
        return (
            <div>
                 <div className="row">
                 <div className="container-fluid">
                 <div className={classes.groupSuccess + " col-md-12 "}>
                     <img src={transcationSuccessImg} className={classes.successImage} alt="group success" title="group success"/>
                     <br />
                     <p className={classes.pageTitel}>Your transaction is successfully.</p>
                     <br />
                     <p className={classes.pageNote}>You can track the delivery in the “My Transaction” page.</p>
                     <br />
                     <Link to="#">
                     <button className={classes.btnGreenStyle}>Conntinue Shopping</button> 
                     </Link>
                     <br />
                     < Link to = "/home" >
                     <p className={classes.pageNote}>Go to home</p>
                     </Link>
                 </div>
                 </div>
                 </div>
            </div>
        )
    }
}
