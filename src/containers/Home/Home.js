import React  from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
 import classes from './Home.module.css';
import {  useLocation  } from 'react-router-dom';
import {   useDispatch, useSelector } from 'react-redux';

// import Backdrop from '../../components/UI/Backdrop/Backdrop';
// import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
 
 import StoresToFollow from './StoresToFollow/StoresToFollow';
import LatestProducts from './LatestProducts/LatestProducts';
import Categories from './Categories/Categories';
import { Helmet } from 'react-helmet';
 import { useEffect } from 'react';
  
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useWindowSize from '../../components/Hooks/WindowSize/WindowSize';

const Home = () => {

        const { width } = useWindowSize();


  const dispatch = useDispatch();
  useEffect(() => {
     

      let size = width < 780 ? 'app' : 'web';
 
      dispatch(actions.initHomeCollections());
      dispatch(actions.initPromoBanners(size));
     
  }, [dispatch, width]);

  const location = useLocation();

   const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const followLoading = useSelector((state) => state.store.loading);
  const message = useSelector((state) => state.auth.message);
  const promo_banners = useSelector((state) => state.home.promo_banners);
  const categories = useSelector((state) => state.home.categories);
  // const collections = useSelector((state) => state.home.collections);
  // const isAuthenticated = useSelector((state) => selectUserId(state));
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
          style={{
            position: 'absolute',
            right: 0,
            height: '70%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '500',
          }}
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
