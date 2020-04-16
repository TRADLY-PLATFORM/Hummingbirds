import React, { Component } from 'react';

import SvgImage from '../../../assets/images/leftimage.svg';
import classes from './Carousel.module.css';

// import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBCol, MDBCard, MDBCardImage,
//     MDBCardBody, MDBCardTitle } from "mdbreact";


class Carousel extends Component{

    
    render(){
        return(

                <div id="myCarousel" className={classes.carousel +" slide"} data-ride="carousel">

                

                <div className="carousel-inner" role="listbox">     
                    <div className="item active">
                        <img src={SvgImage} alt="Chania" style={{width:'75%',margin: '0 auto'}} />
                        <div className={ classes.carouselCaption + " carousel-caption" }>
                        <p className={ classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro Business</p>
                        </div>
                    </div>
                    <div className="item">
                        <img src={SvgImage} alt="Chania" style={{width:'75%',margin: '0 auto'}} />
                        <div className={ classes.carouselCaption + " carousel-caption" }>
                        <p className={ classes.cardTitle}>Empowering Artisans, <br/> Farmers &amp; Micro Business</p>
                        </div>
                    </div>       
                </div>

                <ol className="carousel-indicators" style={{position: 'relative'}}>
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                </ol>
              
            </div>

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
        );
    }
}

export default Carousel;    