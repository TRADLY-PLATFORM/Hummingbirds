import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link, useLocation, useParams, withRouter, useHistory } from 'react-router-dom';
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
import heartActive from '../../assets/images/products/favourite@2x.png';
import heartDisable from '../../assets/images/products/heartIcon@2x.png';
import { Helmet } from 'react-helmet';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import useWindowSize from '../../components/Hooks/WindowSize/WindowSize';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const ProductDetails = () => {
  const [maps, setMaps] = useState(false);
  const [like, setLike] = useState(false);
  const { width, height } = useWindowSize();

  const location = useLocation();
  const { id } = useParams();
  const history = useHistory();
  console.log('====================================');
  console.log(history);
  console.log('====================================');

  const error = useSelector((state) => state.product.error);
  const loading = useSelector((state) => state.product.loading);
  const message = useSelector((state) => state.product.message);
  const productDetails = useSelector((state) => selectProductDetails(state));
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const token = useSelector((state) => state.auth.token);
  const followLoading = useSelector((state) => state.store.loading);
  const followError = useSelector((state) => state.store.error);
  const followMessage = useSelector((state) => state.store.message);
  const configsData = useSelector((state) => state.auth.general_configs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initProductDetails(id.split('-')[0]), true);
    dispatch(actions.setGeneralConfigsData());
  }, [0]);

  const setPath = () => {
    dispatch(actions.setAuthRedirectPath(location.pathname));
  };

  const showMaps = () => {
    setMaps(true);
  };
  const closeMaps = () => {
    setMaps(false);
  };

  const getHomeBannerControl = () => {
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

  const getHomeBanner = () => {
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

  const getPrices = () => {
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

  const getStoreOwner = () => {
    if (!productDetails.getIn(['listing', 'account', 'user'], Map()).isEmpty()) {
      return (
        productDetails.getIn(['listing', 'account', 'user', 'first_name'], '') +
        ' ' +
        productDetails.getIn(['listing', 'account', 'user', 'last_name'], '')
      );
    }
    return <Skeleton count={10} />;
  };

  const getStoreName = () => {
    if (productDetails.getIn(['listing', 'account', 'name'], '') !== '') {
      const store_name = productDetails.getIn(['listing', 'account', 'name'], '');
      const id = productDetails.getIn(['listing', 'account_id'], '');
      return <Link to={`/a/${id}-${store_name}`}>{store_name}</Link>;
    }
    return <Skeleton count={10} />;
  };

  const getCategoryIds = () => {
    if (productDetails.getIn(['listing', 'categories'], List()).size > 0) {
      return productDetails
        .getIn(['listing', 'categories'], List())
        .map((item) => item.get('name'))
        .join(', ');
    }
    return '';
  };

  const getAttributes = () => {
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

  const getCoOrdinates = () => {
    if (productDetails.getIn(['listing', 'coordinates', 'latitude'], '') !== '') {
      return (
        <div className={classes.DetailsRight + ' col-lg-6'}>
          <Modal show={maps} modalClosed={closeMaps}>
            <Maps
              lat={productDetails.getIn(['listing', 'coordinates', 'latitude'], '')}
              lng={productDetails.getIn(['listing', 'coordinates', 'longitude'], '')}
              address={productDetails.getIn(['listing', 'location', 'formatted_address'], '')}
            />
          </Modal>
          <button type="button" className="btn btn-outline-success" onClick={showMaps}>
            Get Direction
          </button>
        </div>
      );
    }
    return '';
  };

  const storeFollow = () => {
    const storeId = productDetails.getIn(['listing', 'account', 'id'], '');
    let IsFollowing = false;
    if (productDetails.getIn(['listing', 'account', 'following'], '') !== false) {
      IsFollowing = true;
    }

    dispatch(actions.postStoreFollow(storeId, IsFollowing));

    if (!followError) {
      const btn = document.getElementById('followBtn');
      btn.innerText = IsFollowing ? 'Follow' : 'Following';
      btn.classList.remove(IsFollowing ? 'btnGreenStyle' : 'btnOutlineGreenStyle');
      btn.classList.add(IsFollowing ? 'btnOutlineGreenStyle' : 'btnGreenStyle');
    }

    setTimeout(() => {
      if (!followError) {
        dispatch(actions.initProductDetails(id.split('-')[0], false));
      }
    }, 1000);
  };

  const productLike = () => {
    let isLiked = false;
    if (productDetails.getIn(['listing', 'liked'], '') !== isLiked) {
      isLiked = true;
    }
    const productId = productDetails.getIn(['listing', 'id'], '');
    setTimeout(() => {
      dispatch(actions.onProductLikeDisLike(productId, isLiked));
    }, 1000);

    if (!error) {
      const LikeImage = document.getElementById('likeImage');
      LikeImage.src = isLiked ? heartDisable : heartActive;

      LikeImage.classList.remove(isLiked ? classes.heartActive : classes.heartDisable);
      LikeImage.classList.add(isLiked ? classes.heartDisable : classes.heartActive);
    }

    setTimeout(() => {
      if (!error) {
        dispatch(actions.initProductDetails(id.split('-')[0], false));
      }
    }, 2000);
  };
  // const addToCart = () => {
  //    const productId = productDetails.getIn(['listing', 'id'], '');
  //   const cartData = {
  //     cart: {
  //       listing_id: productId,
  //       quantity: 1,
  //     },
  //   };
  //   this.props.onAddToCart(cartData);
  // };
  const getImage = () => {
    return <h2>Hello</h2>;
  };
  //
  const goBack = () => {
    window.history.back();
  };

  //

  let toastMessage = null;
  if (error || followError) {
    toastMessage = <Toast type="error" message={message || followMessage} />;
  }
  const productDescription = productDetails.getIn(['listing', 'description'], 'N/A');

  return (
    <>
      <Helmet>
        <title> {productDetails.getIn(['listing', 'title'], 'N/A')}- Buy Online </title>
        <meta name="description" content={`${productDescription}`} />
        <link rel="canonical" href={location.pathname} />
      </Helmet>
      <Aux>
        <Backdrop show={loading} />
        <Spinner show={loading} />

        {toastMessage}

        <div className={classes.rowBox}>
          {/* <div className="col-lg-12">
            <nav aria-label="breadcrumb">
              <ol className={classes.breadCrumb}>
                <li className="breadcrumb-item active" aria-current="page">
                  <button onClick={goBack}>
                    <img src={ArrowLogo} alt="Back" style={{ marginRight: '10px' }} />
                    Back to previous
                  </button>
                </li>
              </ol>
            </nav>
          </div> */}

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
                      <img className={classes.productImage} src={img} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div className={classes.productTitle}>
                  <p>{productDetails.getIn(['listing', 'title'], 'N/A')}</p>
                  <p style={{ fontWeight: 'bold' }}>{getPrices()}</p>
                </div>
                {width < 1200 && (
                  <>
                    {isAuthenticated ? (
                      <div className={classes.likeBtn}>
                        <button onClick={productLike} className=" ">
                          <img
                            id="likeImage"
                            src={
                              productDetails.getIn(['listing', 'liked'], '')
                                ? heartActive
                                : heartDisable
                            }
                            className={
                              productDetails.getIn(['listing', 'liked'], '')
                                ? classes.heartActive
                                : classes.heartDisable
                            }
                            alt=""
                          />
                        </button>
                      </div>
                    ) : (
                      <Link to="/sign-in" className={classes.likeBtn} onClick={setPath}>
                        <button>
                          <img className={classes.heartDisable} src={heartDisable} alt="" />
                        </button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>

            <div>
              <div className={classes.Description}>
                <span> Description</span>
                <p>{productDetails.getIn(['listing', 'description'], 'N/A')}</p>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-md-6 " style={{ padding: '0' }}>
            <div className="col-lg-12  ">
              <div className="row bgColor">
                <div className={classes.fashionStore}>
                  <div className="  ">
                    <h3>{getStoreName()}</h3>
                    <div>@{getStoreOwner()}</div>
                  </div>
                  <div className=" " style={{ display: 'flex', alignItems: 'center' }}>
                    {isAuthenticated ? (
                      <button
                        id="followBtn"
                        className={`${
                          productDetails.getIn(['listing', 'account', 'following'], '')
                            ? 'btnGreenStyle'
                            : 'btnOutlineGreenStyle'
                        }`}
                        onClick={storeFollow}
                      >
                        {productDetails.getIn(['listing', 'account', 'following'], '')
                          ? 'Following'
                          : 'Follow'}
                      </button>
                    ) : (
                      <Link to="/sign-in" onClick={setPath}>
                        <button
                          className="btnOutlineGreenStyle pull-right "
                          style={{ marginLeft: '15px' }}
                        >
                          Follow
                        </button>
                      </Link>
                    )}
                    {width > 1200 && (
                      <>
                        {isAuthenticated ? (
                          <div className={classes.likeBtn}>
                            <button onClick={productLike} className=" ">
                              <img
                                id="likeImage"
                                src={
                                  productDetails.getIn(['listing', 'liked'], '')
                                    ? heartActive
                                    : heartDisable
                                }
                                className={
                                  productDetails.getIn(['listing', 'liked'], '')
                                    ? classes.heartActive
                                    : classes.heartDisable
                                }
                                alt=""
                              />
                            </button>
                          </div>
                        ) : (
                          <Link to="/sign-in" className={classes.likeBtn} onClick={setPath}>
                            <button>
                              <img className={classes.heartDisable} src={heartDisable} alt="" />
                            </button>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="row bgColor " style={{ marginTop: '20px' }}>
                <div className={classes.details}>
                  <h1 className="h1Headings" style={{ fontSize: '18px' }}>
                    Details
                  </h1>
                  {getAttributes()}

                  <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                    Category
                  </div>
                  <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                    {getCategoryIds()}
                  </div>

                  <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                    Location
                  </div>
                  <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                    {productDetails.getIn(['listing', 'location', 'formatted_address'], '')}
                  </div>
                  <div className={classes.DetailsLeft + ' col-lg-6'}></div>
                  {getCoOrdinates()}
                </div>
              </div>

              {/* <div className="row bgColor" style={{ marginTop: '20px' }}>
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
              </div> */}

              <br />
              <button
                type="button"
                className="btn btn-addtocart btn-lg btn-block height70"
                onClick={() => {
                  javascript: window.open(configsData.app_download_link, '_blank');
                }}
                style={{outline:'none'}}
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
            </div>
          </div>
        </div>
      </Aux>
    </>
  );
};

export default ProductDetails;
