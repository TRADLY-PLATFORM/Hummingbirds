import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { uuid } from 'uuidv4';
//import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import classes from './SignUp.module.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { countryFilter, validateEmail } from '../../../shared/utility'; //countryFilter
import * as actions from '../../../store/actions/index';
import { selectUserId } from '../../../store/selectors/auth';
import PhoneInput from 'react-phone-input-2';
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { Helmet } from 'react-helmet';


class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    dialCode: '',
    mobile: '',
    email:'',
    password: '',
    reTypePassword: '',
    isSignUp: true,
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

    const authType = this.props.configsData.auth_Type;
    if (authType === 1) {
      if (this.state.firstName === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('First name is required');
        }
        return false;
      } else if (this.state.lastName === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Last name is required');
        }
        return false;
      } else if (this.state.email === '') {
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
      } else if (this.state.reTypePassword === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Retype password is required');
        }
        return false;
      } else if (this.state.reTypePassword !== this.state.password) {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Password should be equal to Retype password');
        }
        return false;
      }
    } else {
      if (this.state.firstName === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('First name is required');
        }
        return false;
      } else if (this.state.lastName === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Last name is required');
        }
        return false;
      } else if (this.state.mobile === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Phone number is required');
        }
        return false;
      } else if (this.state.password === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Password is required');
        }
        return false;
      } else if (this.state.reTypePassword === '') {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Retype password is required');
        }
        return false;
      } else if (this.state.reTypePassword !== this.state.password) {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error('Password should be equal to Retype password');
        }
        return false;
      }
       let mobile = this.state.mobile;
       let checkNumber = isValidPhoneNumber(`+${mobile}`);
       if (checkNumber !== true) {
         if (!toast.isActive(this.toastId)) {
           this.toastId = toast.error('Invalid phone number.');
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
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
         type: 'client',
      },
    };
    } else {
      users = {
        user: {
          uuid: uUid,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          mobile: this.state.mobile.slice(this.state.dialCode.length),
          password: this.state.password,
          dial_code: this.state.dialCode,
          type: 'client',
        },
      };
    }
    
    this.props.onAuth(users, this.state.isSignUp);
  };

  componentDidMount() {
        this.props.onSetConfigs();

    this.props.onInitCountries();
  }

  render() {
    const authType = this.props.configsData.auth_type;
    console.log('====================================');
    console.log(authType);
    console.log('====================================');
    if (this.props.error && this.state.showError) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(this.props.message);
      }
    }

    let authRedirect = null;
    if (this.props.isAuthenticated || this.props.verifyId) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

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
      <>
        <Helmet>
          <title>Tradly Web - Sign Up</title>
          <meta
            name="description"
            content=" Widest Range of Mobile & Tablets, Home Appliances, Tv, Audio, Home & Living At Tradly | Best Prices ? Fast DELIVERY | Cash on Delivery ? Effortless Shopping ? Best Customer Care!"
          />
        </Helmet>
        <div className="row">
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
          <div className={classes.title}>
            Welcome to Tradly <br /> Marketplace
          </div>

          <div className="col-lg-12 nopaddingLeft">
            <h5 className={classes.titleAccount}>Create your account</h5>
            <br />
            <form action="" method="post" onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  className={classes.input}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="form-group mt-4">
                <input
                  className={classes.input}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </div>
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
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="form-group mt-4">
                <input
                  className={classes.input}
                  type="password"
                  name="reTypePassword"
                  placeholder="Re Type Password"
                  value={this.state.reTypePassword}
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="form-group mt-5">
                <button type="submit" className={classes.button}>
                  Sign Up
                </button>
              </div>

              <div className="text-center mt-5">
                <Link to="/sign-in" className="text-center whiteColor">
                  have an account ? Sign in
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
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    message: state.auth.message,
    countryList: state.auth.countries,
    authRedirectPath: state.auth.authRedirectPath,
    configsData: state.auth.configs,
    verifyId: state.auth.verify_id,
    isAuthenticated: selectUserId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userData, isSignUp) => dispatch(actions.auth(userData, isSignUp)),
    onInitCountries: () => dispatch(actions.initCountries()),
    onSetConfigs: () => dispatch(actions.setConfigsData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
