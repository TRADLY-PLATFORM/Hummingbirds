import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import { Link, withRouter, Redirect, useLocation } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import classes from './Layout.module.css';
import { selectTenantData, selectUserData, selectUserId } from '../../store/selectors/auth';
import HomeLogo from '../../assets/images/sidebar/home.svg';
import HomeActiveLogo from '../../assets/images/sidebar/active/home.svg';
import WishlistLogo from '../../assets/images/sidebar/wishlist.svg';
import WishlistActiveLogo from '../../assets/images/sidebar/active/wishlist.svg';
import TransactionLogo from '../../assets/images/sidebar/transaction.svg';
import TransactionActiveLogo from '../../assets/images/sidebar/active/transaction.svg';
import StoreLogo from '../../assets/images/sidebar/store.svg';
import StoreActiveLogo from '../../assets/images/sidebar/active/store.svg';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';
import { useState } from 'react';
import menubarIcon from "../../assets/images/mobilemenu/menu.png"
import closeMenu from "../../assets/images/mobilemenu/close.png"
import profileUser from '../../assets/images/header/profile-user.png';
import arrow from '../../assets/images/mobilemenu/down-arrow.png';
import { Search } from '../../components/Seacrh/Search';



const Layout = (props) => {
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const tenantData = useSelector((state) => selectTenantData(state));
  const userData = useSelector((state) => selectUserData(state));
  const dispatch = useDispatch();

  const url = useLocation().pathname;
 
  const [isSiteNavOpen, setIsSiteNavOpen] = useState(false);

  const authRedirectHandler = (path) => {

    dispatch(actions.setAuthRedirectPath(path,null));
  };
  function navButtonClick() {
    
      document.getElementById('navbarMenu').style.width = '60%';
      setIsSiteNavOpen(true);
    
     
  }
  function navButtonOff() {
    
      document.getElementById('navbarMenu').style.width = '0';
      setIsSiteNavOpen(false);
   
  }

  // Logo path:
     let appLogo = localStorage.getItem('logo_path') || this.props.onboarding_configs.splash_image;
  function getUserImage() {
    return userData.get('profile_pic', '');
  }
    function getUserName() {
      return userData.get('first_name', 'Guests') + ' ' + userData.get('last_name', '');
    }
 
  return (
    <div>
      <Aux>
        <div
          className={classes.bgEffect}
          style={{ display: isSiteNavOpen ? 'block' : 'none' }}
        ></div>
        <nav className={classes.mobileNavbar + '  visible-xs '}>
          <div className=" ">
            <div className={classes.navbar}>
              <button type="button" onClick={navButtonClick}>
                <img style={{ width: '20px', height: '12px' }} src={menubarIcon} alt="" />
              </button>
              <div className="logo" style={{ marginLeft: '7%' }}>
                {appLogo !== '' ? (
                  <img
                    className="img-fluid"
                    src={appLogo}
                    style={{ width: '40px', height: '40px' }}
                    alt="Tradly"
                    title="Tradly"
                  />
                ) : (
                  'Loading...'
                )}
              </div>

              <div className="  pull-right" style={{ marginLeft: 'auto' }}>
                <div className={classes.userArea + ' dropdown'}>
                  <Link
                    to="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <img
                      className={classes.userAvatar}
                      src={getUserImage() !== '' ? getUserImage() : profileUser}
                      alt="User Avatar"
                    />
                    <img
                      style={{ width: '7px', height: '7px', marginLeft: '5px' }}
                      src={arrow}
                      alt=""
                    />
                  </Link>

                  <div className={classes.dropdownMenu + ' user-menu dropdown-menu'}>
                    {userData.get('id', '') === '' ? (
                      <Link className={classes.navLink} to="/sign-in">
                        <i className="fa fa-power-off mr-10"></i>Login
                      </Link>
                    ) : (
                      <Aux>
                        {/* <Link className={classes.navLink} to="#">
                          <i className="fa fa-user"></i> My Profile
                        </Link>
                        <Link className={classes.navLink} to="#">
                          <i className="fa fa-cog"></i> Settings
                        </Link> */}
                        <Link className={classes.navLink} to="/logout">
                          <i className="fa fa-power-off"></i> Logout
                        </Link>
                      </Aux>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '27px' }}>
              <Search />
            </div>

            <div className={classes.navbarMenu} id="navbarMenu">
              {/*  */}
              <button
                className={classes.closeBtn}
                onClick={navButtonOff}
                style={{ display: isSiteNavOpen ? 'block' : 'none' }}
              >
                <img style={{ width: '20px', height: '20px' }} src={closeMenu} alt="" />
              </button>
              <div className={classes.logoImage}>
                <Link to="/home">
                  {appLogo !== '' ? (
                    <img
                      className="img-fluid"
                      src={appLogo}
                      style={{ width: '95px', height: '50px' }}
                      alt="Tradly"
                      title="Tradly"
                    />
                  ) : (
                    'Loading...'
                  )}
                </Link>
              </div>
              <ul className="nav nav-pills nav-stacked" onClick={navButtonOff}>
                <li className={url === '/' || url === '/home' ? 'active' : ''}>
                  <Link to="/home">
                    <img
                      className="img-fluid"
                      src={url === '/' || url === '/home' ? HomeActiveLogo : HomeLogo}
                      alt="Home"
                      title="Home"
                    />
                    <span>Home</span>
                  </Link>
                </li>
                <li className={url === '/wishlist' ? 'active' : ''}>
                  {isAuthenticated ? (
                    <Link to="/wishlist">
                      <img
                        className="img-fluid"
                        src={url === '/wishlist' ? WishlistActiveLogo : WishlistLogo}
                        alt="Home"
                        title="Home"
                      />
                      <span>My Wishlist</span>
                    </Link>
                  ) : (
                    <Link to="/sign-in">
                      <img
                        className="img-fluid"
                        src={url === '/wishlist' ? WishlistActiveLogo : WishlistLogo}
                        alt="Home"
                        title="Home"
                      />
                      <span>My Wishlist</span>
                    </Link>
                  )}
                </li>
                <li className={url === '/listings' ? 'active' : ''}>
                  <Link to="/listings">
                    <img
                      className="img-fluid"
                      src={url === '/listings' ? StoreActiveLogo : StoreLogo}
                      alt="Home"
                      title="Home"
                    />
                    <span>Listings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className={classes.bgColor + ' container-fluid'} style={{}}>
          <div className="row content" onClick={navButtonOff}>
            <Sidebar isAuthentication={isAuthenticated} tenantData={tenantData} />

            <div className={classes.rightPanel + ' col-lg-10'}>
              <Header userData={userData} />
              <main className={classes.rightTopMargin + ' col-lg-12'}>{props.children}</main>
            </div>
          </div>
        </div>
      </Aux>
    </div>
  );
};

export default Layout;

// class Layout extends Component {
//   constructor(props) {
//     this.state = {
//     redirect: false,
//     isOpenSidenav: false,

//   };
// }

//   render() {
//     const { tenantData, userData, isAuthentication, location } = this.props;

//     const url = location.pathname;
//     console.log('====================================');
//     console.log(url);
//     console.log('====================================');
//     return (

//     );
//   }
// }
