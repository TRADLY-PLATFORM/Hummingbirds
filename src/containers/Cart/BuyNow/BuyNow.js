import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import * as actions from '../../../store/actions/index';
import classes from "./BuyNow.module.css"
import { RadioGroup, RadioButton } from 'react-radio-buttons';

// images
import locationMarker from '../../../assets/images/products/locationMarker (1).svg';
import directionImage from '../../../assets/images/products/direction (1).svg';
import { toast, ToastContainer ,Slide} from 'react-toastify';

const BuyNow = () => {
  // state
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod,setPaymentMethod]=useState(null)

  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initProductDetails(location.state.product_id), true);
    dispatch(actions.getPaymentMethods());
  }, [0]);

  // reducer
  const productDetails = useSelector((state) => state.product.productDetails);
  const { listing } = productDetails;

  const payment_methods = useSelector((state)=>state.payment.payment_methods)
 
  // function
  const selectPaymentMethod = (e) => {
   setPaymentMethod(e.id)
  }

  const clickCheckOut = () => {
    if (paymentMethod === null) {
      toast.error('Payment Method is required');
      return false
    }
      const data = {
        order: {
          payment_method_id: paymentMethod,
          quantity: quantity,
          type: 'events',
        },
      };
        dispatch(actions.clickCheckout(data));

  }

  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        transition={Slide}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <div className={classes.buyNowBox}>
        <div className={classes.selectedProductBox}>
          <h4 className={classes.productBoxHeader}>Select Product</h4>
          <div className={classes.productQuantityBox}>
            <div className={classes.productDescription}>
              <p className={classes.stockMessage}>
                {listing?.stock && `Only ${listing?.stock} products in stock`}
              </p>
              <p className={classes.productTitle}>{listing?.title}</p>
              <p className={classes.price}>{listing?.list_price.formatted}</p>
            </div>
            <div className={classes.quantityButtons}>
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
              <span>{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(quantity < listing?.stock ? quantity + 1 : listing?.stock)
                }
              >
                +
              </button>
            </div>
          </div>
          <div className={classes.addressBox}>
            <div className={classes.markerImage}>
              <img src={locationMarker} alt="" />
            </div>
            <div>
              <p className={classes.shortAddress}>
                {listing?.location.city && `${listing?.location.city}`}
                {listing?.location.country && `${listing?.location.country}`}
              </p>
              <p className={classes.formattedAddress}>{listing?.location.formatted_address}</p>
            </div>
            <div className={classes.directionImage}>
              <img src={directionImage} alt="" />
            </div>
          </div>
        </div>
        <div>
          <div className={classes.orderSummary}>
            <h4 className={classes.orderSummaryHeader}>Order Summary</h4>
            <div className={classes.productShortDescription}>
              <img src={listing?.images[0]} alt="" />
              <div className={classes.shortDescription}>
                <p className={classes.shortDescriptionTitle}>{listing?.title}</p>
                <p className={classes.shortDescriptionStoreName}>{listing?.account.name}</p>
                <p className={classes.shortDescriptionAddress}>
                  <img src={locationMarker} alt="" />{' '}
                  <span>
                    {listing?.location.formatted_address.length < 15
                      ? listing?.location.formatted_address
                      : listing?.location.country}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <p className={classes.totalQuantity}>{`${quantity} X ${listing?.title}`}</p>
            </div>
            <div className={classes.paymentMethods}>
              <h4 className={classes.orderSummaryHeader}>Select Payment Method</h4>
              <div className={classes.radioButtons + 'radio'}>
                {payment_methods.length > 0 &&
                  payment_methods.map((item, key) => {
                    return (
                      <div className={classes.radioButton} key={key}>
                        <input
                          type="radio"
                          name="payment_method"
                          id="input"
                          value={item.name}
                          onChange={() => selectPaymentMethod(item)}
                        />
                        <p> {item.name}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={classes.totalAmount}>
              <p>Total</p>
              <p>{`${listing?.list_price.formatted.split(' ')[0]} ${
                Number(listing?.list_price.amount) * quantity
              }`}</p>
            </div>
          </div>
          <div>
            <button className={classes.checkoutButton} onClick={clickCheckOut}>
              Checkout{' '}
              {`${listing?.list_price.formatted.split(' ')[0]} ${
                Number(listing?.list_price.amount) * quantity
              }`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNow;