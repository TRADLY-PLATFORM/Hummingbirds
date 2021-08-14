import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../store/selectors/auth';
import * as actions from '../../../store/actions/index';
import classes from "./SignIn.module.css"
import { uuid } from 'uuidv4';
 import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { validateEmail } from '../../../shared/utility'; //countryFilter
 import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';


const SignIn = () => {
  // All state:
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);
  const [dialCode, setDialCode] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showError, setShowError] = useState(false);
 

  const dispatch = useDispatch();
 
  // Actions calling:
  useEffect(() => {
  dispatch(actions.initCountries());
},[])

  
  // Get Data from redux state:
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const message = useSelector((state) => state.auth.message);
  const countryList = useSelector((state) => state.auth.countries);
  const authRedirectPath = ((state) => state.auth.authRedirectPath);
  const verifyId = ((state) => state.auth.verify_id);
  const isAuthenticated = ((state) => selectUserId(state));
  


  // Save in state  values  of input files:
 const handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
   if (name === email) {
       setEmail(value)
   }
   else if (name === password) {
     setPassword(value)
   }
   else if(name === dialCode)
     {setDialCode(value)}
   showError(false)
  };



  // Submit Button Click:
  const onSubmit = (e) => {
    e.preventDefault();

    if (mobile === '') {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Phone number is required');
      }
      return false;
    }
 
    let mobile = mobile;
    let checkNumber = isValidPhoneNumber(`+${mobile}`);
    if (checkNumber !== true) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Invalid phone number.');
      }
      return false;
    } else if ( password === '') {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Password is required');
      }
      return false;
    }

    setShowError(true)

   const uUid = uuid();

    const users = {
      user: {
        uuid: uUid,
        // email:this.state.email,
        mobile: this.state.mobile.slice(this.state.dialCode.length),
        password: this.state.password,
        dial_code: this.state.dialCode,
        type: 'client',
      },
    };
    dispatch(actions.auth(users, isSignUp));

   };


  

  
    //  Redirect path:
     let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
     }
     
// Error showing:
   
// Mobile Input file:
  let defaultCountry = '';
   
  return (
    <>
      <Helmet> 
       <title>Tradly Web - Sign In</title>
          <meta name="description" content=" Widest Range of Mobile & Tablets, Home Appliances, Tv, Audio, Home & Living At Tradly | Best Prices ? Fast DELIVERY | Cash on Delivery ? Effortless Shopping ? Best Customer Care!" />
         </Helmet>
      <div className="row">
        
        <div className={classes.title}>
          Tradly <br /> Marketplace
        </div>
        <Backdrop show={ loading} />
        <Spinner show={loading} />
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
        {authRedirect}

        <div className="col-lg-12 nopaddingLeft">
          <h5 className={classes.titleAccount}>Login to your account</h5>
          <br />
          <form action="" method="post" onSubmit={onSubmit}>
            <div className="form-group mt-4">{defaultCountry}</div>
            <div className="form-group mt-4">
              <input
                className={classes.input}
                name="email"
                type="text"
                placeholder="Email"
                value={ email}
                onChange={ handleChange}
                autoComplete="off"
              />
            </div>
            
            <div className="form-group mt-4">
              <input
                className={classes.input}
                type="password"
                name="password"
                value={ password}
                placeholder="Password"
                onChange={ handleChange}
              />
            </div>

            <div className="form-group mt-5">
              <button type="submit" className={classes.button}>
                Login
              </button>
            </div>

            <div className="text-center mt-5">
              <Link to="/sign-in" className="text-center whiteColor">
                Forgot Password ?
              </Link>
            </div>

            <div className="text-center mt-5">
              <Link to="/sign-up" className="text-center whiteColor">
                Don't have an account ? Sign Up
              </Link>
            </div>
            <div className="text-center mt-5">
              <Link to="/" className="text-center whiteColor">
                <i className="fa fa-home fontIconSize"></i> Back to home
              </Link>
            </div>
          </form>
        </div>
      </div>
      </>
  );
};

export default SignIn;