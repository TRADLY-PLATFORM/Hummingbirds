import React, { Component } from 'react';
import { useState } from 'react';

import SvgImage from '../../../assets/images/leftimage.svg';
import classes from './Carousel.module.css';
import axios from '../../../axios';
import { useEffect } from 'react';

// import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBCol, MDBCard, MDBCardImage,
//     MDBCardBody, MDBCardTitle } from "mdbreact";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
 
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);


const Carousel = () => {
  const [onboardingImage, setOnboardingImage] = useState(null);
  useEffect(() => {
    axios
      .get('v1/configs?key_group=onboarding')
      .then((response) => {
        console.log(response)
        if (response.status) {
          console.log(response.data.data.configs.intro_screens);
          setOnboardingImage(response.data.data.configs.intro_screens);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(onboardingImage);

  // const data = [
  //   {
  //     image: SvgImage,
  //     des: 'Empowering Artisans,  Farmers  & Micro Business',
  //   },
  //   {
  //     image: SvgImage,
  //     des: 'Empowering Artisans, Farmers & Micro Business .Buy Online',
  //   },
  // ];

   

  return (
    <div>
      <div id="myCarousel" className={classes.carousel + ' slide'} data-ride="carousel">
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
                <SwiperSlide key={i} className={classes.itemImg}>
                  <img src={list.image} alt="Chania" style={{ width: '75%', margin: '0 auto' }} />
                  <div className={classes.carouselCaption + ' carousel-caption'}>
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
