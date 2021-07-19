import React from 'react';
import classes from './CheckOut.module.css';

const CheckOut = () => {
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
          <button className={classes.btnGreenStyle}>check out</button>
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
    </div>
  );
};

export default CheckOut;
