import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import classes from './Sidebar.module.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import HomeLogo from '../../assets/images/sidebar/home.svg';
import HomeActiveLogo from '../../assets/images/sidebar/active/home.svg';
import WishlistLogo from '../../assets/images/sidebar/wishlist.svg';
import WishlistActiveLogo from '../../assets/images/sidebar/active/wishlist.svg';
//import TransactionLogo from '../../assets/images/sidebar/transaction.svg';
//import TransactionActiveLogo from '../../assets/images/sidebar/active/transaction.svg';
import StoreLogo from '../../assets/images/sidebar/store.svg';
import StoreActiveLogo from '../../assets/images/sidebar/active/store.svg';
//import GroupLogo from '../../assets/images/sidebar/group.svg';
import * as actions from '../../store/actions/index';
import { selectUserId } from '../../store/selectors/auth';
class Sidebar extends Component {
  state = {
    redirect: false,
  };

  authRedirectHandler = (path) => {
    this.props.onSetAuthRedirectPath(path);
    this.setState({ redirect: true });
  };

  render() {
    const { tenantData, location, isAuthenticated } = this.props;
    let appLogo = tenantData.get('logo_path', '');
    let redirectUrl = null;
    if (this.state.redirect) {
      redirectUrl = <Redirect to="/sign-in" />;
    }

    let url = location.pathname;
    //let search = window.location.search;
    //let params = new URLSearchParams(search);
    console.log('url', url);
    return (
      <Aux>
        {redirectUrl}
        <div className={classes.bgSidebar + ' col-lg-2 sidenav hidden-xs nopadding'}>
          <br />
          <div className={classes.logoImage}>
            <Link to="/home">
              {appLogo !== '' ? (
                <img
                  className="img-fluid"
                  src={appLogo}
                  style={{ width: '145px' }}
                  alt="Tradly"
                  title="Tradly"
                />
              ) : (
                'Loading...'
              )}
            </Link>
          </div>
          <ul className="nav nav-pills nav-stacked">
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
              <Link to="/wishlist">
                <img
                  className="img-fluid"
                  src={url === '/wishlist' ? WishlistActiveLogo : WishlistLogo}
                  alt="Home"
                  title="Home"
                />
                <span>My Wishlist</span>
              </Link>
            </li>
            <li className={url === '/listings' || url.includes('/product') ? 'active' : ''}>
              <Link to="/listings">
                <img
                  className="img-fluid"
                  src={
                    url === '/listings' || url.includes('/product') ? StoreActiveLogo : StoreLogo
                  }
                  alt="Home"
                  title="Home"
                />
                <span>Listings</span>
              </Link>
            </li>
            {/* <li className={url === '/my-transaction' ? 'active' : ''}>
              <Link to="/my-transaction">
                <img
                  className="img-fluid"
                  src={url === '/my-transaction' ? TransactionActiveLogo : TransactionLogo}
                  alt="Home"
                  title="Home"
                />
                <span>My Transaction</span>
              </Link>
            </li> */}
            <li
              className={
                url === '/store' ||
                url === '/create-store' ||
                url.indexOf('/store-details') > -1 ||
                url.indexOf('/storesuccess') > -1
                  ? 'active'
                  : ''
              }
            >
              {!isAuthenticated ? (
                <Link to="#" onClick={(path) => this.authRedirectHandler('/store')}>
                  <img className="img-fluid" src={StoreLogo} alt="Home" title="Home" />
                  <span>My Store</span>
                </Link>
              ) : (
                <Link to="/store">
                  <img
                    className="img-fluid"
                    src={
                      url === '/store' ||
                      url === '/create-store' ||
                      url.indexOf('/store-details') > -1 ||
                      url.indexOf('/storesuccess') > -1
                        ? StoreActiveLogo
                        : StoreLogo
                    }
                    alt="Home"
                    title="Home"
                  />
                  <span>My Store</span>
                </Link>
              )}
            </li>
            {/* <li>
              <Link to="/group">
                <img className="img-fluid" src={GroupLogo} alt="Home" title="Home" />
                <span>Group</span>
              </Link>
            </li> */}
          </ul>
          <br />
        </div>
        <br />
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path, null)),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: selectUserId(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
