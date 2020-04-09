import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import classes from './Home.module.css';

import WomanAccesoriesLogo from '../../assets/images/home/category/womanaccesories.svg';
import WomanClothLogo from '../../assets/images/home/category/womancloth.svg';
import BookLogo from '../../assets/images/home/category/book.svg';
import TextBooksLogo from '../../assets/images/home/category/textbooks.svg';
import ElectronicsLogo from '../../assets/images/home/category/electronics.svg';
import SporsLogo from '../../assets/images/home/category/sports.svg';
import GamesLogo from '../../assets/images/home/category/games.svg';
import MoreLogo from '../../assets/images/home/category/more.svg';

import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';

class Home extends Component{

    render(){
        return (
           <Aux>
                <HomeBanner/>
                <div className="row mt-5">
                    <div className="col-lg-6 col-md-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className={classes.wellCategory}>
                                    <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                                    <p>Woman accesories</p> 
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className={classes.wellCategory}>
                                <img src={WomanClothLogo} alt="Woman cloth" title="Woman cloth"/>
                                    <p>Woman cloth</p> 
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className={classes.wellCategory}>
                                <img src={BookLogo} alt="Book" title="Book"/>
                                    <p>Book</p> 
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className={classes.wellCategory}>
                                <img src={TextBooksLogo} alt="Text books" title="Text books"/>
                                    <p>Text books</p> 
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-lg-6 col-md-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className={classes.wellCategory}>
                                    <img src={SporsLogo} alt="Sports" title="Sports"/>
                                        <p>Sports</p> 
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className={classes.wellCategory}>
                                    <img src={ElectronicsLogo} alt="Electornics" title="Electornics"/>
                                        <p>Electornics</p> 
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className={classes.wellCategory}>
                                    <img src={GamesLogo} alt="Game &amp; toys" title="Game &amp; toys"/>
                                        <p>Game &amp; toys</p> 
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className={classes.wellCategory}>
                                    <img src={MoreLogo} alt="More" title="More"/>
                                        <p>More</p> 
                                    </div>
                                </div>
                            </div>
                        </div>
               </div>
                <div class="container-fluid mt-5">
                    <div className="row">
                        <div class="col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 nopadding">
                        <select class="form-control">
                            <option>1</option>
                            <option>2</option>
                        </select>
                        </div>
                        <div class="col-md-5th-1 col-sm-4 nopadding">
                            <select class="form-control">
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div class="col-md-5th-1 col-sm-4 nopadding">
                            <select class="form-control">
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div class="col-md-5th-1 col-sm-4 nopadding">
                            <select class="form-control">
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div class="col-md-5th-1 col-sm-4 nopadding">
                            <select class="form-control">
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-lg-6 nopaddingLeft">
                            <h3 className={classes.headingTitle}>Stores to follow</h3>
                        </div>

                        <div className="col-lg-6 nopaddingRight">
                            <button className={classes.btnGreenStyle+ " pull-right"}>View All</button>
                        </div>
                    </div>
                </div>


                <div class="container-fluid mt-5">
                    <div className="row">
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "}>                    
                            <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/>
                            <div>allensolly</div>
                            <p>Allen Solly</p> 
                            <button className={classes.btnGreenFollow}>View All</button>
                        </div>
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4 "}>
                        <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4  "}>
                        <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4"}>
                        <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4"}>
                        <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                    </div>
                </div>
            
            
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-lg-6 nopaddingLeft">
                            <h3 className={classes.headingTitle}>Stores to follow</h3>
                        </div>

                        <div className="col-lg-6 nopaddingRight">
                            <button className={classes.btnGreenStyle+ " pull-right"}>View All</button>
                        </div>
                    </div>
                </div>


                <div class="container-fluid mt-5">
                    <div className="row">
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "}>
                    
                            <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4 "}>
                        <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4  "}>
                        <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4"}>
                        <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellStore + " col-md-5th-1 col-sm-4"}>
                        <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                    </div>
                </div>
            
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-lg-6 nopaddingLeft">
                            <h3 className={classes.headingTitle}>Stores to follow</h3>
                        </div>

                        <div className="col-lg-6 nopaddingRight">
                            <button className={classes.btnGreenStyle+ " pull-right"}>View All</button>
                        </div>
                    </div>
                </div>


                <div class="container-fluid mt-5">
                    <div className="row">
                        <div class={classes.wellCategory + " col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "}>
                    
                            <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellCategory + " col-md-5th-1 col-sm-4 "}>
                        <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellCategory + " col-md-5th-1 col-sm-4  "}>
                        <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellCategory + " col-md-5th-1 col-sm-4"}>
                        <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                        <div class={classes.wellCategory + " col-md-5th-1 col-sm-4"}>
                        <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
                            <p>Woman accesories</p> 
                        </div>
                    </div>
                </div>
            

            
            
            
            </Aux>
//                     {/* <br/>


//                     <div className={classes.wellCategory}>
// <h4>Dashboard</h4>
// <p>Some text..</p>
// </div>
// <div className="row">
// <div className="col-sm-3">
//   <div className={classes.wellCategory}>
//     <h4>Users</h4>
//     <p>1 Million</p> 
//   </div>
// </div>
// <div className="col-sm-3">
//   <div className={classes.wellCategory}>
//     <h4>Pages</h4>
//     <p>100 Million</p> 
//   </div>
// </div>
// <div className="col-sm-3">
//   <div className={classes.wellCategory}>
//     <h4>Sessions</h4>
//     <p>10 Million</p> 
//   </div>
// </div>
// <div className="col-sm-3">
//   <div className={classes.wellCategory}>
//     <h4>Bounce</h4>
//     <p>30%</p> 
//   </div>
// </div>
// </div>
// <div className="row">
// <div className="col-sm-4">
//   <div className={classes.wellCategory}>
//     <p>Text</p> 
//     <p>Text</p> 
//     <p>Text</p> 
//   </div>
// </div>
// <div className="col-sm-4">
//   <div className={classes.wellCategory}>
//     <p>Text</p> 
//     <p>Text</p> 
//     <p>Text</p> 
//   </div>
// </div>
// <div className="col-sm-4">
//   <div className={classes.wellCategory}>
//     <p>Text</p> 
//     <p>Text</p> 
//     <p>Text</p> 
//   </div>
// </div>
// </div>
// <div className="row">
// <div className="col-sm-8">
//   <div className={classes.wellCategory}>
//     <p>Text</p> 
//   </div>
// </div>
// <div className="col-sm-4">
//   <div className={classes.wellCategory}>
//     <p>Text</p> 
//   </div>
// </div>
// </div> */}

           
            
        );
    }
}


export default Home;