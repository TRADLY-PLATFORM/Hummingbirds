import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import classes from './ProductDetails.module.css';
import ProductImage from '../../assets/images/products/product1.svg';
import ArrowLogo from '../../assets/images/products/arrow.svg';
class ProductDetails extends Component{

    render(){
        return (
           <Aux>
                <div className="row ">

                    <div className="col-lg-12">                        
                        <nav aria-label="breadcrumb">
                            <ol className={classes.breadCrumb}>
                                <li class="breadcrumb-item active" aria-current="page"><Link to="/home"><img src={ArrowLogo} alt="Back" style={{marginRight: '10px'}}/>Back to profile</Link></li>
                            </ol>
                        </nav>
                    </div>
               
                    <div className="col-xs-6 ">
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">

                            <ol class="carousel-indicators">
                                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                                <li data-target="#myCarousel" data-slide-to="1"></li>
                                <li data-target="#myCarousel" data-slide-to="2"></li>
                            </ol>

                            <div className="carousel-inner" role="listbox">
                                    <div className={classes.itemImg + " item active"}>
                                        <img src={ProductImage} alt="Chania" />                                
                                    </div>

                                    <div className={classes.itemImg + " item"}>
                                        <img src={ProductImage} alt="Chania" />                            
                                    </div>  
                                    <div className={classes.itemImg + " item"}>
                                        <img src={ProductImage} alt="Chania" />                            
                                    </div>                   
                                </div>
                            </div>
                        <div className={classes.Details +" col-lg-12"}>
                            <h4>White Full Slive Top</h4>
                            <div>2.500</div>
                            <span>Product Description</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique urna, odio ut at. Lobortis vel, tincidunt egestas magna mauris. Eget arcu proin amet arcu orci sed suspendisse. Eget pretium diam ornare convallis amet at at egestas. Sit ac pellentesque vitae nunc. Justo, montes, ipsum amet morbi sed luctus phasellus ipsum. Nisl cursus nulla fames amet et. Ut dignissim erat sit vitae justo, mi. Quis in quam cras nulla convallis. Elementum ac nisi aenean ut aliquam.</p>
                        </div>    
                    </div>
                    <div className="col-xs-6 bgColor">
                        <div className="col-lg-12 mt-4">
                            <div className="row">
                                <div className={classes.fashionStore +" col-sm-6" }>
                                    <h3>Fashion Store</h3>
                                    <p>@Rahulchaun</p>                                    
                                </div>
                                <div className="col-sm-6">
                                    <button className="btnGreenStyle pull-right">Follow</button>
                                </div>                                
                            </div>
                            <hr/>

                            <h1 className="h1Headings">Details</h1>

                            <div className="row">
                                <div className={classes.DeatilsLeft + " col-lg-6"}>
                                    Condition
                                </div>
                                <div className={classes.DeatilsRight + " col-lg-6"}>
                                    Pre Loved
                                </div>
                                
                                <div className={classes.DeatilsLeft + " col-lg-6"}>
                                    Price Type
                                </div>
                                <div className={classes.DeatilsRight + " col-lg-6"}>
                                    Fixed
                                </div>

                                <div className={classes.DeatilsLeft + " col-lg-6"}>
                                    Category
                                </div>
                                <div className={classes.DeatilsRight + " col-lg-6"}>
                                    Woman Accessories
                                </div>

                                <div className={classes.DeatilsLeft + " col-lg-6"}>
                                    Location
                                </div>
                                <div className={classes.DeatilsRight + " col-lg-6"}>
                                125 Crescent Ave, Woodbury, NJ 08096, USA
                                </div>
                                <div className={classes.DeatilsLeft + " col-lg-6"}>
                                    
                                </div>
                                <div className={classes.DeatilsRight + " col-lg-6"}>
                                  <button type="button" className="btn btn-outline-success">Get Direction</button>
                                </div>
                            </div>
                        
                            <h1 className="h1Headings">Additional Details</h1>

                            <div className="row">
                                <div className={classes.DeatilsLeft + " col-lg-6"}>
                                    Deliver Details
                                </div>
                                <div className={classes.DeatilsRight + " col-lg-6"}>
                                Home Delivery Available, Cash On Delivery
                                </div>
                               
                            </div>
                            <br/>
                            <button type="button" className="btn btn-addtocart btn-lg btn-block height70">Add To Cart</button>
                            <button type="button" className="btn btn-success btn-lg btn-block height70">Buy Now</button>
                            <br/>
                            <br/>
                        </div>
                    </div>
            
                </div> 
              
                <br/>
                <br/>
                    
            </Aux>
      
            
        );
    }
}


export default ProductDetails;

