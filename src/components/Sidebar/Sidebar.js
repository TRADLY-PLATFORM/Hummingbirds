import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import classes from './Sidebar.module.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import HomeLogo from '../../assets/images/sidebar/home.svg';
import HomeActiveLogo from '../../assets/images/sidebar/active/home.svg';
import WishlistLogo from '../../assets/images/sidebar/wishlist.svg';
import WishlistActiveLogo from '../../assets/images/sidebar/active/wishlist.svg';
import TransactionLogo from '../../assets/images/sidebar/transaction.svg';
import TransactionActiveLogo from '../../assets/images/sidebar/active/transaction.svg';
import StoreLogo from '../../assets/images/sidebar/store.svg';
import StoreActiveLogo from '../../assets/images/sidebar/active/store.svg';
//import GroupLogo from '../../assets/images/sidebar/group.svg';
import * as actions from '../../store/actions/index';

import { selectTenantData, selectUserData, selectUserId } from '../../store/selectors/auth';
import SidebarMenu from './SidebarMenu';

class Sidebar extends Component {
  state = {
    redirect: false,
  };

  authRedirectHandler = (path) => {
    this.props.onSetAuthRedirectPath(path);
    this.setState({ redirect: true });
  };

  render() {
    const { tenantData, location } = this.props;
   
     let appLogo = this.props.onboarding_configs.splash_image;
 
    let redirectUrl = null;
    if (this.state.redirect) {
      redirectUrl = <Redirect to="/sign-in" />;
    }

    let url = location.pathname;
    //let search = window.location.search;
    //let params = new URLSearchParams(search);
     return (
       <Aux>
         {redirectUrl}
         <div className={classes.bgSidebar}>
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
           <SidebarMenu authRedirectHandler={this.authRedirectHandler} />
           <br />
         </div>
       </Aux>
     );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: selectUserId(state),
    tenantData: selectTenantData(state),
    userData: selectUserData(state),
    onboarding_configs: state.auth.onboarding_configs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path, null)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));




