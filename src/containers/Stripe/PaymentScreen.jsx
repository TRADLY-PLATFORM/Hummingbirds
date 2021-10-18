import React, { useEffect } from 'react';
import classes from './PaymentScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/auth';
import * as actions from '../../store/actions/index';

import paymentIcon from "../../assets/images/paymentScreen/bankIcon (1).svg"
import waitingIcon from '../../assets/images/paymentScreen/watingIcon (1).svg';
import connectedIcon from '../../assets/images/paymentScreen/successIcon (1).svg';
import errorIcon from '../../assets/images/paymentScreen/failedIcon (1).svg';

const PaymentScreen = () => {
  // reducer
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const userDetails = useSelector((state) => state.auth.userDetails);
  const storeLists = useSelector((state) => state.store.storeLists);
  const stripeConnect = useSelector((state) => state.payment.stripeConnect);
  const logInLink = useSelector((state) => state.payment.logInLink);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actions.getUserDetails(isAuthenticated));
      dispatch(actions.userStoreLists(isAuthenticated));
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (storeLists.length > 0) {
      dispatch(actions.callStripeConnect(storeLists[0].id));
      dispatch(actions.callExpressLogin(storeLists[0].id));
    }
  }, [storeLists]);


  // 
   const connectStripBtnAction =()=> {
  
     if (stripeConnect.stripe_connect_onboarding === false) {
            dispatch(actions.callCreateStripeAccount(storeLists[0].id));

     } else {
       
         window.open(logInLink);
      
    }
  }




  // 

  const renderStripStatusView = () => {
    var imageIcon = paymentIcon;
    var buttonTitle = 'View Dashboard';
    var title = 'Waiting for Stripe verification';
    var subTitle = '';

    if (stripeConnect.stripe_connect_onboarding === false) {
      imageIcon = paymentIcon;
      title = `Countinue to stripe payout  to receive payments`;
      subTitle =
        'We suggest you to open new stripe connect through this link () and come back to this page to authenticate.';
      buttonTitle = 'Connect with Stripe';
    }
    if (
      stripeConnect.payouts_enabled === false &&
      stripeConnect.stripe_connect_onboarding === true
    ) {
      imageIcon = waitingIcon;
      title = 'Waiting for Stripe verification';
      subTitle =
        'Your Stripe connect profile is under verification from Stripe.  If you want to change the information, view the dashboard to change.';
    }
    if (stripeConnect.payouts_enabled === true && stripeConnect.stripe_connect_onboarding === true) {
      imageIcon = connectedIcon;
      title = 'Stripe verification success';
      subTitle =
        'Congratulations, your Stripe account has been connected successfully. Now you can receive payments to the bank account of your choice!';
    }
    if (stripeConnect?.errors?.length !==0) {
      title = 'Stripe verification failed';
      subTitle =
        'Verification failed due to “reason goes here which comes from stripe”. Go to your dashboard and update the relevant details.';
      imageIcon = errorIcon;
      buttonTitle = 'View Dashboard';
    }
 
    return (
      <div className={classes.stripePaymentBox}>
        <div>
          <img src={imageIcon} alt="" />
        </div>
        <div>
          <p className={classes.title}>{title}</p>
          <p className={classes.subTitle}>{subTitle}</p>
        </div>
        <div>
          <button onClick={connectStripBtnAction} className="btnGreenStyle">
            {buttonTitle}
          </button>
          <p className={classes.bottomDesc}>You’ll be redirected to Stripe</p>
        </div>
      </div>
    );
     
  };

  return <div>{Object.keys(stripeConnect).length>0 && renderStripStatusView()}</div>;
};

export default PaymentScreen;
