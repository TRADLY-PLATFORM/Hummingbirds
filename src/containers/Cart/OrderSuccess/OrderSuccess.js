import React, { useEffect } from 'react';
import classes from "./OrderSuccess.module.css"

import successImage from "../../../assets/images/Order/Success.svg"
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { useDispatch } from 'react-redux';


const OrderSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initCurrencies());
    }, [0]);

  return (
    <div className={classes.orderSuccessBox}>
      <div>
        <img src={successImage} alt="" />
      </div>
      <div className={classes.successMessage}>
        <h4>Thank you, Your Order is successful.</h4>
      </div>
      <div >
        <Link to="/" className="btnGreenStyle" style={{textDecoration:"none"}}>Back To Home</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;