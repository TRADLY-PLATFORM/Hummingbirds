
import React from 'react';
const homeBanner = (props) => {
    let imageBanner = '';
    if(props.images.length > 0){
        imageBanner = props.images.map((image,index) => {
            let active ='';
            if(index === 0){
                active = 'active';
            }

            return (<div className={"item "+ active} key={index}>
                        <img src={image.image_path} alt="Chania" />
                        <div className="carousel-caption">
                        {/* <h3>Chania</h3>
                            <p>The atmosphere in Chania has a touch of Florence and Venice.</p> */}
                        </div>
                    </div>)
        })
    }
    return (
            <>
            { imageBanner !== '' && 
            <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{    background: 'rgba(160, 160, 160, 0.5)'}}>
                <div className="carousel-inner" role="listbox">
                    {imageBanner}          
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
            }
            </>
    )
}
export default homeBanner;