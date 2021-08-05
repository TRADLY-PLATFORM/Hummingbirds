import React, { Component } from 'react';
import { useState } from 'react';

import SvgImage from '../../../assets/images/leftimage.svg';
import classes from './Carousel.module.css';
import axios from '../../../axios';
import { useEffect } from 'react';


// import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBCol, MDBCard, MDBCardImage,
//     MDBCardBody, MDBCardTitle } from "mdbreact";

const Carousel = () => {
    const [onboardingImage, setOnboardingImage] = useState(null)
    useEffect(() => {
            axios
              .get('v1/configs?key_group=onboarding')
              .then((response) => {
                if (response.status) {
                    console.log(response.data.configs.intro_screens);
                    setOnboardingImage(response.data.configs.intro_screens);
                } else {
                  console.log(response);
                }
              })
              .catch((error) => {
                 console.log(error)
              });

    },[])

  const data = [
    {
      image: SvgImage,
      des: 'Empowering Artisans,  Farmers  & Micro Business',
    },
    {
      image: SvgImage,
      des: 'Empowering Artisans, Farmers & Micro Business .Buy Online',
    },
  ];

  return (
    <div>
      <div id="myCarousel" className={classes.carousel + ' slide'} data-ride="carousel">
        <div className="carousel-inner" role="listbox">
                  {onboardingImage?.map((list, i) => {
              let active = '';
              if (i === 0) {
                active = 'active';
              }
            return (
              <div className={`item ${active}`} key={i}>
                <img src={list.image} alt="Chania" style={{ width: '75%', margin: '0 auto' }} />
                <div className={classes.carouselCaption + ' carousel-caption'}>
                  <p className={classes.cardTitle}>{list.text}</p>
                </div>
              </div>
              // <div className="item">
              //     <img src={SvgImage} alt="Chania" style={{width:'75%',margin: '0 auto'}} />
              //     <div className={ classes.carouselCaption + " carousel-caption" }>
              //     <p className={ classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro Business</p>
              //     </div>
              // </div>
            );
          })}
        </div>

        <ol className="carousel-indicators" style={{ position: 'relative' }}>
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
        </ol>
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
