import React from 'react';
import classes from './Payment.module.css';
import visa from '../../../assets/images/cart/visa.svg';
import mastercard from '../../../assets/images/cart/mastercard.svg';

const Payment = () => {
  return (
    <div className="col-md-8 col-lg-8">
      <div className={classes.paymentOptions + ' row '}>
        <h2>Payment Option</h2>
        <div className="optionsBtn">
          <button>Debit/Credit Card</button>
          <button>Netbanking</button>
          <button>Cash on delivery</button>
          <button>Wallet</button>
        </div>
      </div>
      <div className={classes.payment + ' row '}>
        <div className={classes.headerStyle}>
          <img className={classes.paymentCard} src={visa} alt="payment icon" />
          <img className={classes.paymentCard} src={mastercard} alt="payment icon" />
          <h2>Payment</h2>
          <p>Are transaction are secured and encrypted</p>
        </div>
        <div className={classes.paymentInputFields}>
          <div className="form-group">
            <input
              className={classes.input + ' form-control input-lg '}
              type="text"
              placeholder="Name on card"
            />
          </div>

          <div className="form-group">
            <input
              className={classes.input + ' form-control input-lg '}
              type="text"
              placeholder="Credit card number"
            />
          </div>

          <div className="form-group">
            <div className="col-md-6 nopaddingLeft">
              <input
                className={classes.input + ' form-control input-lg  '}
                type="text"
                placeholder="Expiration date"
              />
            </div>
            <div className="col-md-6 nopaddingRight">
              <input
                className={classes.input + ' form-control input-lg  '}
                type="text"
                placeholder="Security code"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
