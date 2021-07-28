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
import StoresToFollow from './StoresToFollow/StoresToFollow';
import LatestProducts from './LatestProducts/LatestProducts';

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
      collectionContent = (
        <>
          <StoresToFollow />
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
        <Backdrop show={this.props.loading} />
        <Spinner show={this.props.loading} />
        <HomeBanner images={this.props.promo_banners} />
        <div className="row mt-5">{categoryContent}</div>

        {collectionContent}

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
