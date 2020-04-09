
import React from 'react';

import SliderImage from '../../assets/images/home/images.jpg';

const homeBanner = () => {
    return (
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                <div className="item active">
                    <img src={SliderImage} alt="Chania" />
                    <div className="carousel-caption">
                    <h3>Chania</h3>
                    <p>The atmosphere in Chania has a touch of Florence and Venice.</p>
                    </div>
                </div>

                <div className="item">
                    <img src={SliderImage} alt="Chania" />
                    <div className="carousel-caption">
                    <h3>Chania</h3>
                    <p>The atmosphere in Chania has a touch of Florence and Venice.</p>
                    </div>
                </div>
          
                </div>

                <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
                </a>
            </div>
    )
}

export default homeBanner;