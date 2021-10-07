import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as actions from '../../../store/actions/index';
import classes from './BuyNow.module.css';
 import Aux from '../../../hoc/Auxiliary/Auxiliary';

// images
import locationMarker from '../../../assets/images/products/locationMarker (1).svg';
import directionImage from '../../../assets/images/products/direction (1).svg';
import groupImage from '../../../assets/images/Order/Group 3.png';
import deleteIcon from '../../../assets/images/cart/deleteIcon (1).svg';

import { toast, ToastContainer, Slide } from 'react-toastify';
import ShippingAddress from '../ShippingAddress/ShippingAddress';
import Modal from '../../../components/UI/Modal/Modal';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import backdrop from '../../../components/UI/Backdrop/Backdrop';
import spinner from '../../../components/UI/Spinner/Spinner';
import ChangeShippingAddress from '../ShippingAddress/ChangeShippingAddress';

const BuyNow = () => {
  // state
   const [paymentMethod, setPaymentMethod] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);
  const [addressForm, setAddressForm] = useState(false);
  const [pickupAddress, setPickupAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({ type: 'delivery' });
  const [openModal, setOpenModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [selectShippingAddress, setSelectShippingAddress] = useState(null);
  const [selectPickupAddress, setSelectPickupAddress] = useState(null);

   const history = useHistory();

  // reducer
  // const productDetails = useSelector((state) => state.product.productDetails);
  // const { listing } = productDetails;

  const payment_methods = useSelector((state) => state.payment.payment_methods);
  const shipping_methods = useSelector((state) => state.payment.shipping_methods);
  const shipping_address = useSelector((state) => state.payment.address_list);
  const currencies = useSelector((state) => state.store.currencies);
  const loading = useSelector((state) => state.cart.loading);
  const paymentLoading = useSelector((state) => state.payment.loading);
  const cartList = useSelector((state) => state.cart.cart_list);
  const { cart, cart_details } = cartList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initCurrencies());
    dispatch(actions.getPaymentMethods());
    dispatch(actions.getShippingMethod());
    dispatch(actions.callEphemeralKey());

  }, [0]);

  useEffect(() => {
    if (currencies.length > 0 && shipping_methods.lenth) {
      setShippingMethod(shipping_methods[0]);
      dispatch(actions.getCartList(currencies[0], shipping_methods[0].id));
    }
  }, [currencies]);

  // function

  const updateCartQuantity = (listing, quantity, increase) => {
    let cartData;
    if (increase) {
      if (quantity < listing.max_quantity) {
        
        if (quantity === listing.stock) {
          toast.error(`There are not ${quantity+1} products in stock`);
          return false;
         } else {
         cartData = {
          cart: {
            listing_id: listing.id,
            quantity: quantity + 1,
          },
        }
        }
          
      } else {
        toast.error('The highest quantity is' + '  ' + listing.max_quantity);
        return false;
      }
    } else {
      if (quantity > 1) {
        cartData = {
          cart: {
            listing_id: listing.id,
            quantity: quantity - 1,
          },
        };
      } else {
        toast.error('Quantity cannot be less than 1');
        return false;
      }
    }
    dispatch(actions.addToCart(cartData, currencies[0]));
    setTimeout(() => {
      dispatch(actions.getCartList(currencies[0], shipping_methods[0].id));
    }, 700);
  };

  // delete Cart
  const deleteSelectedCart = (id) => {
    const data = {
      cart: {
        listing_id: [id],
      },
    };
    dispatch(actions.deleteCart(data, currencies[0],shipping_methods[0].id));
  };

  // Select Payment
  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  // Select Shipping Method
  const selectShippingMethod = (item) => {
    setShippingMethod(item);
    dispatch(actions.getCartList(currencies[0], item.id));
    if (item.type === 'delivery') {
      dispatch(actions.getAddress(item.type));
      setAddressForm(true);
      setPickupAddress(false);
    } else {
      setAddressForm(false);
      setPickupAddress(true);
      setSelectPickupAddress(cart_details[0].listing.location);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  const closeChangeModal = () => {
    setChangeModal(false);
  };

  //Save Address
  const saveAddress = (e) => {
    e.preventDefault();
    const addressData = {
      address: { ...shippingAddress },
    };
    dispatch(actions.addAddress(addressData));
    setTimeout(() => {
      dispatch(actions.getAddress('delivery'));
    }, 700);
    setOpenModal(false);
  };
  //Change Address
  const ChangeAddress = (e) => {
    e.preventDefault();

    const addressData = {
      address: { ...shippingAddress },
    };
    dispatch(actions.changeAddress(addressData,selectShippingAddress));
    setTimeout(() => {
      dispatch(actions.getAddress('delivery'));
    }, 700);
    setChangeModal(false);
  };

  // Select shipping address Item
  const selectShippingAddressItem = (e) => {
    setSelectShippingAddress(e.id);
  };

  // Check Out
  const clickCheckOut = () => {
    if (shippingMethod === null) {
      toast.error('Shipping Method is required');
      return false;
    }
    if (shippingMethod.type === 'delivery') {
      if (selectShippingAddress === null) {
        toast.error('Select Your One shipping Address');
        return false;
      }
    }
    if (paymentMethod === null) {
      toast.error('Payment Method is required');
      return false;
    }

    let data;
    if (shippingMethod.type === 'delivery') {
      data = {
        order: {
          payment_method_id: paymentMethod.id,
          shipping_method_id: shippingMethod.id,
          shipping_address_id: selectShippingAddress,
        },
      };
    } else {
      data = {
        order: {
          payment_method_id: paymentMethod.id,
          shipping_method_id: shippingMethod.id,
         },
      }
    }
    if(paymentMethod.type !== 'stripe'){
      dispatch(actions.clickCheckout(data, () => history.push(`/checkout-success`)));
    }else{
          dispatch(actions.clickCheckout(data, () => history.push(`/card`),'stripe'));
    }

  };

  return (
    <Aux>
      <ToastContainer
        autoClose={2000}
        position="bottom-right"
        transition={Slide}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />

      {(loading || paymentLoading) && (
        <>
          <div className={classes.Backdrop}></div>
          <Loader
            type="ThreeDots"
            color="var(--primary_color)"
            height={100}
            width={100}
            style={{
              position: 'absolute',
              right: 0,
              height: '70%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '500',
            }}
          />
        </>
      )}

      {cartList.cart && (
        <div>
          {cart_details.length > 0 ? (
            <div className={classes.buyNowBox}>
              <div>
                <div className={classes.selectedProductBox}>
                  <h4 className={classes.productBoxHeader}>Your Cart</h4>
                  {cart_details?.length > 0 &&
                    cart_details.map((item, index) => {
                      const { listing } = item;
                      return (
                        <>
                          <div className={classes.cartItemBox} key={index}>
                            <div className={classes.productDescription}>
                              <p className={classes.stockMessage}>
                                {listing.stock && `Only ${listing.stock} products in stock`}
                              </p>
                              <p className={classes.productTitle}>{listing?.title}</p>
                              <p className={classes.price}>{listing.list_price.formatted}</p>
                            </div>
                            <div className={classes.deleteBox}>
                              <button onClick={() => deleteSelectedCart(listing.id)}>
                                <img src={deleteIcon} alt="" />
                              </button>
                            </div>
                            <div className={classes.quantityButtons}>
                              <button
                                onClick={() => updateCartQuantity(listing, item.quantity, false)}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(listing, item.quantity, true)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}{' '}
                </div>
                <div className={classes.ShippingMethodBox}>
                  <h4 className={classes.shippingMethodBoxHeader}>Select Shipping Method</h4>
                  <div className={classes.shippingMethodButtons}>
                    {shipping_methods?.map((method, index) => {
                      return (
                        <button
                          key={index}
                          className={
                            shippingMethod?.id === method.id ? 'btnGreenStyle' : 'btnOutlineGreenStyle'
                          }
                          onClick={() => selectShippingMethod(method)}
                        >
                          {method.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {pickupAddress && (
                  <div className={classes.pickupAddress}>
                    <h4 className={classes.pickupAddressHeader}>Pickup Address</h4>
                    <div className={classes.pickupAddressBox}>
                      <div className={classes.markerImage}>
                        <img src={locationMarker} alt="" />
                      </div>
                      <div>
                        <p className={classes.shortAddress}>
                          {cart_details && `${cart_details[0].listing.location.city}`}
                          {cart_details && `${cart_details[0].listing.location.country}`}
                        </p>
                        <p className={classes.formattedAddress}>
                          {cart_details[0].listing.location.formatted_address}
                        </p>
                      </div>
                      <div className={classes.directionImage}>
                        <img src={directionImage} alt="" />
                      </div>
                    </div>
                  </div>
                )}
                {addressForm && (
                  <div className={classes.shippingAddressForm}>
                    <h4 className={classes.shippingAddressHeader}>Shipping Address</h4>
                    <div>
                      {shipping_address.length > 0 ? (
                        <div>
                          {shipping_address.map((address, index) => {
                            return (
                              <div
                                key={index}
                                className={
                                  address.id === selectShippingAddress
                                    ? classes.selectedshippingAddressItem
                                    : classes.shippingAddressItem
                                }
                                onClick={() => selectShippingAddressItem(address)}
                              >
                                <div className={classes.markerImage}>
                                  <img src={locationMarker} alt="" />
                                </div>
                                <div>
                                  <p className={classes.shortAddress}>
                                    {address.address_line_1}
                                    {address.state}
                                  </p>
                                  <p className={classes.formattedAddress}>
                                    {address.formatted_address}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          <button
                            style={{ marginTop: '10px' }}
                            className={classes.addAddressButton}
                            onClick={() => setOpenModal(true)}
                          >
                            Add New Address +
                          </button>
                          {selectShippingAddress && (
                            <button
                              style={{ marginTop: '10px', marginLeft: '20px' }}
                              className={classes.addAddressButton}
                              onClick={() => setChangeModal(true)}
                            >
                              Edit Address
                            </button>
                          )}
                          <Modal show={openModal} modalClosed={closeModal}>
                            <div className={classes.shippingAddressForm}>
                              <ShippingAddress
                                shippingAddress={shippingAddress}
                                setShippingAddress={setShippingAddress}
                                saveAddress={saveAddress}
                              />
                            </div>
                          </Modal>
                          <Modal show={changeModal} modalClosed={closeChangeModal}>
                            <div className={classes.shippingAddressForm}>
                              <ChangeShippingAddress
                                shippingAddress={shippingAddress}
                                setShippingAddress={setShippingAddress}
                                ChangeAddress={ChangeAddress}
                              />
                            </div>
                          </Modal>
                        </div>
                      ) : (
                        <div>
                          <button
                            className={classes.addAddressButton}
                            onClick={() => setOpenModal(true)}
                          >
                            Add New Address +
                          </button>
                          <Modal show={openModal} modalClosed={closeModal}>
                            <div className={classes.shippingAddressForm}>
                              <ShippingAddress
                                shippingAddress={shippingAddress}
                                setShippingAddress={setShippingAddress}
                                saveAddress={saveAddress}
                              />
                            </div>
                          </Modal>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className={classes.paymentMethodBox}>
                  <h4 className={classes.paymentMethodBoxHeader}>Select Payment Method</h4>
                  <div className={classes.paymentMethodButtons}>
                    {payment_methods?.map((method, index) => {
                      return (
                        <button
                          key={index}
                          className={
                            paymentMethod?.id === method.id ? 'btnGreenStyle' : 'btnOutlineGreenStyle'
                          }
                          onClick={() => selectPaymentMethod(method)}
                        >
                          {method.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div>
                <div className={classes.orderSummary}>
                  <h4 className={classes.orderSummaryHeader}>Order Summary</h4>

                  <div>
                    {cart_details?.map((item, index) => {
                      const listing = item.listing;
                      return (
                        <div className={classes.productShortDescription} key={index}>
                          <img src={listing?.images[0]} alt="" />
                          <div className={classes.shortDescription}>
                            <p className={classes.shortDescriptionTitle}>{listing.title}</p>
                            <p className={classes.shortDescriptionStoreName}>
                              {listing.account.name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {cart_details?.map((item, index) => {
                      const { listing, quantity } = item;
                      return (
                        <p
                          className={classes.totalQuantity}
                          key={index}
                        >{`${quantity}  X  ${listing.title}`}</p>
                      );
                    })}
                  </div>
                  <div className={classes.allTotalResults}>
                    <div className={classes.totalAmount}>
                      <p>Total</p>
                      <p>{cart?.list_total.formatted}</p>
                    </div>
                    <div className={classes.totalAmount}>
                      <p>Shipping</p>
                      <p>{cart?.shipping_total.formatted}</p>
                    </div>
                    <div className={classes.totalAmount}>
                      <p>Subtotal</p>
                      <p>{cart?.grand_total.formatted}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <button className={classes.checkoutButton} onClick={clickCheckOut}>
                    <span style={{ marginRight: '10px' }}>Checkout</span>{' '}
                    <span>{cart?.grand_total.formatted}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={classes.noCartList}>
              <div>
                <img src={groupImage} alt="" />
              </div>
              <div className={classes.noCartListMessage}>
                <h4>No Items in Cart List.</h4>
              </div>
              <div>
                <Link to="/" className="btnGreenStyle" style={{ textDecoration: 'none' }}>
                  Back To Home
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </Aux>
  );
};

export default BuyNow;
