import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';
import WomanAccesoriesLogo from '../../assets/images/home/category/womanaccesories.svg';
import WomanClothLogo from '../../assets/images/home/category/womancloth.svg';
import BookLogo from '../../assets/images/home/category/book.svg';
import TextBooksLogo from '../../assets/images/home/category/textbooks.svg';
import ElectronicsLogo from '../../assets/images/home/category/electronics.svg';
import SporsLogo from '../../assets/images/home/category/sports.svg';
import GamesLogo from '../../assets/images/home/category/games.svg';
import MoreLogo from '../../assets/images/home/category/more.svg';

import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';

import StoreLogo from '../../assets/images/home/store/store1.svg';
import StoreLogo2 from '../../assets/images/home/store/store2.svg';

import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class Home extends Component{

    state = {
        selectedOption: null,
      };
      handleChange = selectedOption => {
        this.setState(
          { selectedOption },
          () => console.log(`Option selected:`, this.state.selectedOption)
        );
      };

    render(){
        const { selectedOption } = this.state;

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
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 nopadding">
                        <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                placeholder="All Categories"
                            />
                        </div>
                        <div className="col-md-5th-1 col-sm-4 nopadding">
                        <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                placeholder="Price Filter"
                            />
                        </div>
                        <div className="col-md-5th-1 col-sm-4 nopadding">
                        <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                placeholder="Select Location"
                            />
                        </div>
                        <div className="col-md-5th-1 col-sm-4 nopadding">
                        <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                placeholder="Select Supplier"
                            />
                        </div>
                        <div className="col-md-5th-1 col-sm-4 nopadding">
                        <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                placeholder="Sort By"
                            />
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-lg-6 nopaddingLeft">
                            <h3 className={classes.headingTitle}>Stores to follow</h3>
                        </div>

                        <div className="col-lg-6 nopaddingRight">
                            <Link to="/product-details"><button className={"btnGreenStyle pull-right"}>View All</button></Link>
                        </div>
                    </div>
                </div>


                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className={"col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 nopaddingLeft "}> 
                            <div className={classes.wellStore +" col-lg-12"}>
                                <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/>
                                <div>allensolly</div>
                                <p>Allen Solly</p> 
                                <button className={classes.btnGreenFollow + " mt-5"}>View All</button>
                            </div>                  
                        </div>
                        <div className={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.wellStore +" col-lg-12"}>
                                <img src={NoIamgeLogo} alt="Woman accesories" title="Woman accesories"/>
                                <div>allensolly</div>
                                <p>Allen Solly</p> 
                                <button className={classes.btnGreenFollow + " mt-5"}>View All</button>
                            </div>
                        </div>
                        <div className={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.wellStore +" col-lg-12"}>
                                <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/>
                                <div>allensolly</div>
                                <p>Allen Solly</p>  
                                <button className={classes.btnGreenFollow + " mt-5"}>View All</button>
                            </div>
                        </div>
                        <div className={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.wellStore +" col-lg-12"}>
                                <img src={NoIamgeLogo} alt="Woman accesories" title="Woman accesories"/>
                                <div>allensolly</div>
                                <p>Allen Solly</p>  
                                <button className={classes.btnGreenFollow + " mt-5"}>View All</button>
                            </div>    
                        </div>
                        <div className={"col-md-5th-1 col-sm-4 nopaddingRight"}> 
                            <div className={classes.wellStore +" col-lg-12"}>
                                <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/>
                                <div>allensolly</div>
                                <p>Allen Solly</p> 
                                <button className={classes.btnGreenFollow + " mt-5"}>View All</button>
                            </div>    
                        </div>
                    </div>
                </div>
            
            
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-lg-6 nopaddingLeft">
                            <h3 className={classes.headingTitle}>Latest trend store</h3>
                        </div>

                        <div className="col-lg-6 nopaddingRight">
                        <Link to="/product-details"><button className={"btnGreenStyle pull-right"}>View All</button></Link>
                        </div>
                    </div>
                </div>


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
                    </div>
                </div>
            
            
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-lg-6 nopaddingLeft">
                            <h3 className={classes.headingTitle}>Recent items</h3>
                        </div>

                        <div className="col-lg-6 nopaddingRight">
                            <button className={"btnGreenStyle pull-right"}>View All</button>
                        </div>
                    </div>
                </div>


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
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            
            
            
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