import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './PhoneVerification.module.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
class PhoneVerification extends Component {
  state = {
    verificationCode: '',
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

    if (this.state.verificationCode === '') {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Verification code is required');
      }
      return false;
    } else if (this.state.verificationCode.length !== 6) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Verification code length should be 6 digit');
      }
      return false;
    }
    this.setState({ showError: true });

    let verification_id = atob(this.props.verifyId);

    const verification = {
      verify_id: verification_id,
      code: this.state.verificationCode,
    };

    this.props.onVerify(verification);
  };

  render() {
    if (this.props.error && this.state.showError) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(this.props.message);
      }
    }

    let authRedirect = null;
    if (!this.props.verifyId) {
      authRedirect = <Redirect to="/" />;
    }

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={'/'} />;
    }

    return (
      <div className="row text-center mt-5">
        <div className={classes.title}>Phone verification</div>
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
          <h5 className={classes.titleAccount}>Enter verification code here</h5>
          <br />
          <form action="" method="post" onSubmit={this.onSubmit}>
            <div className="row text-center mt-4">
              <div>
                <input
                  type="text"
                  className={classes.PhoneDigit + ' form-control'}
                  maxLength="6"
                  value={this.state.verificationCode}
                  name="verificationCode"
                  onChange={this.handleChange}
                />
              </div>
              {/* <div className={classes.col2}>
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className={classes.col2}>
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className={classes.col2}>
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className={classes.col2}>
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className={classes.col2}>
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div> */}
            </div>

            <div className="text-center mt-5">
              Didn't you recieved any code ?
              <Link to="/sign-in" className="text-center whiteColor">
                Resend code
              </Link>
            </div>

            <div className="form-group mt-5">
              <button type="submit" className={classes.button}>
                Verify
              </button>
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
    authRedirectPath: state.auth.authRedirectPath,
    verifyId: state.auth.verify_id,
    isAuthenticated: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVerify: (verificationData) => dispatch(actions.authVerification(verificationData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);
