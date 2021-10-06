/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Helmet } from 'react-helmet';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Listing from '../../components/Listing/Listing';
import Filter from '../../components/Listing/Filter/Filter';
import { priceOptions, sortByOptions, totalCountOfProducts } from '../../shared/constants';
import {
  selectCategoryLists,
  selectSupplierLists,
  selectListings,
  selectTotalListings,
} from '../../store/selectors/product';
import PropTypes from 'prop-types';


import classes from "./Listings.module.css"




class Listings extends Component {
   static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  state = {
    selectedOption: {
      priceValue: null,
      sortValue: null,
      supplierValue: null,
      locationValue: null,
      categoryValue: null,
    },
    count: 0,
    loadOnce: false,

  };
  handleChange = (selectedOption, selectedName) => {
    
    let name = selectedName.name;
    let selectedValue = { ...this.state.selectedOption };
    if (selectedOption?.value === null) {
      selectedValue[name] = null;
    } else {
      selectedValue[name] = selectedOption;
    }

    if (['priceValue', 'sortValue', 'categoryValue'].includes(name)) {
      this.setState({ selectedOption: selectedValue, loadOnce: true });
    } else {
      this.setState({ selectedOption: selectedValue });
    }
  };

  componentDidMount() {
    this.props.onInitListings(0, '', totalCountOfProducts);
    this.props.onCategoryLists();
    this.props.onSupplierLists();
  }

  formattedCategory = () => {
    const { categoryLists } = this.props;
    if (categoryLists.size > 0) {
      return [
        { label: 'All', value: null },
        ...categoryLists
          .map((item) => {
            return { label: item.get('name', ''), value: item.get('id', '') };
          })
          .toJS(),
      ];
    }
    return [];
  };

  formattedSupplier = () => {
    const { supplierLists } = this.props;
    if (supplierLists.size > 0) {
      return [
        { label: 'All', value: null },
        ...supplierLists
          .map((item) => {
            return { label: item.get('name', ''), value: item.get('id', '') };
          })
          .toJS(),
      ];
    }
    return [];
  };

   formattedLocation = () => {
    const { listings } = this.props;
    if (listings.size > 0) {
      return [
        { label: 'All', value: null },
        ...listings
          .filter((item) => !item.get('location', Map()).isEmpty())
          .map((item) => {
            return {
              label: item.getIn(['location', 'formatted_address'], ''),
              value: item.getIn(['location', 'formatted_address'], ''),
            };
          })
          .toJS(),
      ];
    }
    return [];
  };

  componentDidUpdate() {
    if (this.state.loadOnce) {
      this.loadMore();
      this.setState({ loadOnce: false });
    }
  }

  loadMore = (btn) => {
    let count = 0;
    if (btn) {
      count = this.props.allListings.length;
   }
    let filter = '';
    let search = '';
    if (this.state.selectedOption.categoryValue !== null) {
      filter += '&category_id=' + this.state.selectedOption.categoryValue.value;
      search += '&category_name=' + this.state.selectedOption.categoryValue.label.replace(' ','-');
      this.props.history.push({
        search: search, 
      });
    } else {
          this.props.history.push(`/listings`);
    }
    
    if (this.state.selectedOption.sortValue !== null) {
      filter += '&sort=' + this.state.selectedOption.sortValue.value;
      search += '&sort='+ this.state.selectedOption.sortValue.value;
      this.props.history.push({
        search: search,
      });
    }
    if (this.state.selectedOption.priceValue !== null) {
      let prices = this.state.selectedOption.priceValue.value;
      let spitPrices = prices.split('_');
      if (spitPrices[1] === '+') {
        filter += '&price_from=' + spitPrices[0]
        search += '&price_from=' + spitPrices[0]  
      }
      else {
         filter += '&price_from=' + spitPrices[0] + '&price_to=' + spitPrices[1];
         search += '&price_from=' + spitPrices[0] + '&price_to=' + spitPrices[1];
       }
       this.props.history.push({
         search: search,
       });
    }
    this.props.onInitListings(count, filter, totalCountOfProducts);
   };

  render() {
    const {   location  } = this.props;

 
    let listing = '';
    let showLoadButton = null;
    const { listings,allListings, total_records, loading, seoConfigs } = this.props;
     const { selectedOption } = this.state;
    const {   supplierValue, locationValue } = selectedOption;
     const productsListing = listings
      .filter((item) =>
        supplierValue !== null ? item.getIn(['account', 'id'], '') === supplierValue.value : item
      )
      .filter((item) =>
        locationValue !== null
          ? item.getIn(['location', 'formatted_address'], '') === locationValue.value
          : item
      );
    
 
   
    
    if (!loading && allListings !== null) {
      if (productsListing.size > 0  ) {
        listing = <Listing listings={productsListing} total_records={total_records} />;
        if (total_records > totalCountOfProducts && productsListing.size !== total_records) {
          showLoadButton = (
            <div className="col-sm-12">
              <button
                className="btnGreenStyle pull-right mt-4"
                onClick={() => this.loadMore(true)}
                style={{ marginBottom: '50px' }}
              >
                Load More
              </button>
            </div>
          );
        }
      } else {
        listing = (
          <div
            style={{ marginTop: '5em' }}
            className="alert alert-danger fade in alert-dismissible"
          >
            <Link to="#" className="close" data-dismiss="alert" aria-label="close" title="close">
              ×
            </Link>
            <strong>oops!</strong> No listings found.
          </div>
        );
      }
    }

    let options = {
      priceOptions: priceOptions,
      categoryOptions: this.formattedCategory(),
      locationOptions: this.formattedLocation(),
      supplerOptions: this.formattedSupplier(),
      sortByOptions: sortByOptions,
    };

    let selectedOptionList = {
      priceValue: this.state.selectedOption.priceValue,
      sortValue: this.state.selectedOption.sortValue,
      supplierValue: this.state.selectedOption.supplierValue,
      locationValue: this.state.selectedOption.locationValue,
      categoryValue: this.state.selectedOption.categoryValue,
    };


    return (
      <>
        <Helmet>
          <title>{seoConfigs.meta_listing_title}</title>
          <meta name="description" content={seoConfigs.meta_listing_description} />
          <link rel="canonical" href={location.pathname} />
        </Helmet>
        <Aux>
          <Backdrop show={loading} />
          <Spinner show={loading} />

          <div className={classes.allListingsBox}>
            <Filter
              selectedOption={selectedOptionList}
              options={options}
              handleChange={this.handleChange}
            />
            {listing}
            {showLoadButton}
          </div>
        </Aux>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.product.error,
    loading: state.product.loading,
    message: state.product.message,
    allListings: state.product.listings,
    listings: selectListings(state),
    page: state.product.page,
    total_records: selectTotalListings(state),
    categoryLists: selectCategoryLists(state),
    supplierLists: selectSupplierLists(state),
    seoConfigs: state.auth.seo_configs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitListings: (count, filterValue, totalCountOfProducts) =>
    dispatch(actions.initListings(count, filterValue, totalCountOfProducts)),
    onCategoryLists: () => dispatch(actions.initCategoryLists()),
    onSupplierLists: () => dispatch(actions.initSupplierLists()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
