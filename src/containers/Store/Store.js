import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import noStoreLogo from '../../assets/images/store/noStore.svg';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './Store.module.css';
import { selectUserId } from '../../store/selectors/auth';
import { selectStoreLists } from '../../store/selectors/store';
class Store extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      if (this.props.isAuthenticated) {
        this.props.getUserStoreLists(this.props.isAuthenticated);
      }
    }, 1000);
  }

  render() {
    let redirectUrl = null;
    // if(!this.props.isAuthentication){
    //     redirectUrl = <Redirect to="/sign-in"/>
    // }

    const { isAuthenticated, storeLists } = this.props;
    let storeContent = null;

    if (isAuthenticated && storeLists) {
      if (storeLists.size > 0) {
        storeContent = (
          <React.Fragment>
            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
              <Link to="/create-store">
                <button className={'btnGreenStyle'}>Create Store</button>
              </Link>
            </div>

            {storeLists.map((list, i) => {
              let imagePath = list.getIn(['images', 0], AllenSollyLogo);
              let description = list.get('description');
              if (description.size > 35) {
                description = description.substring(0, 35) + '...';
              }

              return (
                <div className="col-lg-3 col-md-3">
                  <div className="row">
                    <div className={classes.wellStore + ' col-lg-12'} key={i}>
                      <div className={classes.imageDiv}>
                        <img
                          src={imagePath}
                          alt={list.get('name', '')}
                          title={list.get('name', '')}
                        />
                      </div>
                      <div>{list.get('name', '')}</div>
                      <p>{description}</p>
                      <Link to={`/store-details/${list.get('id', '')}/${list.get('name', '')}`}>
                        <button className={classes.btnGreenFollow + ' mt-5'}>View Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        );
      } else {
        storeContent = (
          <Aux>
            <div className={classes.noStore + ' container-fluid'}>
              <div className="col-lg-12">You don&apos;t have a store</div>
              <div>
                <Link to="/create-store">
                  <button className={'btnGreenStyle'}>Create Store</button>
                </Link>
              </div>

              <img src={noStoreLogo} alt="Create Store" title="Create Store" />
            </div>
          </Aux>
        );
      }
    }

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
    storeLists: selectStoreLists(state),
    isAuthenticated: selectUserId(state),
    authRedirectPath: state.auth.authRedirectPath,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStoreDetails: (id) => dispatch(actions.initStoreDetails(id)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path, null)),
    getUserStoreLists: (userId) => dispatch(actions.userStoreLists(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
