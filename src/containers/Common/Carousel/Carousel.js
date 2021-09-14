import React, { Component } from 'react';
import { useState } from 'react';

import SvgImage from '../../../assets/images/leftimage.svg';
import classes from './Carousel.module.css';
import axios from '../../../axios';
import { useEffect } from 'react';
import * as actions from '../../../store/actions/index'

// import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBCol, MDBCard, MDBCardImage,
//     MDBCardBody, MDBCardTitle } from "mdbreact";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
 
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import { useDispatch, useSelector } from 'react-redux';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);


const Carousel = () => {
  // const [onboardingImage, setOnboardingImage] = useState(null);
  const onboardingImage = useSelector((state) => state.auth.onboarding_configs.intro_screens);
  const dispatch = useDispatch( )
  useEffect(() => {
 dispatch(actions.setOnboardingConfigsData())  }, []);
  console.log(onboardingImage);

 
   

  return (
    <div>
      <div id="myCarousel" className={classes.carousel  } >
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
         
            {onboardingImage?.map((list, i) => {
              
              return (
                <SwiperSlide key={i} className={classes.onboardingImage}>
                  <div className={classes.itemImage}>
                    <img
                      src={list.image}
                      alt="Chania"
                      
                    />
                  </div>
                  <div className={classes.carouselCaption}>
                    <p className={classes.cardTitle}>{list.text}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          
        </Swiper>

        
      </div>
    </div>
  );
};

export default Carousel;

// class Carousel extends Component{

//     render(){
//         return(

// <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem>
//     <MDBCarouselInner>
//     <MDBRow>
//         <MDBCarouselItem itemId="1">
//         <MDBCol md="12">
//             <MDBCard className={classes.borderNone + " mb-2 text-center"}>
//             <MDBCardImage className={classes.leftImage + " img-fluid"} src={SvgImage} />
//             <MDBCardBody>
//             <MDBCardTitle className={classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro Business</MDBCardTitle>
//             </MDBCardBody>
//             </MDBCard>
//         </MDBCol>
//     </MDBCarouselItem>
//         <MDBCarouselItem itemId="2">
//         <MDBCol md="12">
//         <MDBCard className={classes.borderNone + " mb-2 text-center"}>
//             <MDBCardImage className={classes.leftImage + " img-fluid"} src={SvgImage} />
//             <MDBCardBody>
//             <MDBCardTitle className={classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro</MDBCardTitle>
//             </MDBCardBody>
//             </MDBCard>
//         </MDBCol>
//         </MDBCarouselItem>
//         <MDBCarouselItem itemId="3">
//         <MDBCol md="12">
//         <MDBCard className={classes.borderNone + " mb-2 text-center"}>
//             <MDBCardImage className={classes.leftImage + " img-fluid"} src={SvgImage} />
//             <MDBCardBody>
//             <MDBCardTitle className={classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro Business</MDBCardTitle>
//             </MDBCardBody>
//             </MDBCard>
//         </MDBCol>
//         </MDBCarouselItem>
//     </MDBRow>
//     </MDBCarouselInner>
// </MDBCarousel>
//         );
//     }
// }

// export default Carousel;
