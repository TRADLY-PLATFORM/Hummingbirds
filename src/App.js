import React, { Component } from 'react';


import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BeforeAuth from './hoc/Layout/BeforeAuth/BeforeAuth';
import SignUp from './containers/Auth/SignUp/SignUp';
 import Logout from './containers/Auth/Logout/Logout';
import PhoneVerification from './containers/Auth/PhoneVerification/PhoneVerification';
import Home from './containers/Home/Home';
import Listings from './containers/Listings/Listings';
import AllCategory from './components/Category/AllCategory/AllCategory';
import ProductDetails from './containers/ProductDetails/ProductDetails';
 import * as actions from '../src/store/actions/index';
import WishList from './containers/WishList/WishList';
import MyTransactionst from './containers/MyTransactionst/MyTransactionst';
import MyProfile from './containers/MyProfile/MyProfile';
import Cart from './containers/Cart/Cart';
import EditProfile from './containers/EditProfile/EditProfile';
import Group from './containers/Group/Group';
import StoreDetails from './containers/Store/StoreDetails';
 import myGroup from './containers/Group/myGroup';
import groupAdded from './containers/Group/groupAdded';
import groupSuccess from './containers/Group/groupSuccess';
import transactionSuccess from './containers/MyTransactionst/transactionSuccess';
 import StoreSuccess from './containers/Store/StoreSuccess';
import ProductSuccess from './containers/Store/ProductSuccess';
import NoProduct from './containers/Store/NoProduct';
import withProduct from './containers/Store/withProduct';
 import reviewPage from './containers/Order/reviewPage';
 import ListingsByCategory from './containers/ListingsByCategory/ListingsByCategory';
import AllStores from './containers/Store/AllStores';
import SignIn from './containers/Auth/SignIn/SignIn';
import { ErrorBoundary } from '@sentry/react';
import ForgotPassword from './containers/Auth/ForgotPassword/ForgotPassword';
import SearchResult from './components/Seacrh/SearchResult';
import CreateStore from './containers/Store/CreateStore/CreateStore';
import Store from './containers/Store/MyStore/Stor';
 import CreateProduct from './containers/Store/CreateProduct/CreateProduct';
import ProductDetail from './containers/ProductDetails/ProductDetail';
import BuyNow from './containers/Cart/BuyNow/BuyNow';
import OrderSuccess from './containers/Cart/OrderSuccess/OrderSuccess';
 import StoreOrders from './containers/StoreOrders/StoreOrders';
import StoreOrderDetails from './containers/StoreOrders/StoreOrderDetails';
import Card from './containers/Stripe/Card';
import MyOrder from './containers/Order/MyOrders';
import DetailOrder from './containers/Order/DetailsOrder';
 
class App extends Component {
  componentDidMount() {
    this.props.onTryAuthSignUp();
    // this.props.onSetTenantConfig();
    this.props.onSetOnboardingConfigsData();
    this.props.onSetSeoConfigs();
    this.props.onSetCurrency();
  }


  render() {

    let root = document.documentElement;
    const color =  this.props.onboarding_configs.app_color_primary;
    root.style.setProperty("--primary_color",color || '#15B790');
  

    let routes = (
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/listings" exact component={Listings} />
        <Route path="/lc/:categoryName" exact component={ListingsByCategory} />
        <Route path="/categories" exact component={AllCategory} />
        <Route path="/verification/:verifyID" exact component={PhoneVerification} />
        <Route path="/" exact component={Home} />
        <Route path="/l/:id" exact component={ProductDetails} />
        <Route path="/store" exact component={Store} />
        <Route path="/stores" exact component={AllStores} />
        <Route path="/create-store" exact component={CreateStore} />
        <Route path="/a/:id" exact component={StoreDetails} />
        {/* <Route path="/all-categories" exact component={AllCategory} /> */}
        <Route path="/wishlist" exact component={WishList} />
        <Route path="/my-transaction" exact component={MyTransactionst} />
        <Route path="/profile" exact component={MyProfile} />
        {/* <Route path="/cart" exact component={Cart} /> */}
        <Route path="/cart" exact component={BuyNow} />
        <Route path="/checkout-success" exact component={OrderSuccess} />
        <Route path="/editprofile" excat component={EditProfile} />
        <Route path="/group" excat component={Group} />
        <Route path="/mygroup" excat component={myGroup} />
        <Route path="/groupadded" excat component={groupAdded} />
        <Route path="/groupsuccess" excat component={groupSuccess} />
        <Route path="/transactionsuccess" excat component={transactionSuccess} />
        <Route path="/myorder" excat component={MyOrder} />
        <Route path="/myorder/statusID" excat component={MyOrder} />
        <Route path="/storeorders" excat component={StoreOrders} />
        <Route path="/storeorders/statusID" excat component={StoreOrders} />
        <Route path="/storesuccess" excat component={StoreSuccess} />
        <Route path="/productsuccess" excat component={ProductSuccess} />
        <Route path="/noproduct" excat component={NoProduct} />
        <Route path="/withproduct" excat component={withProduct} />
        <Route path="/addproduct/:accountId" excat component={CreateProduct} />
        <Route path="/reviewpage" excat component={reviewPage} />
        <Route path="/myorder-details/:id" excat component={DetailOrder} />
        <Route path="/storeorder-details/:id" excat component={StoreOrderDetails} />
        <Route path="/search/:key" excat component={SearchResult} />
        <Route path="/card" excat component={Card} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <ErrorBoundary>
        {this.props.location.pathname === '/sign-up' ||
        this.props.location.pathname === '/sign-in' ||
        this.props.location.pathname === '/forgot-password' ||
        this.props.location.pathname === '/verification/' + this.props.verifyId ? (
          <BeforeAuth>{routes}</BeforeAuth>                                                               
        ) : (
          <Layout>{routes}</Layout>
        )}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    verifyId: state.auth.verify_id,
    onboarding_configs: state.auth.onboarding_configs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAuthSignUp: () => dispatch(actions.authCheckState()),
    // onSetTenantConfig: () => dispatch(actions.setTenantConfig()),
    onSetOnboardingConfigsData: () => dispatch(actions.setOnboardingConfigsData()),
    // onInitCountries: () => dispatch(actions.initCountries())
    onSetSeoConfigs: () => dispatch(actions.setSeoConfigs()),
    onSetCurrency: () => dispatch(actions.initCurrencies()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
