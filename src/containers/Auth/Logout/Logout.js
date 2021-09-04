import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    setTimeout(() => {
         this.props.onSetOnboardingConfigsData();
     }, 1000);
    
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    onSetOnboardingConfigsData: () => dispatch(actions.setOnboardingConfigsData()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
