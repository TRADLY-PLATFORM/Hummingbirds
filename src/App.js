import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BeforeAuth from './hoc/Layout/BeforeAuth/BeforeAuth';
import SignUp from './containers/Auth/SignUp/SignUp';
import SignIn from './containers/Auth/SignIn/SignIn';
import PhoneVerification from './containers/Auth/PhoneVerification/PhoneVerification';
import Home from './containers/Home/Home';

class App extends Component {

  state = {
    isAuthenticated : false
  }

  render(){

    let routes = (
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} /> 
        <Route path="/verification" exact component={PhoneVerification} />
        <Route path="/home" exact component={Home} />
        <Redirect to="/"/>
      </Switch>
    );


    return (
      <div>

        { (!this.state.isAuthenticated) ? 
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

export default withRouter(App);
