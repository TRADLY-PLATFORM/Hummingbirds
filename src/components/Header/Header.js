import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import AvatarImage from '../../assets/images/header/avatar.jpg';
import CartImage from '../../assets/images/header/cart.svg';
// import Skeleton from '../UI/Skeleton/Skeleton';
const header = (props) => {
  const { userData } = props;
  console.log(' ', userData);
  function getUserName() {
    return userData.get('first_name', 'Guests') + ' ' + userData.get('last_name', '');
  }

  function getUserImage() {
    return userData.get('profile_pic', '');
  }

  return (
    <header className={classes.header}>
      <div className="header-menu">
        <div className="col-sm-6">
          <span className="glyphicon glyphicon-search form-control-feedback"></span>
          <input type="text" className="form-control input-lg" placeholder="Search Product" />
        </div>

        <div className="col-sm-6">
          <div className={classes.userArea + ' dropdown'}>
            <Link
              to="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className={classes.userAvatar}
                src={getUserImage() !== '' ? getUserImage() : AvatarImage}
                alt="User Avatar"
              />
              <span className={classes.spanName}>{getUserName()}</span>
            </Link>

            <div className={classes.dropdownMenu + ' user-menu dropdown-menu'}>
              {userData.get('id', '') === '' ? (
                <Link className={classes.navLink} to="/sign-in">
                  <i className="fa fa-power-off mr-10"></i>Login
                </Link>
              ) : (
                <Aux>
                  <Link className={classes.navLink} to="#">
                    <i className="fa fa-user"></i> My Profile
                  </Link>
                  <Link className={classes.navLink} to="#">
                    <i className="fa fa-cog"></i> Settings
                  </Link>
                  <Link className={classes.navLink} to="/logout">
                    <i className="fa fa-power-off"></i> Logout
                  </Link>
                </Aux>
              )}
            </div>
          </div>

          <div className={classes.cartArea}>
            {/* <Link to="/cart">
              <div>
                <img className={classes.cartImage} src={CartImage} alt="Cart" />
                <span className={classes.countCart}>0</span>
                <span className={ classes.cartName}>Cart</span>
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;
