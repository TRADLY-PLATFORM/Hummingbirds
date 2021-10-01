import React, { useState } from 'react';
import classes from './ShippingAddress.module.css';

const ChangeShippingAddress = ({ shippingAddress, setShippingAddress, ChangeAddress }) => {
  // const [ChangeAddress, setChangeAddress] = useState(false);

  const handleGetData = (e) => {
    let isFiledValid = e.target.value.length > 0;

    if (isFiledValid) {
      const shippingAddressInfo = { ...shippingAddress };
      shippingAddressInfo[e.target.name] = e.target.value;
      setShippingAddress(shippingAddressInfo);
    }
  };
  return (
    <div className={classes.shippingAddress}>
      <div className={classes.headerStyle}>
        <h4>Shipping Address</h4>
      </div>
      <form action="" onsubmit="return false" onSubmit={(e) => ChangeAddress(e)}>
        <div className={classes.inputsField}>
          <div className=" form-group col-md-12 nopaddingLeft ">
            <input
              required
              autoComplete="off"
              onChange={handleGetData}
              className={classes.input}
              type="text"
              name="name"
              placeholder=" Name"
            />
          </div>
          <div className=" form-group col-md-12 nopaddingLeft ">
            <input
              required
              onChange={handleGetData}
              className={classes.input}
              type="text"
              name="phone_number"
              placeholder=" Phone Number"
            />
          </div>

          <div className="form-group ">
            <input
              required
              onChange={handleGetData}
              className={classes.input}
              type="text"
              name="address_line_1"
              placeholder="Address"
            />
          </div>

          <div className="form-group ">
            <div className="col-md-4 nopaddingLeft">
              <input
                required
                onChange={handleGetData}
                className={classes.input}
                type="text"
                name="country"
                placeholder="Country"
              />
            </div>
            <div className="col-md-4 nopadding">
              <input
                required
                onChange={handleGetData}
                className={classes.input}
                type="text"
                name="state"
                placeholder="state"
              />
            </div>
            <div className="col-md-4 nopaddingRight">
              <input
                required
                onChange={handleGetData}
                className={classes.input}
                type="text"
                name="post_code"
                placeholder="Postal code"
              />
            </div>
          </div>
          <div className={classes.saveButton}>
            <button type="submit">Change Address</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeShippingAddress;
