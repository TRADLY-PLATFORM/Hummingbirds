import React, { Component } from 'react'
import classes from './WishList.module.css';

import StoreLogo from '../../assets/images/home/store/store1.svg';
import StoreLogo2 from '../../assets/images/home/store/store2.svg';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';

export default class WishList extends Component {
    render() {
        return (
                 <div>
           
        <div className="row">
            <div className={classes.pageTitle + " col-md-5 "}>
                          <h2 className={classes.pageTitle}>My Wishlist </h2>
            </div>  

            
            <div className = "col-md-2" >
                          <div className = {classes.SortbyMenu + " dropdown" }>
                             <button className= {classes.SortbyMenu + " dropdown-toggle "} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             Sort by
                             <span className="caret"></span></button>
                          <ul className=" dropdown-menu ">
                                <li><a href="/#">A</a></li>
                                <li><a href="/#">B</a></li>
                                <li><a href="/#">C</a></li>
                          </ul>
                          </div>
            
             </div>

            <div className="col-md-5 col-sm-12 col-xs-12">
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                    <input type="text" className="form-control input-lg" placeholder="Search My Wishlist"/>                      
                </div>
        </div> 

                    
            <div className="row">
                 <div className="container-fluid mt-5">
                    <div className="row">
                        <div className={"col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p>
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>                                 
                            </div>                  
                        </div>
                        <div className={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                            <img src={StoreLogo2} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                            <p>White Full Slive Top</p> 
                            <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>    
                            </div>
                        </div>
                        <div className={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend }>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>
                        </div>
                        <div className={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo2} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p>   
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                        <div className={"col-md-5th-1 col-sm-4 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                         <div className={"col-md-5th-1 col-sm-4 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                         <div className={"col-md-5th-1 col-sm-4 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                         <div className={"col-md-5th-1 col-sm-4 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                         <div className={"col-md-5th-1 col-sm-4 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                         <div className={"col-md-5th-1 col-sm-4 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>

                    </div>
                </div>
                </div>
                </div>
        )
    }
}


