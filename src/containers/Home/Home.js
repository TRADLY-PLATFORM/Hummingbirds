import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import Category from '../../components/Category/Category';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import MoreLogo from '../../assets/images/home/category/more.svg';
import ItemsCarousel from 'react-items-carousel';

import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';

// import StoreLogo from '../../assets/images/home/store/store1.svg';
// import StoreLogo2 from '../../assets/images/home/store/store2.svg';

import NoProductImage from '../../assets/images/rsz_noimage.png';

class Home extends Component {
  state = {
    selectedOption: null,
    activeItemIndex: 0,
    show: true,
    loadOnce: true,
    categorySet: [],
    categoryLength: 0,
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.onInitHomeCollections();
    }, 3000);

    this.timer = setTimeout(() => {
      this.setState({ show: false });
    }, 6000);
  }

  redirectListing = () => {
    this.props.history.push('/listings');
  };

  collectionsHtmlHandler = (collections) => {
    if (collections && collections.length > 0) {
      return collections.map(function (collection, index) {
        let arrayListings = [];
        if (collection.title === 'Stores to Follow') {
          arrayListings = collection.accounts.map((list, i) => {
            let imagePath = AllenSollyLogo;
            if (list.images.length > 0) {
              imagePath = list.images[0];
            }

            let description = list.description;
            if (description.length > 35) {
              description = description.substring(0, 35) + '...';
            }

            return (
              <div className={classes.wellStore + ' col-lg-12'} key={i}>
                <div className={classes.imageDiv}>
                  <img src={imagePath} alt={list.name} title={list.name} />
                </div>
                <div>{list.name}</div>
                <p>{description}</p>
                <Link to={`/store-details/${list.id}/${list.name}`}>
                  <button className={classes.btnGreenFollow + ' mt-5'}>View Details</button>
                </Link>
              </div>
            );
          });
        } else if (collection.title === 'Latest Products') {
          arrayListings = collection.listings.map((list, i) => {
            let imagePath = NoProductImage;
            if (list.images[0] !== undefined) {
              imagePath = list.images[0];
            }

            return (
              <Link to={`/product-details/${list.id}/${list.title}`} key={i}>
                <div className={classes.latestTrend}>
                  <img
                    src={imagePath}
                    className={classes.storeImage}
                    alt={list.title}
                    title={list.title}
                  />
                  <p>{list.title}</p>
                  <div className={classes.bottomDesc}>
                    {list.account !== undefined && list.account.images[0] ? (
                      <>
                        <img
                          src={list.account.images[0]}
                          alt={list.account.name}
                          title={list.account.name}
                        />
                        <span>{list.account.name}</span>
                      </>
                    ) : (
                      <>
                        <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                        <span>N/A</span>
                      </>
                    )}

                    <div className={classes.amountTitle}>
                      {list.list_price.formatted !== undefined ? list.list_price.formatted : ''}
                    </div>
                  </div>
                </div>
              </Link>
            );
          });
        }

        return (
          <Aux key={index}>
            <div className="container-fluid mt-5">
              <div className="row">
                <div className="col-lg-6 nopaddingLeft" key={index}>
                  <h3 className={classes.headingTitle}>{collection.title}</h3>
                </div>
                <div className="col-lg-6 nopaddingRight">
                  {collection.title === 'Latest Products' && (
                    <Link to="/listings">
                      <button className={'btnGreenStyle pull-right'}>View All</button>
                    </Link>
                  )}
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
                  requestToChangeActive={(value) => this.setState({ activeItemIndex: value })}
                  rightChevron={
                    <span
                      className="glyphicon glyphicon-chevron-right"
                      style={{ fontSize: '30px', color: '#e6e6e6' }}
                      aria-hidden="true"
                    ></span>
                  }
                  leftChevron={
                    <span
                      className="glyphicon glyphicon-chevron-left"
                      style={{ fontSize: '30px', color: '#e6e6e6' }}
                      aria-hidden="true"
                    ></span>
                  }
                >
                  {arrayListings}
                </ItemsCarousel>
                {/* <CollectionListings listings={collection.listings}/>   */}
              </div>
            </div>
          </Aux>
        );
      }, this);
    }
  };

  componentWillUpdate() {
    if (this.props.categories && this.props.categories.length > 0 && this.state.loadOnce) {
      console.log(this.props.categories);
      let copyCategories = [...this.props.categories];
      let lengthOfCategories = this.props.categories.length;
      let firstCategorySet = '';
      if (lengthOfCategories <= 4) {
        firstCategorySet = copyCategories.slice(0, 4);
      } else if (lengthOfCategories <= 8) {
        firstCategorySet = copyCategories.slice(0, 8);
      } else if (lengthOfCategories > 8) {
        firstCategorySet = copyCategories.slice(0, 7);
        let moreCategory = {
          id: Math.random(),
          name: 'More',
          image_path: MoreLogo,
          has_sub_category: true,
          link: 'all-categories',
        };
        firstCategorySet.push(moreCategory);
      }
      this.setState({
        categorySet: firstCategorySet,
        categoryLength: lengthOfCategories,
        loadOnce: false,
      });
    }
  }

  render() {
    let categoryContent = <Spinner show={true} styles="SpinnerCenter" />;
    if (this.state.categorySet && this.state.categorySet.length > 0) {
      if (this.state.categorySet <= 4) {
        categoryContent = (
          <div className="col-lg-12 col-md-12">
            <div className="row">
              <Category categories={this.state.categorySet} />
            </div>
          </div>
        );
      } else {
        categoryContent = (
          <>
            <div className="col-lg-6 col-md-12">
              <div className="row">
                <Category categories={this.state.categorySet.slice(0, 4)} />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="row">
                <Category categories={this.state.categorySet.slice(4, 8)} />
              </div>
            </div>
          </>
        );
      }
    } else {
      if (!this.state.show) {
        categoryContent = '';
      }
    }

    let collectionContent = <Spinner show={true} styles="SpinnerCenter" />;
    console.log(this.props.collections);
    if (this.props.collections && this.props.collections.length > 0) {
      collectionContent = this.collectionsHtmlHandler(this.props.collections);
    } else {
      if (!this.state.show) {
        collectionContent = '';
      }
    }

    return (
      <Aux>
        <Backdrop show={this.props.loading} />
        <Spinner show={this.props.loading} />
        <HomeBanner images={this.props.promo_banners} />
        <div className="row mt-5">{categoryContent}</div>

        {collectionContent}

        {/* <div className="container-fluid mt-5">
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
                </div> */}

        <br />
        <br />
        <br />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
    message: state.auth.message,
    promo_banners: state.home.promo_banners,
    categories: state.home.categories,
    collections: state.home.collections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitHomeCollections: () => dispatch(actions.initHomeCollections()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
