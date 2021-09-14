import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './LatestProduct.module.css';
import NoIamgeLogo from '../../../assets/images/home/store/noImage.svg';
import { Link } from 'react-router-dom';
import NoProductImage from '../../../assets/images/rsz_noimage.png';
import ItemsCarousel from 'react-items-carousel';
import { size } from 'underscore';
import useWindowSize from '../../../components/Hooks/WindowSize/WindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const LatestProducts = ({ products }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { width, height } = useWindowSize();
  const collections = useSelector((state) => state.home.collections);

 
  const dispatch = useDispatch();
  // useEffect(() => {
  //    dispatch(actions.initLatestProducts());
  // }, [0])
  // const products = useSelector((state) => state.home.latestProducts);

  let arrayListings = [];
  let title = products.title;
  arrayListings = products?.listings?.map((list, i) => {
    let imagePath = NoProductImage;
    if (list.images[0] !== undefined) {
      imagePath = list.images[0];
    }

    return (
      <Link
        to={`/l/${list.id}-${`${list.title.replace('%', '')}`}`}
        key={i}
        style={{ textDecoration: 'none' }}
      >
        <div className={classes.latestTrend}>
          <img src={imagePath} className={classes.storeImage} alt={list.title} title={list.title} />
          <p className={classes.listTitle}>{list.title.length < 20 ? list.title : list.title.substring(0, 20) + '..'}</p>
          <p className={classes.amountTitle}>
            {list.list_price.formatted !== undefined ? list.list_price.formatted : ''}
          </p>
          <div>
            {list.account !== undefined && list.account.images[0] ? (
              <div className={classes.bottomDesc}>
                <img
                  src={list.account.images[0]}
                  alt={list.account.name}
                  title={list.account.name}
                />
                <span>
                  {list.account.name.length < 10
                    ? list.account.name
                    : list.account.name.substring(0, 10) + '..'}
                </span>
              </div>
            ) : (
              <div className={classes.bottomDesc}>
                <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                <span>
                  {(list.account.name.length < 10
                    ? list.account.name
                    : list.account.name.substring(0, 10) + '..') || 'N/A'}
                </span>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </Link>
    );
  });

  return (
    <>
      {arrayListings?.length > 0 && (
        <div className={classes.latestProducts}>
          <div className={classes.latestProductsHeader}>
            <div className="  ">
              <h3 className={classes.headingTitle}>{title}</h3>
            </div>
            <div className="  " style={{ marginRight: '0.4%' }}>
              <Link to="/listings">
                <button className={'btnGreenStyle pull-right'}>View All</button>
              </Link>
            </div>
          </div>
          <br />
          <div style={{ marginTop: '60px' }}>
            <Swiper
              slidesPerView={width < 600 ? 'auto' : 1}
              slidesPerGroup={1}
              spaceBetween={5}
              loop={false}
              navigation={width < 780 ? false : true}
              className="mySwiper"
              style={{ marginTop: '60px' }}
              breakpoints={{
                400: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                600: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                850: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                1050: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },

                1100: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1250: {
                  slidesPerView: 5,
                  spaceBetween: 5,
                },
                1500: {
                  slidesPerView: 6,
                  spaceBetween: 5,
                },
                1850: {
                  slidesPerView: 7,
                  spaceBetween: 5,
                },
              }}
            >
              {arrayListings?.map((list, i) => (
                <SwiperSlide className={classes.swiperSlider}>{list}</SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestProducts;
 