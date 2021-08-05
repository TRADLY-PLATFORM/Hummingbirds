import React, { useState } from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import classes from './CheckOut.module.css';
import doneImage from '../../../assets/images/Done.svg';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';

const CheckOut = () => {
  const dispatch = useDispatch();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const showResult = () => {
    setOrderSuccess(true);
  };
  const closeResult = () => {
    setOrderSuccess(false);
  };

  const payment = () => {
    dispatch(actions.connectStripe());
  };

  return (
    <div className={classes.totalCart}>
      <div className={classes.totalHeader + ' text-uppercase '}>
        <h4>Total</h4>
      </div>
      <div className={classes.checkOutBodyPart}>
        <div className="itemPrice">
          <span> item(4) </span>
          <span className={classes.price}>100$</span>
        </div>
        <br />
        <span>Estimated Shiping </span>
        <span className={classes.price}>20$</span>
        <br />
        <br />
        <br />
        <br />
        <span>
          <strong>Subtotal</strong> (befor tax){' '}
        </span>
        <span className={classes.price}>120$</span>
        <br />
        <br />
        <div className="text-center">
          <button className={classes.btnGreenStyle} onClick={showResult}>
            check out
          </button>
          <br />
          <br />
          <p>
            {' '}
            100% Satisfaction Guarantee.
            <br />
            Easy Exchanges & Returns.
          </p>
        </div>
        <p></p>
        <span></span>
      </div>
      <Modal show={orderSuccess} modalClosed={closeResult} modalStyle={classes.Modal}>
        <div className={classes.orderSuccessText}>
          <img src={doneImage} alt="" />
          <h4>
            Your order has been placed <br /> successfully
          </h4>
        </div>
        <div className={classes.orderSuccessButton}>
          <button className={classes.continue}>Continue Shopping</button>
          <button className={classes.goToOrders}> Go to my orders</button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckOut;
