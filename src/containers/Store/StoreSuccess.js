import React, { Component } from 'react';
import classes from './StoreSuccess.module.css';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import groupSuccessImg from '../../assets/images/Group/groupSuccessImg.svg';
import { selectUserId } from '../../store/selectors/auth';
class storeSuccess extends Component {
  render() {
    const { isAuthenticated } = this.props;

    let redirect = null;
    if (!isAuthenticated) {
      //redirect = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirect}
        <div className="row">
          <div className="container-fluid">
            <div className={classes.groupSuccess + ' col-md-12 '}>
              <img
                src={groupSuccessImg}
                className={classes.successImage}
                alt="group success"
                title="group success"
              />
              <br />
              <p className={classes.pageTitel}>Create store is successfly</p>
              <br />
              <p className={classes.pageNote}>now, you can add and sell your product in store</p>
              <br />
              <Link to="/store">
                <button className={classes.btnGreenStyle}> Go to my store</button>
              </Link>
              <br />
              <Link to="/home">
                <p className={classes.pageNote}>Go to home</p>
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: selectUserId(state),
  };
};

export default connect(mapStateToProps)(withRouter(storeSuccess));
