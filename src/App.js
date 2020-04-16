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
import ProductDetails from './containers/ProductDetails/ProductDetails';
import Store from './containers/Store/Store';
import * as actions from '../src/store/actions/index';


class App extends Component {

  

  componentDidMount() {
     this.props.onTryAuthSignUp();
     this.props.onSetTenantConfig();
  }

  render(){

    // let routes = (
    //   <Switch>
    //     <Route path="/" exact component={SignUp} />
    //     <Route path="/sign-in" exact component={SignIn} /> 
    //     <Route path="/logout" exact component={Logout} />
    //     <Route path="/verification/:verifyID" exact component={PhoneVerification} />
    //     <Route path="/home" exact component={Home} />
    //     <Route path="/product-details" exact component={ProductDetails} />
    //     <Route path="/store" exact component={Store} />
    //     <Redirect to="/"/>
    //   </Switch>
    // );

    let routes = (
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} /> 
        <Route path="/verification/:verifyID" exact component={PhoneVerification} />
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuthentiated){
      routes = (
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} /> 
        <Route path="/logout" exact component={Logout} />
        <Route path="/verification/:verifyID" exact component={PhoneVerification} />
        <Route path="/home" exact component={Home} />
        <Route path="/product-details" exact component={ProductDetails} />
        <Route path="/store" exact component={Store} />
        <Redirect to="/"/>
      </Switch>
      );
    }


    return (
      <div>

        { (this.props.isAuthentiated) ? 
        (<Layout>
          {routes}
        </Layout>) : 

       (<BeforeAuth>
          {routes}
        </BeforeAuth>) }

      </div>
    );
  }

}


const mapStateToProps = state => {
  return{
    isAuthentiated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAuthSignUp : () => dispatch(actions.authCheckState()),
    onSetTenantConfig : ()=> dispatch(actions.setTenantConfig())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
