/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { uuid } from 'uuidv4';
import classes from './SignIn.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Backdrop from '../../../components/UI/Backdrop/Backdrop';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Loader from 'react-loader-spinner';

import { validateEmail } from '../../../shared/utility'; //countryFilter
import * as actions from '../../../store/actions/index';
import { selectUserId } from '../../../store/selectors/auth';
import {   isValidPhoneNumber } from 'libphonenumber-js';
import { Helmet } from 'react-helmet';

class SignIn extends Component {
  state = {
    email: '',
    mobile: '',
    password: '',
    dialCode: '',
    isSignUp: false,
    showError: false,
    showSuccess:true,
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
    this.setState({ showError: false, showSuccess :false});
  };

  componentDidMount() {
    this.props.onSetConfigs();
    this.props.onInitCountries();
  }
  onSubmit = (e) => {
    e.preventDefault();
    const authType = this.props.configsData.auth_type;
     if (authType === 1) {
      if (this.state.email === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Email is required');
        }
        return false;
      } else if (!validateEmail(this.state.email)) {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Enter valid email');
        }
        return false;
      } else if (this.state.password === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Password is required');
        }
        return false;
      }
    } else if(authType === 3) {
      if (this.state.mobile === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Phone number is required');
        }
        return false;
      } else if (this.state.password === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Password is required');
        }
        return false;
      }
      let mobile = this.state.mobile;
      let checkNumber = isValidPhoneNumber(`+${mobile}`);
      if (checkNumber !== true) {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Invalid phone number');
        }
        return false;
      }
    }

    this.setState({ showError: true });
    const uUid = uuid();
    let users;
    if (authType === 1) {
      users = {
        user: {
          uuid: uUid,
          email: this.state.email,
          password: this.state.password,
          type: 'customer',
        },
      };
    } else if (authType === 3) {
      users = {
        user: {
          uuid: uUid,
          mobile: this.state.mobile.slice(this.state.dialCode.length),
          password: this.state.password,
          dial_code: this.state.dialCode,
          type: 'customer',
        },
      };
    }

    this.props.onAuth(users, this.state.isSignUp);
  };

  render() {
    // const { isAuthenticated } = this.props;
    const authType = this.props.configsData.auth_type;
    if (this.props.error && this.state.showError) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(this.props.message);
      }
    }
    if (this.props.recoveryPassword === true && this.state.showSuccess) {
      
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.success('Password Changed,You can login Now');
      }
  }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
     // let authRedirect = null;
    // if (this.props.isAuthenticated || this.props.verifyId) {
    //   authRedirect = <Redirect to={this.props.authRedirectPath} />;
    // }

    let defaultCountry = '';
    if (this.props.countryList && this.props.countryList.length > 0) {
      let countryCode = this.props.countryList.map((country) => {
        return country.code2.toLowerCase();
      });
      defaultCountry = (
        <PhoneInput
          onlyCountries={countryCode}
          className={classes.input}
          country={'in'}
          value={this.state.mobile}
          onChange={(mobile, country, e) => {
            this.setState({ mobile: mobile });
            this.setState({ dialCode: country.dialCode });
          }}
          name="mobile"
        />
      );
    }
     return (
       <div>
         <Helmet>
           <title>Tradly Web - Sign In</title>
           <meta
             name="description"
             content=" Widest Range of Mobile & Tablets, Home Appliances, Tv, Audio, Home & Living At Tradly | Best Prices ? Fast DELIVERY | Cash on Delivery ? Effortless Shopping ? Best Customer Care!"
           />
         </Helmet>
         <div className="">
           <div className={classes.title}>
             <p>{this.props.configsData.registration_title}</p>
           </div>
           {/* <Backdrop show={this.props.loading} />
           <Spinner show={this.props.loading} /> */}
           {this.props.loading && (
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
           )}

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

           <div className="col-lg-12 nopadding">
             <h5 className={classes.titleAccount}>Login to your account</h5>
             <br />
             <form action="" method="post" onSubmit={this.onSubmit}>
               {authType === 1 ? (
                 <div className="form-group mt-4">
                   <input
                     className={classes.input}
                     name="email"
                     type="text"
                     placeholder="Email"
                     value={this.state.email}
                     onChange={this.handleChange}
                     autoComplete="off"
                   />
                 </div>
               ) : (
                 <div className="form-group mt-4">{defaultCountry}</div>
               )}

               <div className="form-group mt-4">
                 <input
                   className={classes.input}
                   type="password"
                   name="password"
                   value={this.state.password}
                   placeholder="Password"
                   onChange={this.handleChange}
                 />
               </div>

               <div className="form-group mt-5">
                 <button type="submit" className={classes.button}>
                   Login
                 </button>
               </div>

               <div className="text-center mt-5">
                 <Link to="/forgot-password" className="text-center whiteColor noDecoration">
                   Forgot Password ?
                 </Link>
               </div>

               <div className="text-center mt-5">
                 <Link to="/sign-up" className="text-center whiteColor noDecoration">
                   Don't have an account ? Sign Up
                 </Link>
               </div>
               <div className="text-center mt-5">
                 <Link to="/" className="text-center whiteColor noDecoration">
                   <i className="fa fa-home fontIconSize"></i> Back to home
                 </Link>
               </div>
             </form>
           </div>
         </div>
       </div>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    message: state.auth.message,
    countryList: state.auth.countries,
    authRedirectPath: state.auth.authRedirectPath,
    verifyId: state.auth.verify_id,
    configsData: state.auth.general_configs,
    recoveryPassword: state.auth.recoveryPassword,
    isAuthenticated: selectUserId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userData, isSignUp) => dispatch(actions.auth(userData, isSignUp)),
    onInitCountries: () => dispatch(actions.initCountries()),
    onSetConfigs: () => dispatch(actions.setGeneralConfigsData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
