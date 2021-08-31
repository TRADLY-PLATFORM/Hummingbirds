import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
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
    loadOnce: false,
  };
  handleChange = (selectedOption, selectedName) => {
    console.log('====================================');
    console.log(selectedOption, selectedName);
    console.log('====================================');
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

  loadMore = () => {
    let count = totalCountOfProducts;
    let filter = '';
    if (this.state.selectedOption.categoryValue !== null) {
       filter += '&category_id=' + this.state.selectedOption.categoryValue.value;
    }
    
    if (this.state.selectedOption.sortValue !== null) {
      filter += '&sort=' + this.state.selectedOption.sortValue.value;
    }
    if (this.state.selectedOption.priceValue !== null) {
      let prices = this.state.selectedOption.priceValue.value;
      let spitPrices = prices.split('_');
      filter += '&price_from=' + spitPrices[0] + '&price_to=' + spitPrices[1];
    }
    this.props.onInitListings(count, filter, totalCountOfProducts);
  };

  render() {

    console.log(this.props.match.params.categoryID);

    let listing = '';
    let showLoadButton = null;
    const { listings, total_records, loading } = this.props;
    console.log('total_records', total_records, listings);
    const { selectedOption } = this.state;
    const { categoryValue, supplierValue, locationValue } = selectedOption;
    console.log(categoryValue, supplierValue, locationValue);
    const productsListing = listings
      .filter((item) =>
        supplierValue !== null ? item.getIn(['account', 'id'], '') === supplierValue.value : item
      )
      .filter((item) =>
        locationValue !== null
          ? item.getIn(['location', 'formatted_address'], '') === locationValue.value
          : item
      );
    if (productsListing && productsListing.size === 0 && !loading) {
      listing = (
        <div style={{ marginTop: '5em' }} className="alert alert-danger fade in alert-dismissible">
          <Link to="#" className="close" data-dismiss="alert" aria-label="close" title="close">
            ×
          </Link>
          <strong>oops!</strong> No listings found.
        </div>
      );
    }
    console.log(productsListing);
    if (productsListing && productsListing.size > 0) {
      listing = <Listing listings={productsListing} total_records={total_records} />;
      if (total_records > totalCountOfProducts && productsListing.size !== total_records) {
        showLoadButton = (
          <div className="col-sm-12">
            <button
              className="btnGreenStyle pull-right mt-4"
              onClick={this.loadMore}
              style={{ marginBottom: '50px' }}
            >
              Load More
            </button>
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
            const { match, location, history } = this.props;


    return (
      <>
        <Helmet>
          <title>Tradly Web -  All Products</title>
          <meta
            name="description"
            content=" Collection of all new products. You can see different types of products by selecting according to your choice. You can easily find the product of your choice."
            
          />
          <link rel="canonical" href={location.pathname} />

        </Helmet>
        <Aux>
          <Backdrop show={loading} />
          <Spinner show={loading} />
          <Filter
            selectedOption={selectedOptionList}
            options={options}
            handleChange={this.handleChange}
          />
          {listing}
          {showLoadButton}
          <br />
          <br />
          <br />
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
    listings: selectListings(state),
    page: state.product.page,
    total_records: selectTotalListings(state),
    categoryLists: selectCategoryLists(state),
    supplierLists: selectSupplierLists(state),
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
