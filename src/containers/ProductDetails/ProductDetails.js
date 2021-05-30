import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Toast from '../../components/UI/Toast/Toast';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Skeleton from '../../components/UI/Skeleton/Skeleton';
import classes from './ProductDetails.module.css';
import ArrowLogo from '../../assets/images/products/arrow.svg';
import * as actions from '../../store/actions/index';
import { selectProductDetails } from '../../store/selectors/product';

import Maps from '../../components/UI/Maps/Maps';

class ProductDetails extends Component {
  state = {
    maps: false,
  };

  componentDidMount() {
    console.log('test', this.props.match.params.id);
    this.props.onInitProductDetails(this.props.match.params.id);
  }

  showMaps = () => {
    this.setState({ maps: true });
  };
  closeMaps = () => {
    this.setState({ maps: false });
  };

  getHomeBannerControl = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'images'], List()).size > 0) {
      return (
        <>
          {productDetails.getIn(['listing', 'images'], List()).map((_, index) => {
            let active = '';
            if (index === 0) {
              active = 'active';
            }
            return (
              <li
                key={index}
                data-target="#myCarousel"
                data-slide-to={index}
                className={active}
              ></li>
            );
          })}
        </>
      );
    }
    return <></>;
  };

  getHomeBanner = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'images'], List()).size > 0) {
      return (
        <>
          {productDetails.getIn(['listing', 'images'], List()).map((img, index) => {
            let active = '';
            if (index === 0) {
              active = 'active';
            }

            let classesName = [classes.itemImg, active];
            return (
              <div key={index} className={classesName.join(' ') + ' item '}>
                <img src={img} alt="Chania" />
              </div>
            );
          })}
        </>
      );
    }
    return <Skeleton count={10} />;
  };

  render() {
    const { error, productDetails, message } = this.props;
    let toastMessage = null;
    if (error) {
      toastMessage = <Toast type="error" message={message} />;
    }
    console.log('productDetails', productDetails);
    // let currencySymbol = <Skeleton />;
    // let offerPercent = null;
    // let list_price = <Skeleton />;
    // let offer_price = null;
    // let storeName = <Skeleton />;
    // let storeOwner = <Skeleton />;
    // let storeAddress = <Skeleton count={2} />;
    // let categoryId = <Skeleton />;
    // let homeBanner = <Skeleton count={10} />;

    // let coOrdinates1 = null;
    // let coOrdinates2 = null;
    // let maps = null;
    // if (this.props.productDetails) {
    //   if (this.props.productDetails.currency) {
    //     currencySymbol = this.props.productDetails.currency.symbol;
    //   }

    //   if (this.props.productDetails.offer_percent !== 0) {
    //     offerPercent = <strong>{this.props.productDetails.offer_percent || <Skeleton />}%</strong>;
    //   }

    //   if (this.props.productDetails.list_price !== '') {
    //     list_price = (
    //       <Aux>
    //         {currencySymbol}
    //         {this.props.productDetails.list_price.formatted || <Skeleton />}
    //       </Aux>
    //     );
    //     if (this.props.productDetails.offer_price !== 0) {
    //       list_price = (
    //         <strike>
    //           {currencySymbol}
    //           {this.props.productDetails.list_price.formatted || <Skeleton />}
    //         </strike>
    //       );
    //     }
    //   }

    //   if (this.props.productDetails.offer_price !== 0 && offerPercent !== null) {
    //     offer_price = (
    //       <Aux>
    //         {currencySymbol}
    //         {this.props.productDetails.offer_price !== null ? (
    //           this.props.productDetails.offer_price
    //         ) : (
    //           <Skeleton />
    //         )}
    //       </Aux>
    //     );
    //   }
    //   categoryId = 'N/A';
    //   if (this.props.productDetails.category_id !== '') {
    //     categoryId = this.props.productDetails.category_id;
    //   }

    //   if (this.props.productDetails.store) {
    //     storeName = (
    //       <Link to={'/store-details/' + this.props.productDetails.store.id}>
    //         {this.props.productDetails.store.name}
    //       </Link>
    //     );
    //     storeOwner =
    //       this.props.productDetails.store.user.first_name +
    //       '' +
    //       this.props.productDetails.store.user.last_name;
    //     storeAddress = this.props.productDetails.store.address;

    //     if (this.props.productDetails.store.coordinates) {
    //       coOrdinates1 = this.props.productDetails.store.coordinates.latitude;
    //       coOrdinates2 = this.props.productDetails.store.coordinates.longitude;
    //     }
    //   }

    // if (coOrdinates1 !== null && coOrdinates2 !== null) {
    //   maps = (
    //     <div className={classes.DeatilsRight + ' col-lg-6'}>
    //       <Modal show={this.state.maps} modalClosed={this.closeMaps}>
    //         <Maps lat={coOrdinates1} lng={coOrdinates2} />
    //       </Modal>
    //       <button type="button" className="btn btn-outline-success" onClick={this.showMaps}>
    //         Get Direction
    //       </button>
    //     </div>
    //   );
    // }

    return (
      <Aux>
        <Backdrop show={this.props.loading} />
        <Spinner show={this.props.loading} />
        {toastMessage}

        <div className="row ">
          <div className="col-lg-12">
            <nav aria-label="breadcrumb">
              <ol className={classes.breadCrumb}>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/home">
                    <img src={ArrowLogo} alt="Back" style={{ marginRight: '10px' }} />
                    Back to profile
                  </Link>
                </li>
              </ol>
            </nav>
          </div>

          <div className="col-xs-6 ">
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">{this.getHomeBannerControl()}</ol>

              <div className="carousel-inner" role="listbox">
                {this.getHomeBanner()}
              </div>
            </div>

            <div className={classes.Details + ' col-lg-12'}>
              <h4>{productDetails.getIn(['listing', 'title'], '') || <Skeleton />}</h4>
              <div> {/* {offer_price} {offerPercent} {list_price}{' '} */}</div>
              <span>Product Description</span>
              <div className={classes.Description}>
                {productDetails.getIn(['listing', 'description'], '') || <Skeleton count="10" />}
              </div>
            </div>
          </div>
          {/*
                <div className="col-xs-6 bgColor">
            <div className="col-lg-12 mt-4">
              <div className="row">
                <div className={classes.fashionStore + ' col-sm-6'}>
                  <h3>{storeName}</h3>
                  <div className={classes.Description}>@{storeOwner}</div>
                </div>
                <div className="col-sm-6">
                  <button className="btnGreenStyle pull-right">Follow</button>
                </div>
              </div>
              <hr />

              <h1 className="h1Headings">Details</h1>

              <div className="row">
                <div className={classes.DeatilsLeft + ' col-lg-6 col-sm-6 col-md-6'}>Condition</div>
                <div className={classes.DeatilsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  Pre Loved
                </div>

                <div className={classes.DeatilsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                  Price Type
                </div>
                <div className={classes.DeatilsRight + ' col-lg-6 col-sm-6 col-md-6'}>Fixed</div>

                <div className={classes.DeatilsLeft + ' col-lg-6 col-sm-6 col-md-6'}>Category</div>
                <div className={classes.DeatilsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  {categoryId}
                </div>

                <div className={classes.DeatilsLeft + ' col-lg-6 col-sm-6 col-md-6'}>Location</div>
                <div className={classes.DeatilsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  {storeAddress}
                </div>
                <div className={classes.DeatilsLeft + ' col-lg-6'}></div>
                {maps}
              </div>

              <h1 className="h1Headings">Additional Details</h1>

              <div className="row">
                <div className={classes.DeatilsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                  Deliver Details
                </div>
                <div className={classes.DeatilsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  Home Delivery Available, Cash On Delivery
                </div>
              </div>
              <br />
              <button type="button" className="btn btn-addtocart btn-lg btn-block height70">
                Add To Cart
              </button>
              <button type="button" className="btn btn-success btn-lg btn-block height70">
                Buy Now
              </button>
              <br />
              <br />
            </div>
          </div>
        */}
        </div>

        <br />
        <br />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.product.error,
    loading: state.product.loading,
    message: state.product.message,
    productDetails: selectProductDetails(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitProductDetails: (id) => dispatch(actions.initProductDetails(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
