import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { uuid } from 'uuidv4';
import classes from './SignIn.module.css';
//import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { validateEmail } from '../../../shared/utility'; //countryFilter
import * as actions from '../../../store/actions/index';
import { selectUserId } from '../../../store/selectors/auth';
class SignIn extends Component {
  state = {
    mobile: '',
    email: '',
    password: '',
    isSignUp: false,
    showError: false,
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
    this.setState({ showError: false });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // if (this.state.mobile === '') {
    //   if (!toast.isActive(this.toastId)) {
    //     this.toastId = toast.error('Phone number is required');
    //   }
    //   return false;
    // }
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

    // let mobile = this.state.mobile;
    // mobile = mobile.replace(/-/g, '');
    // mobile = mobile.match(/^\s*(\S+)\s*(.*?)\s*$/).slice(1);
    // let phoneCode = mobile[0].substring(1);
    // let phoneNumber = mobile[1];
    // let filterCountry = countryFilter(phoneCode, this.props.countryList);
    // if (phoneNumber.length !== filterCountry.mobile_number_legth) {
    //   let digits =
    //     filterCountry.mobile_number_legth !== undefined ? filterCountry.mobile_number_legth : 10;
    //   if (!toast.isActive(this.toastId)) {
    //     this.toastId = toast.error('Phone number length should be ' + digits + ' digits');
    //   }
    //   return false;
    // }

    this.setState({ showError: true });
    const uUid = uuid();

    const users = {
      user: {
        uuid: uUid,
        //mobile: phoneNumber,
        email: this.state.email,
        password: this.state.password,
        //country_id: filterCountry.id,
        type: 'client',
      },
    };

    this.props.onAuth(users, this.state.isSignUp);
  };

  render() {
    const { isAuthenticated } = this.props;
    if (this.props.error && this.state.showError) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(this.props.message);
      }
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    // let defaultCountry = '';
    // if (this.props.countryList && this.props.countryList.length > 0) {
    //   let countryCode = this.props.countryList.map((country) => {
    //     return country.code2.toLowerCase();
    //   });
    //   defaultCountry = (
    //     <PhoneInput
    //       onlyCountries={countryCode}
    //       className={classes.input}
    //       country={'in'}
    //       value={this.state.mobile}
    //       onChange={(mobile) => this.setState({ mobile })}
    //       name="mobile"
    //     />
    //   );
    // }
    console.log('isAuthenticated', isAuthenticated);
    return (
      <div className="row">
        <div className={classes.title}>
          Tradly <br /> Marketplace
        </div>
        <Backdrop show={this.props.loading} />
        <Spinner show={this.props.loading} />
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
          <form action="" method="post" onSubmit={this.onSubmit}>
            {/* <div className="form-group mt-4">{defaultCountry}</div> */}
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
    isAuthenticated: selectUserId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userData, isSignUp) => dispatch(actions.auth(userData, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
