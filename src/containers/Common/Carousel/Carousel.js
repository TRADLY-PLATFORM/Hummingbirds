import React from 'react';

import SvgImage from '../../../assets/images/leftimage.svg';
import classes from './Carousel.module.css';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle } from "mdbreact";

    
const carousel = () => {
    return (    
            <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem>
            <MDBCarouselInner>
            <MDBRow>
                <MDBCarouselItem itemId="1">
                <MDBCol md="12">
                    <MDBCard className={classes.borderNone + " mb-2 text-center"}>
                    <MDBCardImage className="img-fluid" src={SvgImage} />
                    <MDBCardBody>
                    <MDBCardTitle className={classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro Business</MDBCardTitle>     
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                <MDBCol md="12">
                <MDBCard className={classes.borderNone + " mb-2 text-center"}>
                    <MDBCardImage className="img-fluid" src={SvgImage} />
                    <MDBCardBody>
                    <MDBCardTitle className={classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro</MDBCardTitle> 
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                <MDBCol md="12">
                <MDBCard className={classes.borderNone + " mb-2 text-center"}>
                    <MDBCardImage className="img-fluid" src={SvgImage} />
                    <MDBCardBody>
                    <MDBCardTitle className={classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro Business</MDBCardTitle>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBCarouselItem>
            </MDBRow>
            </MDBCarouselInner>
        </MDBCarousel>
        
    );
}

export default carousel;    