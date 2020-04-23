import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BeforeAuth from './hoc/Layout/BeforeAuth/BeforeAuth';
import SignUp from './containers/Auth/SignUp/SignUp';
import SignIn from './containers/Auth/SignIn/SignIn';
import Logout from './containers/Auth/Logout/Logout';
import PhoneVerification from './containers/Auth/PhoneVerification/PhoneVerification';
import Home from './containers/Home/Home';
import Listings from './containers/Listings/Listings';
import AllCategory from './components/Category/AllCategory/AllCategory';
import ProductDetails from './containers/ProductDetails/ProductDetails';
import Store from './containers/Store/Store';
import * as actions from '../src/store/actions/index';


class App extends Component {

  

  componentDidMount() {
     this.props.onTryAuthSignUp();
     this.props.onSetTenantConfig();
  }

  render(){
  
    console.log(this.props);
    let routes = (
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} /> 
        <Route path="/logout" exact component={Logout} />
        <Route path="/listings" exact component={Listings} />
        <Route path="/verification/:verifyID" exact component={PhoneVerification} />
        <Route path="/" exact component={Home} />
        <Route path="/product-details/:id" exact component={ProductDetails}></Route>
        <Route path="/store/:id" exact component={Store} />
        <Route path="/all-categories" exact component={AllCategory}/>
        <Redirect to="/"/>
      </Switch>
      );
    


    return (
      <div>

        { (this.props.location.pathname === '/sign-up' || this.props.location.pathname === '/sign-in') ? 
        (<BeforeAuth>
          {routes}
        </BeforeAuth>) : 

       (<Layout>
          {routes}
        </Layout>) }

      </div>
    );
  }

}


// const mapStateToProps = state => {
//   return{
//     isAuthentiated : state.auth.token !== null
//   }
// }

const mapDispatchToProps = dispatch => {
  return{
    onTryAuthSignUp : () => dispatch(actions.authCheckState()),
    onSetTenantConfig : ()=> dispatch(actions.setTenantConfig())
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
