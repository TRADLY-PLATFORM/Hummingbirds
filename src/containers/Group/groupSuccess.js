import React, { Component } from 'react';
import classes from './groupSuccess.module.css';
import{Link} from "react-router-dom";

import groupSuccessImg from '../../assets/images/Group/groupSuccessImg.svg';

export default class groupSuccess extends Component {
    render() {
        return (
            <div>
                 <div className="row">
                 <div className="container-fluid">
                 <div className={classes.groupSuccess + " col-md-12 "}>
                     <img src={groupSuccessImg} className={classes.successImage} alt="group success" title="group success"/>
                     <br />
                     <p className={classes.pageTitel}>Create group is successfly</p>
                     <br />
                     <p className={classes.pageNote}>you can add people to group</p>
                     <br />
                     <Link to="/group">
                     <button className={classes.btnGreenStyle}> Go to my group</button> 
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
