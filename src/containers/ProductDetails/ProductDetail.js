import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from "./productDetali.module.css"

import * as actions from '../../store/actions/index';
import { useParams } from 'react-router';
 



// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import useWindowSize from '../../components/Hooks/WindowSize/WindowSize';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const ProductDetail = () => {


  const { id } = useParams();
    const { width, height } = useWindowSize();


  // Reducer
  const productDetails = useSelector((state) => state.product.productDetails);
  const { listing, ratting_data } = productDetails;


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initProductDetails(id.split('-')[0]), true);
    dispatch(actions.setGeneralConfigsData());
  }, [0]);




  return (
    <div>
      <div className={classes.productDetailsInfoBox}>
        <div className="">
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
                  <img className={classes.productImage}  src={img} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div>
          
       </div>
      
      </div>
    </div>
  );
};

export default ProductDetail;