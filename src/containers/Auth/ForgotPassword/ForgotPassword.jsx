import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import classes from './ForgotPassword.module.css';
import * as actions from '../../../store/actions/index';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { validateEmail } from '../../../shared/utility';
import { isValidNumber } from 'libphonenumber-js';
import Loader from 'react-loader-spinner';

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  const [dialCode, setDialCode] = useState(null);
    const [showError, setShowError] = useState(false);


  //
  const dispatch = useDispatch();

  //
  useEffect(() => {
    dispatch(actions.setGeneralConfigsData());
    dispatch(actions.initCountries());
  }, [0]);

  console.log('====================================');
  console.log(error);
  console.log('====================================');
  // reducer
  const configsData = useSelector((state) => state.auth.general_configs);
  const countryList = useSelector((state) => state.auth.countries);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);
  const verifyID = useSelector((state) => state.auth.verify_id);
  const loading = useSelector((state) => state.auth.loading);

  // function
  let defaultCountry = '';
  if (countryList && countryList.length > 0) {
    let countryCode = countryList.map((country) => {
      return country.code2.toLowerCase();
    });
    defaultCountry = (
      <PhoneInput
        onlyCountries={countryCode}
        className={classes.input}
        country={'in'}
        value={number}
        onChange={(mobile, country, e) => {
          setNumber(mobile);
          setDialCode(country.dialCode);
          setShowError(false)
        }}
        name="mobile"
      />
    );
  }

  const handleChange = (e) => {
    setEmail(e.target.value);
    setShowError(false)
  };

  //
  const onsubmit = (e) => {
    e.preventDefault();
    const authType = configsData.auth_type;
    if (authType === 1) {
      if (email === null) {
        toast.error('Email is required');
        return false;
      } else if (!validateEmail(email)) {
        toast.error('Enter valid email');
        return false;
      }
    } else if (authType === 3) {
      if (number === null) {
        toast.error('Phone number is required');
      } else if (!isValidNumber(`+${number}`)) {
        toast.error('Invalid phone number');
      }
    }
 setShowError(true)

    let users;
    if (authType === 1) {
      users = {
        user: {
           email:  email,
         },
      };
    } else if (authType === 3) {
      users = {
        user: {
           mobile: number.slice(dialCode.length),
           dial_code: dialCode,
         },
      };
    }
    dispatch(actions.password_recovery(users));
  };


  // showing Error
  if (error && showError) {
    toast.error(message)
  }
  // Set path
  let authRedirect = null;
  if (verifyID !== null) {
    authRedirect= <Redirect to={`/forgot-password/verification`} />;
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
      {authRedirect}
      {loading && (
        <>
          <div className={classes.Backdrop}></div>
           
        </>
      )}
      <div className="col-lg-12 nopaddingLeft">
        <h5 className={classes.titleAccount}>Forgot your password ?</h5>
        <p className={classes.subTitle}>
          Enter your{' '}
          {(configsData.auth_type === 1 && 'Email') || (configsData.auth_type === 3 && 'Number')}
        </p>
        <br />
        <form action="" method="post" onSubmit={(e) => onsubmit(e)}>
          {configsData &&
            (configsData.auth_type === 1 ? (
              <div className="form-group mt-4">
                <input
                  className={classes.input}
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                />
              </div>
            ) : (
              <div className="form-group mt-4">{defaultCountry}</div>
            ))}

          <div className="form-group mt-5">
            <button type="submit" className={classes.button}>
              Verify
            </button>
          </div>

          <div className="text-center mt-5">
            <Link to="/" className="text-center whiteColor noDecoration">
              <i className="fa fa-home fontIconSize"></i> Back to home
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
