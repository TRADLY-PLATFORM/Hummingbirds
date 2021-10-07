/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Helmet } from 'react-helmet';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';

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

import classes from './Listings.module.css';

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
    this.props.onInitListings(0, '', totalCountOfProducts,true);
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
    const { listings } = this.props;
    const { supplierLists } = this.props;
    if (listings.size > 0) {
      let accounts = [{ label: 'All', value: null }];
      listings.forEach((item) => {
        let repeated = false;
        for (let index = 0; index < accounts.length; index++) {
          const element = accounts[index];
          if (element.value === item.getIn(['account', 'id'])) {
            repeated = true;
          }
        }
        if (repeated === false) {
          return accounts.push({
            label: item.getIn(['account', 'name'], ''),
            value: item.getIn(['account', 'id'], ''),
          });
        }
      });
      return accounts;
    }
    return [];
  };

  formattedLocation = () => {
    const { listings } = this.props;
    if (listings.size > 0) {
      let location = [{ label: 'All', value: null }];
      listings
        .filter((item) => !item.get('location', Map()).isEmpty())
        .forEach((item) => {
          let repeated = false;
          for (let index = 0; index < location.length; index++) {
            const element = location[index];
            if (element.value === item.getIn(['location', 'formatted_address'])) {
              repeated = true;
            }
          }
          if (repeated === false) {
            return location.push({
              label: item.getIn(['location', 'formatted_address'], ''),
              value: item.getIn(['location', 'formatted_address'], ''),
            });
          }
        });

      return location;
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
      search += '&category_name=' + this.state.selectedOption.categoryValue.label.replace(' ', '-');
      this.props.history.push({
        search: search,
      });
    } else {
      this.props.history.push(`/listings`);
    }

    if (this.state.selectedOption.sortValue !== null) {
      filter += '&sort=' + this.state.selectedOption.sortValue.value;
      search += '&sort=' + this.state.selectedOption.sortValue.value;
      this.props.history.push({
        search: search,
      });
    }
    if (this.state.selectedOption.priceValue !== null) {
      let prices = this.state.selectedOption.priceValue.value;
      let spitPrices = prices.split('_');
      if (spitPrices[1] === '+') {
        filter += '&price_from=' + spitPrices[0];
        search += '&price_from=' + spitPrices[0];
      } else {
        filter += '&price_from=' + spitPrices[0] + '&price_to=' + spitPrices[1];
        search += '&price_from=' + spitPrices[0] + '&price_to=' + spitPrices[1];
      }
      this.props.history.push({
        search: search,
      });
    }

    if (btn) {
      if (this.props.allListings.length === 100) {
        this.props.onInitListings(0, filter, totalCountOfProducts, false,(parseInt(this.props.page)+1));
      } else {
        this.props.onInitListings(count, filter, totalCountOfProducts, false,parseInt(this.props.page));
      }
    } else {
      if (this.state.selectedOption.categoryValue === null) {
         this.props.onInitListings(
           count,
           filter,
           totalCountOfProducts,
           true,
           parseInt(this.props.page)
         );
       }
         this.props.onInitListings(
           count,
           filter,
           this.props.allListings?.length,
           true,
           parseInt(this.props.page)
         );
    }
  };

  render() {
    const { location } = this.props;

    let listing = '';
    let showLoadButton = null;
    const { listings, allListings, total_records, loading, seoConfigs } = this.props;
    const { selectedOption } = this.state;
    const { supplierValue, locationValue } = selectedOption;
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
      if (productsListing.size > 0) {
        listing = <Listing listings={productsListing} total_records={total_records} />;
        if (
          total_records > totalCountOfProducts &&
          productsListing.size !== total_records &&
          supplierValue === null &&
          locationValue === null
        ) {
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
            <div className={classes.listArray}>
              {allListings  &&
                (productsListing.size > 0 ? (
                  productsListing?.map((list) => {
                    return (
                      <div key={list.get('id')}>
                        <Link
                          to={{
                            pathname: `/l/${list.get('id')}-${list
                              .get('title')
                              .replace('%', '')
                              .replace('/', '')}`,
                            state: { prevPath: `All  listings` },
                          }}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className={classes.latestTrend}>
                            <img
                              src={list.getIn(['images', 0])}
                              className={classes.storeImage}
                              alt={list.get('title', '')}
                              title={list.get('title', '')}
                            />
                            <p className={classes.storeTitle}>{list.get('title', '')}</p>
                            <div className={classes.bottomDesc}>
                              <img
                                src={list.getIn(['account', 'images', 0]) || NoIamgeLogo}
                                alt={list.get('title', '')}
                                title={list.getIn(['account', 'name'])}
                              />{' '}
                              <p className={classes.storeName}>
                                {list.getIn(['account', 'name']).length < 9
                                  ? list.getIn(['account', 'name'])
                                  : list.getIn(['account', 'name']).substring(0, 7) + '..'}
                              </p>
                              <p className={classes.amountTitle}>
                                {list.getIn(['offer_price', 'formatted'])}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{ marginTop: '5em', width: '100%' }}
                    className="  alert alert-danger fade in alert-dismissible"
                  >
                    <Link
                      to="#"
                      className="close"
                      data-dismiss="alert"
                      aria-label="close"
                      title="close"
                    >
                      ×
                    </Link>
                    <strong>oops!</strong> No listings found.
                  </div>
                ))}
            </div>
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
    onInitListings: (count, filterValue, totalCountOfProducts,loading,page) =>
      dispatch(actions.initListings(count, filterValue, totalCountOfProducts,loading,page)),
    onCategoryLists: () => dispatch(actions.initCategoryLists()),
    onSupplierLists: () => dispatch(actions.initSupplierLists()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
