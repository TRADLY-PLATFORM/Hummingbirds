import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import Category from '../../components/Category/Category';
import classes from './Home.module.css';
import { Link, withRouter } from 'react-router-dom';
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
import StoresToFollow from './StoresToFollow/StoresToFollow';
import LatestProducts from './LatestProducts/LatestProducts';
import Categories from './Categories/Categories';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { selectUserId } from '../../store/selectors/auth';


class Home extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
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
      this.props.onInitPromoBanners();
      this.props.onInitStoresToFollow();
    }, 3000);

    this.timer = setTimeout(() => {
      this.setState({ show: false });
    }, 6000);
  }
  redirectListing = () => {
    this.props.history.push('/listings');
  };

  render() {
    const { match, location, history } = this.props;
    let collectionContent = <Spinner show={true} styles="SpinnerCenter" />;
    console.log(this.props.collections);
    if (this.props.collections && this.props.collections.length > 0) {
      collectionContent = (
        <>
          <StoresToFollow isAuthenticated={this.props.isAuthenticated} />
          <br />
          <br />
          <LatestProducts />
        </>
      );
    } else {
      if (!this.state.show) {
        collectionContent = '';
      }
    }
    console.log(this.props.token);
    return (
      <Aux>
        <Helmet>
          <title>
            {process.env.REACT_APP_TENANT_NAME} - Buy & Sell used items online from mobile app
          </title>
          <meta
            name="description"
            content=" Buy & Sell used items online and preloved electronics, bikes, cycle, books, fashion, gadgets, etc"
          />
          <link href={location.pathname} />
        </Helmet>
        <Backdrop show={this.props.loading || this.props.followLoading} />
        <Spinner show={this.props.loading || this.props.followLoading} />
        <HomeBanner images={this.props.promo_banners} />
        <div style={{ width: '100%' }}>
          <Categories />
        </div>
        <br />
        <div>{collectionContent}</div>

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
    followLoading:state.store.loading,
    message: state.auth.message,
    promo_banners: state.home.promo_banners,
    categories: state.home.categories,
    collections: state.home.collections,
    isAuthenticated: selectUserId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitHomeCollections: () => dispatch(actions.initHomeCollections()),
    onInitPromoBanners: () => dispatch(actions.initPromoBanners()),
    onInitStoresToFollow: () => dispatch(actions.initStoresToFollow()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
