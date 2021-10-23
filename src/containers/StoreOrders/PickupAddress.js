/* eslint-disable react/prop-types */
import React  from 'react';
import classes from './PickupAddress.module.css';

const PickupAddress = ({ pickupAddress, setPickupAddress, saveAddress }) => {
  // const [saveAddress, setSaveAddress] = useState(false);

  const handleGetData = (e) => {
    let isFiledValid = e.target.value.length > 0;

    if (isFiledValid) {
      const pickupAddressInfo = { ...pickupAddress };
      pickupAddressInfo[e.target.name] = e.target.value;
      setPickupAddress(pickupAddressInfo);
    }
  };
  return (
    <div className={classes.shippingAddress}>
      <div className={classes.headerStyle}>
        <h4>Pickup Address</h4>
      </div>
      <form action="" onsubmit="return false" onSubmit={(e) => saveAddress(e)}>
        <div className={classes.inputsField}>
          <div className=" form-group col-xs-12 col-sm-12 col-md-12 nopadding ">
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
          <div className="form-group col-xs-12 col-sm-12 col-md-12 nopadding ">
            <input
              required
              onChange={handleGetData}
              className={classes.input}
              type="text"
              name="phone_number"
              placeholder=" Phone Number"
            />
          </div>

          <div className="form-group col-xs-12 col-sm-12 col-md-12 nopadding ">
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
            <div className="col-xs-12 nopadding col-md-3  mr-10">
              <input
                required
                onChange={handleGetData}
                className={classes.input}
                type="text"
                name="country"
                placeholder="Country"
              />
            </div>
            <div className="col-xs-12 nopadding  col-md-3  mr-10">
              <input
                required
                onChange={handleGetData}
                className={classes.input}
                type="text"
                name="state"
                placeholder="state"
              />
            </div>
            <div className="col-xs-12  nopadding  col-md-3">
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
            <button type="submit">Set Address</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PickupAddress;
