import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import Category from '../../components/Category/Category';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from 'react-select';
import * as actions from '../../store/actions/index';
import MoreLogo from '../../assets/images/home/category/more.svg';
import ItemsCarousel from 'react-items-carousel';

import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';

import StoreLogo from '../../assets/images/home/store/store1.svg';
import StoreLogo2 from '../../assets/images/home/store/store2.svg';

import NoProductImage from '../../assets/images/rsz_noimage.png';



const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class Home extends Component{


    state = {
        selectedOption: null,
        activeItemIndex : 0
    };



    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    componentDidMount(){ 
        this.timer = setTimeout(
            () => {
                this.props.onInitHomeCollections();
            },
            3000,
          );
    }
    
    redirectListing = () => {
        this.props.history.push('/listings')
    }

   
    collectonsHtmlHandler = (collections) => {
      
        //const { activeItemIndex } = this.state;
        return collections.map(function (collection, index) {    
            return (
                    <Aux key={index}>
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-lg-6 nopaddingLeft" key={index}>
                                <h3 className={classes.headingTitle}>{collection.title}</h3>
                            </div>
                            <div className="col-lg-6 nopaddingRight">
                                <Link to="/listings"><button className={"btnGreenStyle pull-right"}>View All</button></Link>  
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <ItemsCarousel
                                    infiniteLoop={false}
                                    gutter={12}
                                    activePosition={'center'}
                                    chevronWidth={60}
                                    disableSwipe={false}
                                    alwaysShowChevrons={false}
                                    numberOfCards={5}
                                    slidesToScroll={3}
                                    outsideChevron={false}
                                    showSlither={false}
                                    firstAndLastGutter={true}                                   
                                    activeItemIndex={this.state.activeItemIndex}
                                    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
                                    rightChevron={
                                            // <i className="fa fa-arrow-circle-right" style={{fontSize:'30px',paddingRight:'10px'}}></i>
                                            <span className="glyphicon glyphicon-chevron-right" style={{fontSize:'30px',color:'#e6e6e6'}} aria-hidden="true"></span>
                                       
                                      }
                                      leftChevron={
                                        <span className="glyphicon glyphicon-chevron-left" style={{fontSize:'30px',color:'#e6e6e6'}} aria-hidden="true"></span>                                    
                                      }
                                >

                                {      
                                
                          

                                collection.listings.map((list, i) =>{
                                    let imagePath = NoProductImage
                                    if(list.images[0]!=undefined){
                                        imagePath = list.images[0];
                                    }

                                    return ( <Link to={"/product-details/"+list.id} key={i}> 
                                    <div className={classes.latestTrend}>
                                        <img src={imagePath} className={classes.storeImage} alt={list.title} title={list.title}/>
                                        <p>{list.title}</p>
                                        <div className={classes.bottomDesc}>
                                            <img src={list.store.image_path} alt="Woman accesories" title="Woman accesories"/> <span>{list.store.name}</span>
                                            <div className={classes.amountTitle}>{list.currency.symbol}{list.list_price}</div>
                                        </div> 
                                    </div>
                                </Link>)
                                }                                 
                                    
                                )}
                                    {/* <CollectionListings listings={collection.listings}/>   */}
                                </ItemsCarousel>
                        </div>
                    </div>
                    </Aux>
                   );
        }, this);
    }

    render(){
        const { selectedOption } = this.state;
        let firstCategorySet = {};
        let secondCategorySet = {};

        let firstCatActive = false;
        let secondCatActive = false;
        if(this.props.categories && this.props.categories.length > 0){
            //console.log(this.props.categories) ;
            if(this.props.categories.length > 7){
                let moreCategory = {
                    id : Math.random(), name : "More", image_path:MoreLogo, has_sub_category: true,link: 'all-categories'
                }
                this.props.categories.push(moreCategory);       
            }
            let categoryLength = this.props.categories.length;
            //console.log(categoryLength);
            if(categoryLength <= 4){
               // console.log('firstSet');
                firstCategorySet = this.props.categories.slice(0,4);
               // console.log(firstCategorySet) ;
                firstCatActive= true;
            }
            
            if(categoryLength > 4){ console.log('seconde');
                let adjustLength = this.props.categories.length-4;
                if(adjustLength > 4){
                    adjustLength = 4;
                }
                secondCategorySet = this.props.categories.slice('-'+adjustLength);
                //console.log(secondCategorySet) ;
                secondCatActive= true;
            }              
        }

        let collectionContent =  <Spinner show={true} styles='SpinnerCenter'/> 
;
        if(this.props.collections && this.props.collections.length > 0 ){

            collectionContent = this.collectonsHtmlHandler(this.props.collections); 
            

        }
      
        return (
           <Aux>
                <HomeBanner images={this.props.promo_banners}/>
                <Backdrop show={this.props.loading} />
                <Spinner show={this.props.loading} />              
                
                <div className="row mt-5">

                { (firstCatActive && secondCatActive) ?
                    (
                    <>
                    <div className="col-lg-6 col-md-12">
                        <div className="row">
                        <Category categories={firstCategorySet}/>
                        </div>
                    </div>  
                    <div className="col-lg-6 col-md-12">
                        <div className="row">
                        <Category categories={secondCategorySet}/>
                        </div>
                     </div>
                     </>)
                    : (<div className="col-lg-12 col-md-12">
                            <div className="row">
                                <Category categories={firstCategorySet}/>
                            </div>
                       </div>)
            }
                      
                </div>

                {collectionContent}



             

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
            
        );
    }
}


const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        message: state.auth.message,
        promo_banners: state.home.promo_banners,
        categories: state.home.categories,
        collections: state.home.collections
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onInitHomeCollections: () => dispatch(actions.initHomeCollections())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( Home );