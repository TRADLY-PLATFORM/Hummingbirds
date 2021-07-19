import React, { useState } from 'react';
import classes from './Cart.module.css';

import axios from '../../axios';
import ShippingAddress from './ShippingAddress/ShippingAddress';
import Payment from './PaymentMethod/Payment';
import MyCart from './MyCart/MyCart';
import CheckOut from './CheckOutPart/CheckOut';

const Cart = () => {
  const [cartList, setCartList] = useState(null);
  axios.get('/v1/payments/stripe/products').then(function (response) {
    // handle success

    console.log(response);
  });
  return (
    <div className="row">
      <MyCart />
      <br />
      <br />
      <div className="col-md-3 col-lg-3">
        <CheckOut />
      </div>
      <br />
      <div className="row">
        <ShippingAddress />
      </div>
      <br />
      <div className="row">
        <Payment />
      </div>
      <br />
    </div>
  );
};

export default Cart;
