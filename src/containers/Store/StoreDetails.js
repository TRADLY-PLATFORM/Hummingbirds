import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { List } from 'immutable';
import { connect } from 'react-redux';

import classes from './Store.module.css';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import StoreBanner from '../../assets/images/store/store.svg';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import Maps from '../../components/UI/Maps/Maps';
import Modal from '../../components/UI/Modal/Modal';
import { selectStoreDetails } from '../../store/selectors/store';
import { totalCountOfProducts } from '../../shared/constants';
import Listing from '../../components/Listing/Listing';
import { selectListings, selectTotalListings } from '../../store/selectors/product';
import { selectUserId } from '../../store/selectors/auth';

import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

 

class StoreDetails extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id},
      },
    } = props;

    this.state = {
      storeId: id.split('-')[0],
      storeName: id.split('-')[1],
      maps: false,
    };
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { storeId } = this.state;
    this.props.onInitStoreDetails(storeId);
    const filter = '&account_id=' + storeId;
    this.props.onInitListings(0, filter, totalCountOfProducts);
  }

  showMaps = () => {
    this.setState({ maps: true });
  };
  closeMaps = () => {
    this.setState({ maps: false });
  };

  getCategory = () => {
    const { storeDetails } = this.props;
    if (storeDetails.get('categories', List()).size > 0) {
      return storeDetails
        .get('categories', List())
        .map((item) => item.get('name'))
        .join(', ');
    }
    return '';
  };

  postStoreFollow = () => {
    const { storeDetails } = this.props;
    const storeId = storeDetails.get('id');
    let IsFollowing = false;
    if (storeDetails.get('following') !== false) {
      IsFollowing = true;
    }
    console.log(storeId);
    this.timer = setTimeout(() => {
      this.props.postStoreFollow(storeId, IsFollowing);
    }, 1000);

    this.timer = setTimeout(() => {
      if (!this.props.error) {
        const { storeId } = this.state;
        this.props.onInitStoreDetails(storeId);
        const filter = '&account_id=' + storeId;
        this.props.onInitListings(0, filter, totalCountOfProducts);
      }
    }, 2000);
  };
  render() {
    const { storeDetails, listings, total_records, loading } = this.props;
    let listing = '';
    let showLoadButton = null;
    let storeContent = null;
    let storeName = storeDetails.get('name', '');
    let storeOwner =
      storeDetails.getIn(['user', 'first_name'], '') +
      ' ' +
      storeDetails.getIn(['user', 'last_name'], '');
    if (listings && listings.size === 0 && !loading) {
      listing = (
        <div style={{ marginTop: '5em' }} className="alert alert-danger fade in alert-dismissible">
          <Link to="#" className="close" data-dismiss="alert" aria-label="close" title="close">
            ×
          </Link>
          <strong>oops!</strong> No listings found.
        </div>
      );
    }
    if (listings && listings.size > 0) {
      listing = <Listing listings={listings} total_records={total_records} />;
      if (total_records > totalCountOfProducts && listings.size !== total_records) {
        showLoadButton = (
          <div className="col-sm-12">
            <button
              className="btnGreenStyle pull-right mt-4"
              onClick={this.loadMore}
              style={{ marginBottom: '50px' }}
            >
              Load More
            </button>
          </div>
        );
      }
    }

    storeContent = (
      <Aux>
        <img
          src={StoreBanner}
          className={classes.storeImage}
          alt="Woman accesories"
          title="Woman accesories"
        />
        <div class="container-fluid">
          <div className={classes.bannerimages + ' row'}>
            <div className="col-lg-12">
              <div className={classes.bannerText + ' col-sm-12'}>
                <div className={classes.fashionStore}>
                  <div>
                    {storeDetails.getIn(['images', 0], '') !== '' ? (
                      <img
                        src={storeDetails.getIn(['images', 0], '')}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                    ) : (
                      <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories" />
                    )}
                  </div>

                  <div>
                    <h3>{storeName}</h3>
                    <p>@{storeOwner}</p>
                  </div>
                </div>
                <div className={classes.followBtn}>
                  {/* <button className="btnGreenStyle pull-right mt-4" onClick={this.postStoreFollow}>
                    Follow
                  </button> */}
                  {this.props.isAuthenticated ? (
                    <button
                      className={`${
                        this.props.storeDetails.get('following')
                          ? 'btnGreenStyle'
                          : 'btnOutlineGreenStyle'
                      } pull-right  `}
                      onClick={this.postStoreFollow}
                    >
                      {this.props.storeDetails.get('following') ? 'Following' : 'Follow'}
                    </button>
                  ) : (
                    <Link to="/sign-in">
                      <button
                        className="btnOutlineGreenStyle pull-right "
                        style={{ marginLeft: '15px' }}
                      >
                        Follow
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <div className={classes.bannerDescText + ' row'}>
            <div className=" col-lg-12 mb1">
              <div className="col-xs-5 col-lg-3">
                Descriptions <span className="float-right">:</span>
              </div>
              <div className="col-xs-7 col-lg-9">
                {storeDetails.get('description', '') || 'N/A'}
              </div>
            </div>
            <div className="col-lg-12 mb1">
              <div className="col-xs-5 col-lg-3">
                categories <span className="float-right">:</span>
              </div>
              <div className="col-xs-7 col-lg-9">{this.getCategory()}</div>
            </div>
            <div className="col-lg-12 mb1">
              <div className="col-xs-5 col-lg-3">
                Location <span className="float-right">:</span>
              </div>
              <div className="col-xs-7 col-lg-9">
                <span> {storeDetails.getIn(['location', 'formatted_address'], 'N/A')}</span>
                <Modal show={this.state.maps} modalClosed={this.closeMaps}>
                  <Maps
                    lat={storeDetails.getIn(['coordinates', 'latitude'], '')}
                    lng={storeDetails.getIn(['coordinates', 'longitude'], '')}
                    address={storeDetails.getIn(['location', 'formatted_address'], 'N/A')}
                  />
                </Modal>
                <button
                  type="button"
                  className="btn btn-outline-success float-right"
                  onClick={this.showMaps}
                >
                  Get Direction
                </button>
              </div>
            </div>
            <div className=" col-lg-12 mb1">
              <div className="col-xs-5 col-lg-3">
                Total Followers <span className="float-right">:</span>
              </div>
              <div className="col-xs-7 col-lg-9">{storeDetails.get('total_followers', '')}</div>
            </div>
            <div className="col-lg-12 mb1">
              <div className="col-xs-5  col-lg-3">
                Total Listings <span className="float-right">:</span>
              </div>
              <div className="col-xs-7 col-lg-9">{storeDetails.get('total_listings', '')}</div>
            </div>
          </div>
        </div>
        {listing}
      </Aux>
    );
    console.log(this.props.isAuthenticated);
    const { match, location, history } = this.props;
    
    const buisnessName = process.env.REACT_APP_BUSINESS_NAME;

    return (
      <>
        <Helmet>
          <title>Find items sold by {storeName}. Buy online</title>
          <meta
            name="description"
            content={`Products sold by ${storeName}. Chat and buy from mobile app. `}
          />
          <link rel="canonical" href={location.pathname} />
        </Helmet>
        {/* <Helmet>
          <title>
           
            Buy online from - {`${process.env.REACT_APP_BUSINESS_NAME}`} from your mobile via app 
          </title>
          <meta name="description" content={storeName + '-' + storeOwner} />
          <link rel="canonical" href={location.pathname} />
        </Helmet> */}
        <Aux>
          <Backdrop show={this.props.loading} />
          <Spinner show={this.props.loading} />
          {storeContent}
          

          <br />
          <br />
          <br />
        </Aux>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.store.error,
    loading: state.store.loading,
    storeDetails: selectStoreDetails(state),
    storeLists: state.store.storeLists,
    isAuthenticated: selectUserId(state),
    // isAuthentication: state.auth.token !== null,
    userId: state.auth.userId,
    token: state.auth.token,
    total_records: selectTotalListings(state),
    listings: selectListings(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStoreDetails: (id) => dispatch(actions.initStoreDetails(id)),
    onInitListings: (count, filterValue, totalCountOfProducts) =>
      dispatch(actions.initListings(count, filterValue, totalCountOfProducts)),
    postStoreFollow: (storeId, IsFollowing) =>
      dispatch(actions.postStoreFollow(storeId, IsFollowing)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetails);
