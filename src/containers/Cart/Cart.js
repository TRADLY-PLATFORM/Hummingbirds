import React, { Component } from 'react'
import classes from './Cart.module.css';
import transactionImage from "../../assets/images/MyTransaction/transactionImage.svg"
import storeIcon from "../../assets/images/MyTransaction/storeIcon.svg"
export default class Cart extends Component {
    render() {
        return (
            <div>
            
            <div className={classes.inCart}>
            <h2 className="text-capitalize">my cart</h2>
            <div className="row">
                <div className="col-md-8 col-lg-8">
                <div className="col-lg-6 col-md-6">
                    <p className={classes.cartItem + " text-uppercase "}>your cart</p>
                </div>
                <div className="col-lg-3 col-md-3">
                    <p className="text-uppercase">qty</p>
                </div>
                <div className="col-lg-3 col-md-3">
                    <p className="text-uppercase">price</p>
                </div> 
                </div>  
            </div>
            </div>

            
            
            <div className="row">
                
                <div className="col-md-8"> 
                    <div className={classes.cartContainer}>
                <div className="col-lg-6 col-md-6">   
                    <img className={classes.productImg} src={transactionImage} alt="product img" /> 
                     <span className={classes.proudctDetails}>white full sleeve top</span>
                            <br />
                     <img className={classes.storeImg} src={storeIcon} alt="store name" />
                     <span className={classes.productDetails}></span>
                </div>
 
                <div className="col-lg-3 col-md-3">
                    <span> - </span>
                    <span> 1 </span>
                    <span> + </span>
                </div>

                <div className="col-lg-3 col-md-3">
                    <span> $ </span>
                    <span> $ </span>
                </div>
                </div>
            </div>


                
                 <div className="col-md-3 col-lg-3"><div className={classes.totalCart}>
                 <div className=" text-uppercase"><h4>Total</h4></div>
                    <span> item(4) </span><span className={classes.price}>100$</span>
                    <br />
                    <span>Estimated Shiping </span><span className={classes.price} >20$</span>
                    <br />
                    <br />
                    <span><strong>Subtotal</strong> (befor tax) </span><span className={classes.price}>120$</span>
                    <br />
                    <br />
                    <div className ="text-center"><button className={classes.checkout}>check out</button>
                    <br />
                    <p> 100% Satisfaction Guarantee.<br />Easy Exchanges & Returns.</p>
                      </div>
                    <p></p><span></span>
                </div>    
                </div>
            
            </div>




            

                     <div className="row">
                        <div className="col-md-8 ">
                            <div className={ classes.shippingAddress}>
                        <div className="col-md-12">
                            <h2>shipping Address</h2>
                            <p>Select your address that match your card or payment method</p>
                            <hr />
                            <div className=" form-group col-md-6">
                                <input className={classes.input + " form-control input-lg "} type="text" placeholder="First Name"/>
                            </div>
                            <div className=" form-group col-md-6">
                                 <input className={classes.input + " form-control input-lg "} type="text" placeholder="Last Name"/>
                            </div>
                        </div>         

                        <div className="form-group ">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="company"/>
                        </div>
                    

                        <div className="form-group">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Name on card"/>
                        </div>

                        <div className="form-group">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Apartment, Suite, etc"/>
                        </div>                         

                        <div className="form-group ">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="City"/>
                        </div>    

                         <div className="form-group ">
                            <div className="col-md-4">
                                <input className={classes.input + " form-control input-lg "} type="text" placeholder="Country"/>
                            </div>
                            <div className="col-md-4">
                                 <input className={classes.input + " form-control input-lg "} type="text" placeholder="Province"/>
                            </div>
                             <div className="col-md-4">
                                 <input className={classes.input + " form-control input-lg "} type="text" placeholder="Postal code"/>
                            </div>
                        </div>    
                     <form action="/action_page.php" method="get">
                         <input type="checkbox" name="saveAddress" value="save"></input>
                         <label for="vehicle1"> Save my information for next payment</label>
                         </form>
                </div>
            </div>
        </div>

<br />
                
                <div className="row">
                    <div className="col-md-8 col-lg-8">
                <div className={ classes.payment + " row "}>
                            <h2>Payment</h2>
                            <p>Are transaction are secured and encrypted</p>
                            <hr />
                <div className="form-group">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Name on card"/>
                        </div>

                        <div className="form-group">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Credit card numbe"/>
                        </div>   




                <div className="form-group ">

                            <div className="col-md-6">
                                <input className={classes.input + " form-control input-lg "} type="text" placeholder="Expiration date"/>
                            </div>
                            <div className="col-md-6">
                                 <input className={classes.input + " form-control input-lg "} type="text" placeholder="Security code"/>
                            </div>
                        </div>      
                </div>
                </div>
                </div>
            </div>
        )
    }
}
