import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import Category from '../../components/Category/Category';
import classes from './Home.module.css';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import MoreLogo from '../../assets/images/home/category/more.svg';
import ItemsCarousel from 'react-items-carousel';

import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';

// import StoreLogo from '../../assets/images/home/store/store1.svg';
// import StoreLogo2 from '../../assets/images/home/store/store2.svg';

import NoProductImage from '../../assets/images/rsz_noimage.png';
import StoresToFollow from './StoresToFollow/StoresToFollow';
import LatestProducts from './LatestProducts/LatestProducts';
import Categories from './Categories/Categories';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { selectUserId } from '../../store/selectors/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import reactLoaderSpinner from 'react-loader-spinner';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useWindowSize from '../../components/Hooks/WindowSize/WindowSize';

const Home = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [loadOnce, setLoadOnce] = useState(true);
  const [categorySet, setCategorySet] = useState([]);
  const [categoryLength, setCategoryLength] = useState(0);
      const { width, height } = useWindowSize();


  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {

      let size = width < 780 ? 'app' : 'web';
 
      dispatch(actions.initHomeCollections());
      dispatch(actions.initPromoBanners(size));
    }, 2000);
  }, [width]);

  const location = useLocation();

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const followLoading = useSelector((state) => state.store.loading);
  const message = useSelector((state) => state.auth.message);
  const promo_banners = useSelector((state) => state.home.promo_banners);
  const categories = useSelector((state) => state.home.categories);
  const collections = useSelector((state) => state.home.collections);
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const products = useSelector((state) => state.home.products);
  const storesToFollow = useSelector((state) => state.home.stores);
  const seo_configs = useSelector((state) => state.auth.seo_configs);

 
 
  // redirectListing = () => {
  //    history.push('/listings');
  // };
  return (
    <Aux className={classes.HomePage}>
      <Helmet>
        <title>{seo_configs?.meta_title}</title>
        <meta name="description" content={seo_configs.meta_description} />
        <link href={location.pathname} />
      </Helmet>
      {/* <Backdrop show={loading || followLoading} /> */}
      {/* <Spinner show={loading || followLoading} /> */}

      {!categories.length > 0 ? (
        <Loader
          type="ThreeDots"
          color="var(--primary_color)"
          height={100}
          width={100}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      ) : (
        <>
          <div className={classes.homeContent}>
            <HomeBanner images={promo_banners} />
            <Categories categories={categories} />
             <StoresToFollow storesToFollow={storesToFollow} />
            <LatestProducts products={products} />
            
          </div>
        </>
      )}
    </Aux>
  );
};

export default Home;
