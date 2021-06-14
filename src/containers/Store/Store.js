import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import noStoreLogo from '../../assets/images/store/noStore.svg';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './Store.module.css';

class Store extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      if (this.props.isAuthentication) {
        this.props.getUserStoreLists(this.props.userId, this.props.token);
      }
    }, 1000);
  }

  render() {
    let redirectUrl = null;
    // if(!this.props.isAuthentication){
    //     redirectUrl = <Redirect to="/sign-in"/>
    // }

    let storeContent = null;

    if (this.props.isAuthentication && this.props.storeLists) {
      if (this.props.storeLists.length > 0) {
      } else {
        storeContent = (
          <Aux>
            <div className="row">
              <div className="col-lg-12">You don't have a store</div>
            </div>
          </Aux>
        );
      }
    }

    storeContent = (
      <Aux>
        <div className={classes.noStore + ' container-fluid'}>
          <div className="col-lg-12">You don't have a store</div>
          <div>
            <Link to="/create-store">
              <button className={'btnGreenStyle'}>Create Store</button>
            </Link>
          </div>

          <img src={noStoreLogo} alt="Create Store" title="Create Store" />
        </div>
      </Aux>
    );

    return (
      <Aux>
        {redirectUrl}
        <Backdrop show={this.props.loading} />
        <Spinner show={this.props.loading} />
        {storeContent}

        <br />
        <br />
        <br />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.store.loading,
    storeDetails: state.store.storeDetails,
    storeLists: state.store.storeLists,
    isAuthentication: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStoreDetails: (id) => dispatch(actions.initStoreDetails(id)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path, null)),
    getUserStoreLists: (userId, token) => dispatch(actions.userStoreLists(userId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
