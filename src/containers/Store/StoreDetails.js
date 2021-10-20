/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { List } from 'immutable';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import classes from './Store.module.css';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import * as actions from '../../store/actions/index';

import Maps from '../../components/UI/Maps/Maps';
import Modal from '../../components/UI/Modal/Modal';
import { selectStoreDetails } from '../../store/selectors/store';
import { totalCountOfProducts } from '../../shared/constants';
import Listing from '../../components/Listing/Listing';
import { selectListings, selectTotalListings } from '../../store/selectors/product';
import { selectUserId } from '../../store/selectors/auth';
import { getThumbnailImage } from '../../shared/constants';

import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

class StoreDetails extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
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
    this.props.onInitListings(0, filter, totalCountOfProducts, true);
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
  setPath = () => {
    this.props.setRedirectPath(this.props.location.pathname);
  };

  postStoreFollow = () => {
    const { storeDetails } = this.props;
    const storeId = storeDetails.get('id');
    let IsFollowing = false;
    if (storeDetails.get('following') !== false) {
      IsFollowing = true;
    }
    this.timer = setTimeout(() => {
      this.props.postStoreFollow(storeId, IsFollowing);
    }, 1000);

    if (!this.props.error) {
      const btn = document.getElementById('followBtn');
      btn.innerText = IsFollowing ? 'Follow' : 'Following';
      btn.classList.remove(IsFollowing ? 'btnGreenStyle' : 'btnOutlineGreenStyle');
      btn.classList.add(IsFollowing ? 'btnOutlineGreenStyle' : 'btnGreenStyle');
    }

    this.timer = setTimeout(() => {
      if (!this.props.error) {
        const { storeId } = this.state;
        this.props.onInitStoreDetails(storeId);
        const filter = '&account_id=' + storeId;
        this.props.onInitListings(0, filter, totalCountOfProducts);
      }
    }, 2000);
  };

  loadMore = () => {
    const { storeId } = this.state;

    let count = this.props.allListings.length;
    const filter = '&account_id=' + storeId;

    if (this.props.allListings.length === 100) {
      this.props.onInitListings(
        0,
        filter,
        totalCountOfProducts,
        false,
        parseInt(this.props.page) + 1
      );
    } else {
      this.props.onInitListings(
        count,
        filter,
        totalCountOfProducts,
        false,
        parseInt(this.props.page)
      );
    }
  };

  render() {
    const { storeDetails, listings, total_records, loading, allListings, seoConfigs } = this.props;
    let listing = '';
    let showLoadButton = null;
    let storeContent = null;
    let storeName = storeDetails.get('name', '');
    let storeOwner =
      storeDetails.getIn(['user', 'first_name'], '') +
      ' ' +
      storeDetails.getIn(['user', 'last_name'], '');
    if (listings && listings.size === 0 && !loading && allListings !== null) {
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
      listing = (
        <Listing listings={listings} total_records={total_records} message="Store details" />
      );
      if (total_records > totalCountOfProducts && listings.size !== total_records) {
        showLoadButton = (
          <div className="col-sm-12">
            <button className="btnGreenStyle pull-right mt-4" onClick={this.loadMore}>
              Load More
            </button>
          </div>
        );
      }
    }

    storeContent = (
      <Aux>
        <div>
          <div className={classes.storeBanner}></div>

          <div className={classes.storeHeader}>
            <div className={classes.bannerText}>
              <div className={classes.fashionStore}>
                <div>
                  {storeDetails.getIn(['images', 0], '') !== '' ? (
                    <img
                      src={getThumbnailImage(storeDetails.getIn(['images', 0], ''))}
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
                {/* <button className="btnGreenStyle pull-right mt-4" onClick={this.postStoreFollow}>
                    Follow
                  </button> */}
                {this.props.isAuthenticated ? (
                  <button
                    id="followBtn"
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
                  <Link to="/sign-in" onClick={this.setPath}>
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
        <div className={classes.storeDetailsBox}>
          <div className="container-fluid">
            <div className={classes.bannerDescText + ' row'}>
              <div className={classes.desCriptionRow}>
                <div className=" textBold">
                  Descriptions <span className="float-right">:</span>
                </div>
                <div className=" pl-10">
                  <ReactMarkdown>{storeDetails.get('description', '') || 'N/A'}</ReactMarkdown>
                </div>
              </div>
              <div className={classes.storeRow}>
                <div className="  textBold">
                  categories <span className="float-right ">:</span>
                </div>
                <div className="pl-10 ">{this.getCategory()}</div>
              </div>
              <div className={classes.storeRow}>
                <div className="  textBold">
                  Location <span className="float-right">:</span>
                </div>
                <div className=" pl-10">
                  <span> {storeDetails.getIn(['location', 'formatted_address'], 'N/A')}</span>
                  <Modal show={this.state.maps} modalClosed={this.closeMaps}>
                    <Maps
                      lat={storeDetails.getIn(['coordinates', 'latitude'], '')}
                      lng={storeDetails.getIn(['coordinates', 'longitude'], '')}
                      address={storeDetails.getIn(['location', 'formatted_address'], 'N/A')}
                    />
                  </Modal>
                  {/* <button
                    type="button"
                    className="btn btn-outline-success float-right"
                    onClick={this.showMaps}
                  >
                    Get Direction
                  </button> */}
                </div>
              </div>
              <div className={classes.storeRow}>
                <div className=" textBold">
                  Total Followers <span className="float-right">:</span>
                </div>
                <div className="pl-10 ">{storeDetails.get('total_followers', '')}</div>
              </div>
              <div className={classes.storeRow}>
                <div className="  textBold">
                  Total Listings <span className="float-right">:</span>
                </div>
                <div className="pl-10">{storeDetails.get('total_listings', '')}</div>
              </div>
            </div>
          </div>
          {listing}
          {showLoadButton}
        </div>
      </Aux>
    );
    const { location } = this.props;

    // seo title
    const seoTitle = (text) => {
      if (text) {
        const check = text.includes('{account_title}');
        if (check) {
          return text.replace('{account_title}', storeName);
        }
        return text;
      }
    };

    // Seo description
    const seoDescription = (text) => {
      if (text) {
        const check = text.includes('{account_title}');
        const check2 = text.includes('{account_description}');
        if (check && check2) {
          const first = text.replace('{account_title}', storeName);
          return first.replace(
            '{account_description}',
            storeDetails.get('description', '') || 'N/A'
          );
        } else if (check) {
          return text.replace('{account_title}', storeName);
        } else if (check2) {
          return text.replace(
            '{account_description}',
            storeDetails.get('description', '') || 'N/A'
          );
        }

        return text;
      }
    };

    return (
      <>
        <Helmet>
          <title>{`${seoTitle(seoConfigs.meta_account_title)}`}</title>
          <meta
            name="description"
            content={`${seoDescription(seoConfigs.meta_account_description)} `}
          />
          <link rel="canonical" href={location.pathname} />
        </Helmet>

        <Aux>
          {/* <Backdrop show={this.props.loading} />
          <Spinner show={this.props.loading} /> */}
          {(this.props.loading || this.props.listingsLoading) && (
            <>
              <div className={classes.Backdrop}>
                <Loader
                  type="ThreeDots"
                  color="var(--primary_color)"
                  height={100}
                  width={100}
                  style={{
                    position: 'absolute',
                    right: 0,
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '500',
                  }}
                />
              </div>
            </>
          )}
          <div>{storeContent}</div>
        </Aux>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.store.error,
    loading: state.store.loading,
    listingsLoading: state.product.loading,
    storeDetails: selectStoreDetails(state),
    storeLists: state.store.storeLists,
    isAuthenticated: selectUserId(state),
    // isAuthentication: state.auth.token !== null,
    userId: state.auth.userId,
    token: state.auth.token,
    total_records: selectTotalListings(state),
    listings: selectListings(state),
    allListings: state.product.listings,
    page: state.product.page,
    seoConfigs: state.auth.seo_configs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStoreDetails: (id) => dispatch(actions.initStoreDetails(id)),
    onInitListings: (count, filterValue, totalCountOfProducts, loading, page) =>
      dispatch(actions.initListings(count, filterValue, totalCountOfProducts, loading, page)),
    postStoreFollow: (storeId, IsFollowing) =>
      dispatch(actions.postStoreFollow(storeId, IsFollowing)),
    setRedirectPath: (redirectPath) => dispatch(actions.setAuthRedirectPath(redirectPath)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetails);
