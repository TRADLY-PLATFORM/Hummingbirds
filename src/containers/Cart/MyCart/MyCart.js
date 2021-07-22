import React from 'react';
import classes from './MyCart.module.css';
import transactionImage from '../../../assets/images/MyTransaction/transactionImage.svg';
import storeIcon from '../../../assets/images/MyTransaction/storeIcon.svg';

const MyCart = () => {
  return (
    <>
      <h2 className="text-capitalize">my cart</h2>
      <br />
      <br />
      <div className="row">
        <div className="col-md-8 col-lg-8" style={{ paddingLeft: '0px ' }}>
          <div className="col-lg-6 col-md-6">
            <p className={classes.cartItem + ' text-uppercase '}>your cart</p>
          </div>
          <div className="col-lg-3 col-md-3">
            <p className="text-uppercase">qty</p>
          </div>
          <div className="col-lg-3 col-md-3" style={{ textAlign: 'center' }}>
            <p className="text-uppercase">price</p>
          </div>
        </div>
      </div>

      <div className="col-md-8" style={{ paddingLeft: '0px' }}>
        <div className={classes.cartContainer}>
          <div className={' col-lg-6 col-md-6 nopadding '}>
            <img className={classes.productImg} src={transactionImage} alt="product img" />
            <p className={classes.transactionDetails}>White Full Slive Top</p>
            <div className={classes.bottomDesc}>
              <img src={storeIcon} alt="Woman accesories" title="Woman accesories" />{' '}
              <span>Rahul</span>
            </div>
          </div>

          <div className={classes.QTY + ' col-lg-3 col-md-3 '}>
            <div className={classes.quantity}>
              <button className={classes.countButton}>
                <p className={classes.minus}>-</p>
              </button>
              <p style={{ marginTop: '12px' }}> 1 </p>
              <button className={classes.countButton}>
                <p className={classes.plus}>+</p>
              </button>
            </div>
            <button className={classes.removeItem}>remove item</button>
          </div>

          <div className="col-lg-3 col-md-3">
            <p className={classes.itemPrice}>
              <span style={{ marginRight: '10px' }}>$</span>245{' '}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCart;
