import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link, withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { List, Map } from 'immutable';
import Toast from '../../components/UI/Toast/Toast';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Skeleton from '../../components/UI/Skeleton/Skeleton';
import classes from './ProductDetails.module.css';
import ArrowLogo from '../../assets/images/products/arrow.svg';
import * as actions from '../../store/actions/index';
import { selectProductDetails } from '../../store/selectors/product';
import { selectUserId } from '../../store/selectors/auth';
import Maps from '../../components/UI/Maps/Maps';
import heartActive from '../../assets/images/products/heartActive.png';
import heartDisable from '../../assets/images/products/heartDisable.png';
 
import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);


class ProductDetails extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  state = {
    maps: false,
    like: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.onInitProductDetails(id.split('-')[0]);
  }

  showMaps = () => {
    this.setState({ maps: true });
  };
  closeMaps = () => {
    this.setState({ maps: false });
  };

  getHomeBannerControl = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'images'], List()).size > 0) {
      return (
        <>
          {productDetails.getIn(['listing', 'images'], List()).map((_, index) => {
            let active = '';
            if (index === 0) {
              active = 'active';
            }
            return (
              <li
                key={index}
                data-target="#myCarousel"
                data-slide-to={index}
                className={active}
              ></li>
            );
          })}
        </>
      );
    }
    return <></>;
  };

  getHomeBanner = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'images'], List()).size > 0) {
      return (
        <>
          {productDetails.getIn(['listing', 'images'], List()).map((img, index) => {
            let active = '';
            if (index === 0) {
              active = 'active';
            }

            let classesName = [classes.itemImg, active];
            return (
              <div key={index} className={classesName.join(' ') + ' item '}>
                <img style={{ height: '450px' }} src={img} alt="Chania" />
              </div>
            );
          })}
        </>
      );
    }
    return <Skeleton count={10} />;
  };

  getPrices = () => {
    const { productDetails } = this.props;
    if (!productDetails.getIn(['listing', 'list_price'], Map()).isEmpty()) {
      return (
        productDetails.getIn(['listing', 'list_price', 'formatted'], '') +
        ' ' +
        (productDetails.getIn(['listing', 'list_price', 'offer_percent'], 0) !== 0
          ? productDetails.getIn(['listing', 'list_price', 'offer_percent'], '')
          : '')
      );
    }
    return <Skeleton count={10} />;
  };

  getStoreOwner = () => {
    const { productDetails } = this.props;
    if (!productDetails.getIn(['listing', 'account', 'user'], Map()).isEmpty()) {
      return (
        productDetails.getIn(['listing', 'account', 'user', 'first_name'], '') +
        ' ' +
        productDetails.getIn(['listing', 'account', 'user', 'last_name'], '')
      );
    }
    return <Skeleton count={10} />;
  };

  getStoreName = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'account', 'name'], '') !== '') {
      const store_name = productDetails.getIn(['listing', 'account', 'name'], '');
      const id = productDetails.getIn(['listing', 'account_id'], '');
      return <Link to={`/a/${id}-${store_name}`}>{store_name}</Link>;
    }
    return <Skeleton count={10} />;
  };

  getCategoryIds = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'categories'], List()).size > 0) {
      return productDetails
        .getIn(['listing', 'categories'], List())
        .map((item) => item.get('name'))
        .join(', ');
    }
    return '';
  };

  getAttributes = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'attributes'], List()).size > 0) {
      return productDetails.getIn(['listing', 'attributes'], List()).map((attr, index) => {
        return (
          <React.Fragment key={index}>
            <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
              {attr.get('name')}
            </div>
            <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
              {attr
                .get('values', List())
                .map((item) => item.get('name'))
                .join(', ')}
            </div>
          </React.Fragment>
        );
      });
    }
    return '';
  };

  getCoOrdinates = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'coordinates', 'latitude'], '') !== '') {
      return (
        <div className={classes.DetailsRight + ' col-lg-6'}>
          <Modal show={this.state.maps} modalClosed={this.closeMaps}>
            <Maps
              lat={productDetails.getIn(['listing', 'coordinates', 'latitude'], '')}
              lng={productDetails.getIn(['listing', 'coordinates', 'longitude'], '')}
            />
          </Modal>
          <button type="button" className="btn btn-outline-success" onClick={this.showMaps}>
            Get Direction
          </button>
        </div>
      );
    }
    return '';
  };

  storeFollow = () => {
    const { productDetails } = this.props;
    const storeId = productDetails.getIn(['listing', 'account', 'id'], '');
    let IsFollowing = false;
    if (productDetails.getIn(['listing', 'account', 'following'], '') !== false) {
      IsFollowing = true;
    }
    console.log(storeId);
    this.timer = setTimeout(() => {
      this.props.onStoreFollowUnFollow(storeId, IsFollowing);
    }, 1000);

    this.timer = setTimeout(() => {
      if (!this.props.followError) {
           const id = this.props.match.params.id;
           this.props.onInitProductDetails(id.split('-')[0]);
      }
    }, 2000);
  };

  productLike = () => {
    const { productDetails } = this.props;

    let isLiked = false;
    if (productDetails.getIn(['listing', 'liked'], '') !== isLiked) {
      isLiked = true;
    }
    const productId = productDetails.getIn(['listing', 'id'], '');
    console.log('productDetails', productDetails, productId);
    this.timer = setTimeout(() => {
      this.props.onProductLikeDisLike(productId, isLiked);
    }, 1000);

    this.timer = setTimeout(() => {
      if (!this.props.error) {
            const id = this.props.match.params.id;
            this.props.onInitProductDetails(id.split('-')[0]);
      }
    }, 2000);
  };
  addToCart = () => {
    const { productDetails } = this.props;
    const productId = productDetails.getIn(['listing', 'id'], '');
    const cartData = {
      cart: {
        listing_id: productId,
        quantity: 1,
      },
    };
    this.props.onAddToCart(cartData);
  };
  getImage = () => {
    return <h2>Hello</h2>;
  };

  render() {
    const { match, location, history } = this.props;
    const {
      error,
      productDetails,
      message,
      isAuthenticated,
      followError,
      followMessage,
    } = this.props;
    let toastMessage = null;
    if (error || followError) {
      toastMessage = <Toast type="error" message={message || followMessage} />;
    }
    const productDescription = productDetails.getIn(['listing', 'description'], 'N/A')
    console.log(productDetails.getIn(['listing']));
    console.log('isAuthenticated', isAuthenticated);
    console.log(this.props.token);
    return (
      <>
        <Helmet>
          <title> {productDetails.getIn(['listing', 'title'], 'N/A')}- Buy Online </title>
          <meta name="description" content={`${productDescription}`} />
          <link rel="canonical" href={location.pathname} />
        </Helmet>
        <Aux>
          <Backdrop show={this.props.loading || this.props.followLoading} />
          <Spinner show={this.props.loading || this.props.followLoading} />
          {toastMessage}

          <div className={classes.rowBox + 'row   '}>
            <div className="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol className={classes.breadCrumb}>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to="/home">
                      <img src={ArrowLogo} alt="Back" style={{ marginRight: '10px' }} />
                      Back to profile
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>

            <div className={classes.imageBox + ' col-xs-12 col-md-6 '}>
              <div className={classes.productImageBox}>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  className="mySwiper"
                >
                  {productDetails.getIn(['listing', 'images'], List()).map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img style={{ height: '450px' }} src={img} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <div className={classes.productTitle}>
                  <p>{productDetails.getIn(['listing', 'title'], 'N/A')}</p>
                  <p style={{ fontWeight: 'bold' }}>{this.getPrices()}</p>
                </div>
              </div>

              <div className={classes.Details + ' col-lg-12'}>
                <div className={classes.Description}>
                  <span style={{ fontSize: '15px', marginBottom: '20px' }}>
                    Product Description
                  </span>
                  <p>{productDetails.getIn(['listing', 'description'], 'N/A')}</p>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-6 " style={{ padding: '0' }}>
              <div className="col-lg-12 mt-4">
                <div className="row bgColor">
                  <div className={classes.fashionStore}>
                    <div className="  ">
                      <h3>{this.getStoreName()}</h3>
                      <div>@{this.getStoreOwner()}</div>
                    </div>
                    <div className=" " style={{ display: 'flex', alignItems: 'center' }}>
                      {isAuthenticated ? (
                        <button
                          className={`${
                            this.props.productDetails.getIn(['listing', 'account', 'following'], '')
                              ? 'btnGreenStyle'
                              : 'btnOutlineGreenStyle'
                          }`}
                          onClick={this.storeFollow}
                        >
                          {this.props.productDetails.getIn(['listing', 'account', 'following'], '')
                            ? 'Following'
                            : 'Follow'}
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
                      {isAuthenticated ? (
                        <div className={classes.likeBtn}>
                          <button
                            onClick={this.productLike}
                            className="pull-right"
                            style={{
                              marginLeft: '15px',
                              outline: 'none',
                              border: 'none',
                              backgroundColor: 'transparent',
                            }}
                          >
                            {productDetails.getIn(['listing', 'liked'], '') ? (
                              <img className={classes.heartActive} src={heartActive} alt="" />
                            ) : (
                              <img className={classes.heartDisable} src={heartDisable} alt="" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <Link to="/sign-in" className={classes.likeBtn}>
                          <button
                            className="  pull-right "
                            style={{
                              marginLeft: '15px',
                              outline: 'none',
                              border: 'none',
                              backgroundColor: 'transparent',
                            }}
                          >
                            <img className={classes.heartDisable} src={heartDisable} alt="" />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row bgColor " style={{ marginTop: '20px' }}>
                  <div className={classes.details}>
                    <h1 className="h1Headings" style={{ fontSize: '18px' }}>
                      Details
                    </h1>
                    {this.getAttributes()}

                    <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                      Category
                    </div>
                    <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                      {this.getCategoryIds()}
                    </div>

                    <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                      Location
                    </div>
                    <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                      {productDetails.getIn(['listing', 'location', 'formatted_address'], '')}
                    </div>
                    <div className={classes.DetailsLeft + ' col-lg-6'}></div>
                    {this.getCoOrdinates()}
                  </div>
                </div>

                <div className="row bgColor" style={{ marginTop: '20px' }}>
                  <div className={classes.additionalDetails}>
                    <h1 className="h1Headings" style={{ fontSize: '18px' }}>
                      Additional Details
                    </h1>
                    <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                      Deliver Details
                    </div>
                    <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                      Home Delivery Available, Cash On Delivery
                    </div>
                  </div>
                </div>

                <br />
                <button
                  type="button"
                  className="btn btn-addtocart btn-lg btn-block height70"
                  onClick={() => {
                    javascript: window.open(
                      'https://play.google.com/store/apps/details?id=tradly.platform&hl=en_IN&gl=US',
                      '_blank'
                    );
                  }}
                >
                  Download App
                </button>
                {/* <div className="row">
                  <div className={classes.buttons}>
                    <button
                      type="button"
                      className="btn btn-addtocart btn-lg btn-block height70"
                      style={{ marginRight: '15px' }}
                      onClick={this.addToCart}
                    >
                      Add To Cart
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-lg btn-block height70"
                      style={{ marginLeft: '15px' }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div> */}
                <br />
                <br />
              </div>
            </div>
          </div>

          <br />
          <br />
        </Aux>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.product.error,
    loading: state.product.loading,
    message: state.product.message,
    productDetails: selectProductDetails(state),
    isAuthenticated: selectUserId(state),
    token: state.auth.token,
    followLoading: state.store.loading,
    followError: state.store.error,
    followMessage: state.store.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitProductDetails: (id) => dispatch(actions.initProductDetails(id)),
    onProductLikeDisLike: (id, isLiked) => dispatch(actions.onProductLikeDisLike(id, isLiked)),
    onStoreFollowUnFollow: (id, IsFollowing) => dispatch(actions.postStoreFollow(id, IsFollowing)),
    onGetCart: () => dispatch(actions.getCartList()),
    onAddToCart: (data) => dispatch(actions.addToCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
