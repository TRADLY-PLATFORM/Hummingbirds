import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import classes from './Card.module.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { useHistory } from 'react-router';
import Loader from 'react-loader-spinner';

const Card = () => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();
  const clientSecret = useSelector((state) => state.payment.paymentIntent.client_secret);

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    setLoading(true);
    e.preventDefault();

    if (clientSecret === undefined) {
      toast.error('No data in checkout');
      setLoading(false);

      return false;
    }

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      toast.error('Stripe.js has not yet loaded.');
      setLoading(false);

      return;
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (stripeError) {
      setLoading(false);

      toast.error(stripeError.message);
      return;
    }

    history.push(`/checkout-success`);
  };

  return (
    <>
      {' '}
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
      {loading && (
        <>
          <div className={classes.Backdrop}>
            <Loader
              type="ThreeDots"
              color="var(--primary_color)"
              height={100}
              width={100}
              style={{
                position: 'absolute',
                right: 0,
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '500',
              }}
            />
          </div>
        </>
      )}
      <div className={classes.stripeCardBox}>
        <h4 className={classes.cardHeader}>Enter your card informaion</h4>
        <form id="payment-form" onSubmit={handleSubmit}>
          <label htmlFor="card">Card</label>
          <CardElement id="card" className={classes.cardElement} />

          <button type="submit">Pay</button>
        </form>
      </div>
    </>
  );
};

export default Card;
