import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from "./ForgotPassword.module.css"
import * as actions from '../../../store/actions/index';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import Loader from 'react-loader-spinner';


const SetPassword = () => {
  const [verificationCode, setVerificationCode] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showError,setShowError]=useState(false)

  //
  const dispatch = useDispatch();

  // reducer
  const configsData = useSelector((state) => state.auth.general_configs);
  const countryList = useSelector((state) => state.auth.countries);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);
  const verifyID = useSelector((state) => state.auth.verify_id);
  const loading = useSelector((state) => state.auth.loading);
  const recoveryPassword = useSelector((state) => state.auth.recoveryPassword);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'verificationCode') {
      setVerificationCode(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'confirm-password') {
      setConfirmPassword(value);
    }
    setShowError(false)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (verificationCode === null) {
      toast.error('Please enter the verification code');
      return false;
    }
    if (password === null) {
      toast.error('Please enter the new password');
      return false;
    }
    if (confirmPassword === null) {
      toast.error('Please confirm the new password');
      return false;
    }
    if (confirmPassword !== password) {
      toast.error('Password should be equal to Retype password  ');
      return false;
    }
    setShowError(true)

    let verification_id = atob(verifyID);
    const users = {
      verify_id: verification_id,
      code: verificationCode,
      password: password,
    };

    dispatch(actions.set_password(users));
  };

  // showing Error
  if (error && showError) {
    toast.error(message);
   }

  // Set path
  let authRedirect = null;
  if (recoveryPassword === true) {
          authRedirect = <Redirect to={`/sign-in`} />;
   }

  return (
    <div className="col-lg-12 nopaddingLeft">
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
      <h4 className={classes.title}>Forgot your password ?</h4>
      <p className={classes.subTitle}>
        Please enter OTP here , We've sent verification code in your{' '}
        {(configsData.auth_type === 1 && 'Email') || (configsData.auth_type === 3 && 'Number')}
      </p>

      <br />
      <form action="" method="post" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group mt-4">
          <input
            className={classes.input}
            type="number"
            name="verificationCode"
            value={verificationCode}
            placeholder="verification Code"
            onChange={(e) => handleChange(e)}
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="form-group mt-4">
          <input
            className={classes.input}
            type="password"
            name="password"
            value={password}
            placeholder="New Password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mt-4">
          <input
            className={classes.input}
            type="password"
            name="confirm-password"
            value={confirmPassword}
            placeholder="Confirm New Password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form-group mt-5">
          <button type="submit" className={classes.button}>
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetPassword;