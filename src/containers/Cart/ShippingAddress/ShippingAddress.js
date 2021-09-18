import React, { useState } from 'react';
import classes from './ShippingAddress.module.css';

const ShippingAddress = () => {
  const [shippingAddress, setShippingAddress] = useState({});
  const [saveAddress, setSaveAddress] = useState(false);

  const handleGetData = (e) => {
    let isFiledValid = e.target.value.length > 0;

    if (isFiledValid) {
      const shippingAddressInfo = { ...shippingAddress };
      shippingAddressInfo[e.target.name] = e.target.value;
      setShippingAddress(shippingAddressInfo);
    }
  };
   return (
    <div className="col-md-8 ">
      <div className={classes.shippingAddress}>
        {' '}
        <div className={classes.headerStyle}>
          <h2>Shipping Address</h2>
          <p>Select your address that match your card or payment method</p>
        </div>
        <div className={classes.inputsField}>
          <div className=" form-group col-md-6 nopaddingLeft ">
            <input
              onBlur={handleGetData}
              className={classes.input + ' form-control input-lg '}
              type="text"
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <div className=" form-group col-md-6 nopaddingRight">
            <input
              onBlur={handleGetData}
              className={classes.input + ' form-control input-lg '}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
          </div>

          <div className="form-group ">
            <input
              onBlur={handleGetData}
              className={classes.input + ' form-control input-lg '}
              type="text"
              name="company"
              placeholder="company"
            />
          </div>

          <div className="form-group ">
            <input
              onBlur={handleGetData}
              className={classes.input + ' form-control input-lg '}
              type="text"
              name="nameOnCard"
              placeholder="Name on card"
            />
          </div>

          <div className="form-group">
            <input
              onBlur={handleGetData}
              className={classes.input + ' form-control input-lg '}
              type="text"
              name="apartment"
              placeholder="Apartment, Suite, etc"
            />
          </div>

          <div className="form-group ">
            <input
              onBlur={handleGetData}
              className={classes.input + ' form-control input-lg '}
              type="text"
              name="city"
              placeholder="City"
            />
          </div>

          <div className="form-group ">
            <div className="col-md-4 nopaddingLeft">
              <input
                onBlur={handleGetData}
                className={classes.input + ' form-control input-lg  '}
                type="text"
                name="country"
                placeholder="Country"
              />
            </div>
            <div className="col-md-4 nopadding">
              <input
                onBlur={handleGetData}
                className={classes.input + ' form-control input-lg '}
                type="text"
                name="province"
                placeholder="Province"
              />
            </div>
            <div className="col-md-4 nopaddingRight">
              <input
                onBlur={handleGetData}
                className={classes.input + ' form-control input-lg '}
                type="text"
                name="postalCode"
                placeholder="Postal code"
              />
            </div>
          </div>
        </div>
        <div className={classes.formPadding}>
          <form action="/action_page.php" method="get">
            <input type="checkbox" name="saveAddress" value="save"></input>
            <label style={{ marginLeft: '10px' }} for="vehicle1">
              {' '}
              Save my information for next payment
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
