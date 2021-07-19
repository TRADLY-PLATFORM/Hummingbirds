import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './containers/Auth/SignUp/SignUp';
import SignIn from './containers/Auth/SignIn/SignIn';
import Logout from './containers/Auth/Logout/Logout';
import PhoneVerification from './containers/Auth/PhoneVerification/PhoneVerification';
import Home from './containers/Home/Home';
import Listings from './containers/Listings/Listings';
import AllCategory from './components/Category/AllCategory/AllCategory';
import ProductDetails from './containers/ProductDetails/ProductDetails';
import Store from './containers/Store/Store';
import WishList from './containers/WishList/WishList';
import MyTransactionst from './containers/MyTransactionst/MyTransactionst';
import MyProfile from './containers/MyProfile/MyProfile';
import Cart from './containers/Cart/Cart';
import EditProfile from './containers/EditProfile/EditProfile';
import Group from './containers/Group/Group';
import StoreDetails from './containers/Store/StoreDetails';
import CreateStore from './containers/Store/CreateStore';
import myGroup from './containers/Group/myGroup';
import groupAdded from './containers/Group/groupAdded';
import groupSuccess from './containers/Group/groupSuccess';
import transactionSuccess from './containers/MyTransactionst/transactionSuccess';
import myOrder from './containers/Order/myOrder';
import StoreSuccess from './containers/Store/StoreSuccess';
import ProductSuccess from './containers/Store/ProductSuccess';
import NoProduct from './containers/Store/NoProduct';
import withProduct from './containers/Store/withProduct';
import addProduct from './containers/Store/addProduct';
import reviewPage from './containers/Order/reviewPage';
import detailOrder from './containers/Order/detailOrder';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/listings" exact component={Listings} />
        <Route path="/verification/:verifyID" exact component={PhoneVerification} />
        <Route path="/" exact component={Home} />
        <Route path="/product-details/:id/:name" exact component={ProductDetails} />
        <Route path="/store" exact component={Store} />
        <Route path="/create-store" exact component={CreateStore} />
        <Route path="/store-details/:id/:name" exact component={StoreDetails} />
        <Route path="/all-categories" exact component={AllCategory} />
        <Route path="/wishlist" exact component={WishList} />
        <Route path="/my-transaction" exact component={MyTransactionst} />
        <Route path="/profile" exact component={MyProfile} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/editprofile" excat component={EditProfile} />
        <Route path="/group" excat component={Group} />
        <Route path="/mygroup" excat component={myGroup} />
        <Route path="/groupadded" excat component={groupAdded} />
        <Route path="/groupsuccess" excat component={groupSuccess} />
        <Route path="/transactionsuccess" excat component={transactionSuccess} />
        <Route path="/myorder" excat component={myOrder} />
        <Route path="/storesuccess" excat component={StoreSuccess} />
        <Route path="/productsuccess" excat component={ProductSuccess} />
        <Route path="/noproduct" excat component={NoProduct} />
        <Route path="/withproduct" excat component={withProduct} />
        <Route path="/addproduct" excat component={addProduct} />
        <Route path="/reviewpage" excat component={reviewPage} />
        <Route path="/detailorder" excat component={detailOrder} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
