import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './productDetali.module.css';

import * as actions from '../../store/actions/index';
import { useLocation, useParams } from 'react-router';
import Toast from '../../components/UI/Toast/Toast';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

// images
import starImage from '../../assets/images/products/Star.svg';
import heartActive from '../../assets/images/products/favourite@2x.png';
import heartDisable from '../../assets/images/products/heartIcon@2x.png';
import locationMarker from '../../assets/images/products/locationMarker (1).svg';
import directionImage from '../../assets/images/products/direction (1).svg';
import noImage from '../../assets/images/products/noImage.svg';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import { selectUserId } from '../../store/selectors/auth';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Slide, ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const ProductDetail = () => {
  const location = useLocation();

  const { id } = useParams();
  // const { width, height } = useWindowSize();

  // Reducer
  const productDetails = useSelector((state) => state.product.productDetails);
  const { listing, ratting_data } = productDetails;

  const isAuthenticated = useSelector((state) => selectUserId(state));
  const error = useSelector((state) => state.product.error);
  const loading = useSelector((state) => state.product.loading);
  const message = useSelector((state) => state.product.message);
  // const token = useSelector((state) => state.auth.token);
  // const followLoading = useSelector((state) => state.store.loading);
  const followError = useSelector((state) => state.store.error);
  const followMessage = useSelector((state) => state.store.message);
  // const configsData = useSelector((state) => state.auth.general_configs);
  const currencies = useSelector((state) => state.store.currencies);
  const cartError = useSelector((state) => state.cart.error);
  const cartErrorMessage = useSelector((state) => state.cart.message);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initProductDetails(id.split('-')[0], true));
    dispatch(actions.setGeneralConfigsData());
    dispatch(actions.initCurrencies());
  }, [dispatch, id]);

  // function

  // Like
  const productLike = () => {
    let isLiked = false;
    if (listing?.liked !== isLiked) {
      isLiked = true;
    }
    const productId = listing?.id;
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

  // Follow
  const storeFollow = () => {
    const storeId = listing?.account.id;
    let IsFollowing = false;
    if (listing?.account.following !== false) {
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

  // auth redirect
  const setPath = () => {
    dispatch(actions.setAuthRedirectPath(location.pathname));
  };

  // Get Attribute
  const getAttributes = () => {
    if (listing?.attributes.length > 0) {
      return listing?.attributes.map((attr, index) => {
        return (
          <div key={index}>
            {attr.field_type === 1 && (
              <div>
                <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                  {attr.name}
                </div>
                <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  {attr.values.map((item) => item.name).join(', ')}
                </div>
              </div>
            )}
            {attr.field_type === 2 && (
              <div key={index}>
                <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                  {attr.name}
                </div>
                <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  {attr.values.map((item) => item.name).join(', ')}
                </div>
              </div>
            )}
            {attr.field_type === 3 && (
              <div key={index}>
                <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                  {attr.name}
                </div>
                <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  {attr.values.map((item) => item).join(', ')}
                </div>
              </div>
            )}
            {attr.field_type === 4 && (
              <div key={index}>
                <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                  {attr.name}
                </div>
                <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  {attr.values.map((item) => item).join(', ')}
                </div>
              </div>
            )}
          </div>
        );
      });
    }
    return '';
  };

  // Get Category
  const getCategoryIds = () => {
    if (listing?.categories.length > 0) {
      return listing?.categories.map((item) => item.name).join(', ');
    }
    return '';
  };

  // toast Message
  let toastMessage = null;
  if (error || followError || cartError) {
    toastMessage = <Toast type="error" message={message || followMessage || cartErrorMessage} />;
  }

  // prev page
  const goBack = () => {
    window.history.back();
  };
  // add cart
  const addCart = () => {
    const productId = listing?.id;
    const cartData = {
      cart: {
        listing_id: productId,
        quantity: 1,
      },
    };
    dispatch(actions.addToCart(cartData, currencies[0]));
    setTimeout(() => {
      if (!error) {
        dispatch(actions.initProductDetails(id.split('-')[0], false));
        dispatch(actions.initCurrencies());
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title> {listing?.title || 'N/A'}- Buy Online </title>
        <meta name="description" content={`${listing?.description}`} />
        <link rel="canonical" href={location.pathname} />
      </Helmet>
      <Aux>
        <Backdrop show={loading} />
        <Spinner show={loading} />
        <ToastContainer
          autoClose={2000}
          position="bottom-right"
          transition={Slide}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {toastMessage}

        <div className="">
          {location.state && (
            <>
              <button onClick={goBack} className={classes.breadCrumb}>
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill=" var(--primary_color)"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: '10px' }}
                >
                  <path d="M16 6V8H4L8 12L7 14L0 7L7 0L8 2L4 6H16Z" />
                </svg>
                Back to {location.state.prevPath}
              </button>
            </>
          )}
        </div>

        {!loading && (
          <div className={classes.productDetailsBanner}>
            <div className={classes.productDetailsBox}>
              <div className={classes.MainPart}>
                <div>
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
                    {listing?.images.map((img, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <img className={classes.productImage} src={img} alt="productImage" />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  {listing?.description.length > 0 && (
                    <div className={classes.description}>
                      <h4 className={classes.descriptionHeader}>Description</h4>
                      <p className={classes.descriptionBody}>{listing?.description}</p>
                    </div>
                  )}
                </div>
                <div className={classes.MainPartInfo}>
                  <div className={classes.productHeaderPart}>
                    <p className={classes.stockMessage}>
                      {listing?.stock && `Only ${listing?.stock} products in stock`}
                    </p>
                    <h4 className={classes.productName}>{listing?.title}</h4>
                    <p className={classes.productName}>{listing?.list_price.formatted}</p>
                    <div className={classes.ratingInfo}>
                      <img src={starImage} alt="" />
                      <p>{ratting_data && ratting_data.rating_average}</p>
                      <span>{ratting_data?.rating_count} Ratings</span>
                    </div>
                    <div className={classes.buttons}>
                      {isAuthenticated ? (
                        <>
                          {listing?.in_cart ? (
                            <Link
                              to="/cart"
                              type="button"
                              className={classes.addToCart}
                              onClick={addCart}
                            >
                              Go To Cart
                            </Link>
                          ) : (
                            <button type="button" className={classes.addToCart} onClick={addCart}>
                              Add To Cart
                            </button>
                          )}

                          <Link
                            onClick={addCart}
                            type="button"
                            className={classes.buyNow}
                            to={{
                              pathname: `/cart`,
                              state: { option: 'Buy Now' },
                            }}
                          >
                            Buy Now
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            onClick={setPath}
                            to="/sign-in"
                            type="button"
                            className={classes.addToCart}
                          >
                            Add To Cart
                          </Link>
                          <Link
                            onClick={setPath}
                            to="/sign-in"
                            type="button"
                            className={classes.buyNow}
                          >
                            Buy Now
                          </Link>
                        </>
                      )}
                    </div>
                    {isAuthenticated ? (
                      <div className={classes.likeBtn}>
                        <button onClick={productLike} className=" ">
                          <img
                            id="likeImage"
                            src={listing?.liked ? heartActive : heartDisable}
                            className={listing?.liked ? classes.heartActive : classes.heartDisable}
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
                  </div>
                  {listing?.location.formatted_address.length > 0 && (
                    <div className={classes.addressBox}>
                      <div className={classes.markerImage}>
                        <img src={locationMarker} alt="" />
                      </div>
                      <div>
                        <p className={classes.shortAddress}>
                          {listing?.location.city && `${listing?.location.city}`}
                          {listing?.location.country && `${listing?.location.country}`}
                        </p>
                        <p className={classes.formattedAddress}>
                          {listing?.location.formatted_address}
                        </p>
                      </div>
                      <div className={classes.directionImage}>
                        <img src={directionImage} alt="" />
                      </div>
                    </div>
                  )}
                  <div className={classes.storeDetails}>
                    <img
                      src={
                        listing?.account.images.length > 0 ? listing?.account.images[0] : noImage
                      }
                      alt=""
                      className={classes.storeImage}
                    />
                    <Link
                      className={classes.storeName}
                      to={`/a/${listing?.account_id}-${listing?.account.name}`}
                    >
                      {listing?.account.name}
                    </Link>
                    {/* <p className={classes.storeName}>{listing?.account.name}</p> */}
                    <div className={classes.followButton}>
                      {isAuthenticated ? (
                        <button
                          id="followBtn"
                          className={`${
                            listing?.account.following ? 'btnGreenStyle' : 'btnOutlineGreenStyle'
                          }`}
                          onClick={storeFollow}
                        >
                          {listing?.account.following ? 'Following' : 'Follow'}
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
                    </div>
                  </div>
                  {/* <div className={classes.shareButton}>
                  <button
                    type="button"
                    className="btn btn-addtocart btn-lg btn-block height70"
                    onClick={() => {
                      javascript: window.open(configsData.app_download_link, '_blank');
                    }}
                    style={{ outline: 'none' }}
                  >
                    Download App
                  </button>
                </div> */}
                  <div>
                    <div className={classes.detailsBox}>
                      <h4 className={classes.detailsHeader}>Details</h4>
                      <div className={classes.attributePart}>{getAttributes()}</div>

                      <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                        Category
                      </div>
                      <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                        {getCategoryIds()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Aux>
    </>
  );
};

export default ProductDetail;
