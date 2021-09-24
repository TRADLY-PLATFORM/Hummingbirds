import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectUserId } from '../../../store/selectors/auth';
import noStoreLogo from '../../../assets/images/store/noStore.svg';

import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import classes from './Store.module.css';
import AllenSollyLogo from '../../../assets/images/home/store/allenSolly.svg';
import StoreBanner from '../../../assets/images/store/store.svg';
import { totalCountOfProducts } from '../../../shared/constants';

class Store extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.getUserStoreLists(this.props.isAuthenticated);
    }, 1000);
  }

  render() {
    let redirectUrl = null;
    // if(!this.props.isAuthentication){
    //     redirectUrl = <Redirect to="/sign-in"/>
    // }

    let storeContent = null;
    const { isAuthenticated, storeLists } = this.props;

    if (isAuthenticated && storeLists) {
      if (this.props.storeLists.length > 0) {
        storeContent = (
          <React.Fragment>
            {storeLists.map((list, i) => {
              let imagePath = AllenSollyLogo;
              let description = list.description;
              if (description.size > 35) {
                description = description.substring(0, 35) + '...';
              }
              let storeName = list.name;
              let storeOwner = list.user.first_name;

              return (
                <div className=" " key={i}>
                  <div>
                    <div class="container-fluid">
                      <div className={classes.bannerimages + ' row'}>
                        <div className="col-lg-12">
                          <div className={classes.bannerText + ' col-sm-12'}>
                            <div className={classes.fashionStore}>
                              <div>
                                {storeDetails.getIn(['images', 0], '') !== '' ? (
                                  <img
                                    src={storeDetails.getIn(['images', 0], '')}
                                    alt={storeName}
                                    title={storeName}
                                  />
                                ) : (
                                  <img src={AllenSollyLogo} alt={storeName} title={storeName} />
                                )}
                              </div>

                              <div className={classes.fashionStoreNameBox}>
                                <h3>{storeName}</h3>
                                <span>@{storeOwner}</span>
                              </div>
                            </div>
                            <div className={classes.followBtn}>
                              <button className="btnGreenStyle pull-right  ">
                                Go to profile store
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div></div>
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

    // storeContent = (
    //   <Aux>
    //     <div className={classes.noStore + ' container-fluid'}>
    //       <div className="col-lg-12">You don't have a store</div>
    //       <div>
    //         <Link to="/create-store">
    //           <button className={'btnGreenStyle'}>Create Store</button>
    //         </Link>
    //       </div>

    //       <img src={noStoreLogo} alt="Create Store" title="Create Store" />
    //     </div>
    //   </Aux>
    // );

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
    isAuthenticated: selectUserId(state),
    authRedirectPath: state.auth.authRedirectPath,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStoreDetails: (id) => dispatch(actions.initStoreDetails(id)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path, null)),
    getUserStoreLists: (userId) => dispatch(actions.userStoreLists(userId)),
    onInitListings: (count, filterValue, totalCountOfProducts) =>
      dispatch(actions.initListings(count, filterValue, totalCountOfProducts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
