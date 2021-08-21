
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './HomeBanner.module.css'

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
const homeBanner = (props) => {
    console.log('====================================');
    console.log(props);
    console.log('====================================');
      
    return (
      <>
        <div className={classes.BannerSlider}>
          {props?.images.length>0 && (
            <Swiper
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={10}
              loop={false}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
              style={{ paddingBottom: '20px ' }}
            >
              {props?.images?.map((image, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className={classes.banner}>
                      <img src={image.image_path} alt={image.reference} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </>
    );
}
export default homeBanner;