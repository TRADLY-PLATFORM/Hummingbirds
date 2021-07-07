import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import Toast from '../../components/UI/Toast/Toast';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Skeleton from '../../components/UI/Skeleton/Skeleton';
import classes from './ProductDetails.module.css';
import ArrowLogo from '../../assets/images/products/arrow.svg';
import * as actions from '../../store/actions/index';
import { selectProductDetails } from '../../store/selectors/product';
import { selectUserId } from '../../store/selectors/auth';
import Maps from '../../components/UI/Maps/Maps';

class ProductDetails extends Component {
  state = {
    maps: false,
  };

  componentDidMount() {
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

  getPrices = () => {
    const { productDetails } = this.props;
    if (!productDetails.getIn(['listing', 'list_price'], Map()).isEmpty()) {
      return (
        productDetails.getIn(['listing', 'list_price', 'formatted'], '') +
        ' ' +
        (productDetails.getIn(['listing', 'list_price', 'offer_percent'], 0) !== 0
          ? productDetails.getIn(['listing', 'list_price', 'offer_percent'], '')
          : '')
      );
    }
    return <Skeleton count={10} />;
  };

  getStoreOwner = () => {
    const { productDetails } = this.props;
    if (!productDetails.getIn(['listing', 'account', 'user'], Map()).isEmpty()) {
      return (
        productDetails.getIn(['listing', 'account', 'user', 'first_name'], '') +
        ' ' +
        productDetails.getIn(['listing', 'account', 'user', 'last_name'], '')
      );
    }
    return <Skeleton count={10} />;
  };

  getStoreName = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'account', 'name'], '') !== '') {
      return (
        <Link to={'/store-details/' + productDetails.getIn(['listing', 'account_id'], '')}>
          {productDetails.getIn(['listing', 'account', 'name'], '')}
        </Link>
      );
    }
    return <Skeleton count={10} />;
  };

  getCategoryIds = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'categories'], List()).size > 0) {
      return productDetails
        .getIn(['listing', 'categories'], List())
        .map((item) => item.get('name'))
        .join(', ');
    }
    return '';
  };

  getAttributes = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'attributes'], List()).size > 0) {
      return productDetails.getIn(['listing', 'attributes'], List()).map((attr, index) => {
        return (
          <React.Fragment key={index}>
            <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
              {attr.get('name')}
            </div>
            <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
              {attr
                .get('values', List())
                .map((item) => item.get('name'))
                .join(', ')}
            </div>
          </React.Fragment>
        );
      });
    }
    return '';
  };

  getCoOrdinates = () => {
    const { productDetails } = this.props;
    if (productDetails.getIn(['listing', 'coordinates', 'latitude'], '') !== '') {
      return (
        <div className={classes.DetailsRight + ' col-lg-6'}>
          <Modal show={this.state.maps} modalClosed={this.closeMaps}>
            <Maps
              lat={productDetails.getIn(['listing', 'coordinates', 'latitude'], '')}
              lng={productDetails.getIn(['listing', 'coordinates', 'longitude'], '')}
            />
          </Modal>
          <button type="button" className="btn btn-outline-success" onClick={this.showMaps}>
            Get Direction
          </button>
        </div>
      );
    }
    return '';
  };

  productLike = () => {
    const { productDetails } = this.props;
    const productId = productDetails.getIn(['listing', 'id'], '');
    console.log('productDetails', productDetails, productId);
    this.props.onProductLikeDisLike(productId);
  };

  render() {
    const { error, productDetails, message, isAuthenticated } = this.props;
    let toastMessage = null;
    if (error) {
      toastMessage = <Toast type="error" message={message} />;
    }
    console.log('isAuthenticated', isAuthenticated);

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
              <h4>{productDetails.getIn(['listing', 'title'], 'N/A')}</h4>
              <div> {this.getPrices()}</div>
              <span>Product Description</span>
              <div className={classes.Description}>
                {productDetails.getIn(['listing', 'description'], 'N/A')}
              </div>
            </div>
          </div>

          <div className="col-xs-6 bgColor">
            <div className="col-lg-12 mt-4">
              <div className="row">
                <div className={classes.fashionStore + ' col-sm-6'}>
                  <h3>{this.getStoreOwner()}</h3>
                  <div className={classes.Description}>@{this.getStoreOwner()}</div>
                </div>
                <div className="col-sm-6">
                  <button className="btnGreenStyle pull-right">Follow</button>
                  {isAuthenticated !== '' && (
                    <button onClick={this.productLike} className="btnGreenStyle pull-right  mr-10">
                      Like
                    </button>
                  )}
                </div>
              </div>
              <hr />

              <h1 className="h1Headings">Details</h1>

              <div className="row">
                {this.getAttributes()}

                <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>Category</div>
                <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  {this.getCategoryIds()}
                </div>

                <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>Location</div>
                <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  {productDetails.getIn(['listing', 'location', 'formatted_address'], '')}
                </div>
                <div className={classes.DetailsLeft + ' col-lg-6'}></div>
                {this.getCoOrdinates()}
              </div>

              <h1 className="h1Headings">Additional Details</h1>

              <div className="row">
                <div className={classes.DetailsLeft + ' col-lg-6 col-sm-6 col-md-6'}>
                  Deliver Details
                </div>
                <div className={classes.DetailsRight + ' col-lg-6 col-sm-6 col-md-6'}>
                  Home Delivery Available, Cash On Delivery
                </div>
              </div>

              <br />
              <button type="button" className="btn btn-addtocart btn-lg btn-block height70">
                Download App
              </button>
              {/* <button type="button" className="btn btn-addtocart btn-lg btn-block height70">
                Add To Cart
              </button>
              <button type="button" className="btn btn-success btn-lg btn-block height70">
                Buy Now
              </button> */}
              <br />
              <br />
            </div>
          </div>
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
    isAuthenticated: selectUserId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitProductDetails: (id) => dispatch(actions.initProductDetails(id)),
    onProductLikeDisLike: (id) => dispatch(actions.onProductLikeDisLike(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
