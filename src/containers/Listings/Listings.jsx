import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link, useLocation, useHistory } from 'react-router-dom';
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

import classes from './Listings.module.css';

const Listings = () => {
  // state
  const [selectedPart, setSelectedPart] = useState({
    priceValue: null,
    sortValue: null,
    supplierValue: null,
    locationValue: null,
    categoryValue: null,
  });

  const [count, setCount] = useState(0);
  const [loadOnce, setLoadOnce] = useState(false);

  //
  const location = useLocation();
  const history = useHistory();

  // reducer
  const error = useSelector((state) => state.product.error);
  const loading = useSelector((state) => state.product.loading);
  const message = useSelector((state) => state.product.message);
  const allListings = useSelector((state) => state.product.listings);
  const listings = useSelector((state) => selectListings(state));
  const page = useSelector((state) => state.product.page);
  const total_records = useSelector((state) => selectTotalListings(state));
  const categoryLists = useSelector((state) => state.product.categoryLists);
  const supplierLists = useSelector((state) => selectSupplierLists(state));
  const seoConfigs = useSelector((state) => state.auth.seo_configs);

  //UseEffect
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initListings(count, '', totalCountOfProducts));
    dispatch(actions.initCategoryLists());
    dispatch(actions.initSupplierLists());
  }, [0]);

  // function
  const handleChange = (selectedOption, selectedName) => {
    let name = selectedName.name;
    let selectedValue = { ...selectedPart };
    if (selectedOption?.value === null) {
      selectedValue[name] = null;
    } else {
      selectedValue[name] = selectedOption;
    }
    setSelectedPart(selectedValue);
    setTimeout(() => {
      loadMore();
    }, 1000);
  };
  

  //
  const loadMore = (btn) => {
    let count = 0;
    if (btn) {
      count = allListings.length;
    }
    let filter = '';
    let search = '';
    if (selectedPart.categoryValue !== null) {
      filter += '&category_id=' + selectedPart.categoryValue.value;
      search += '&category_name=' + selectedPart.categoryValue.label.replace(' ', '-');
      history.push({
        search: search,
      });
    } else {
      history.push(`/listings`);
    }

    if (selectedPart.sortValue !== null) {
      filter += '&sort=' + selectedPart.sortValue.value;
      search += '&sort=' + selectedPart.sortValue.value;
      history.push({
        search: search,
      });
    }
    if (selectedPart.priceValue !== null) {
      let prices = selectedPart.priceValue.value;
      let spitPrices = prices.split('_');
      if (spitPrices[1] === '+') {
        filter += '&price_from=' + spitPrices[0];
        search += '&price_from=' + spitPrices[0];
      } else {
        filter += '&price_from=' + spitPrices[0] + '&price_to=' + spitPrices[1];
        search += '&price_from=' + spitPrices[0] + '&price_to=' + spitPrices[1];
      }
      history.push({
        search: search,
      });
    }
    console.log('====================================');
    console.log(count, filter, totalCountOfProducts);
    console.log('====================================');
    // dispatch(actions.initListings(count, filter, totalCountOfProducts));
  };

  let options = {
    priceOptions: priceOptions,
    categoryOptions: categoryLists.map((item, index) => {
      return { label: item.name, value: item.id };
    }),
    locationOptions: [],
    supplerOptions: [],
    sortByOptions: sortByOptions,
  };
  let selectedOptionList = {
    priceValue: selectedPart.priceValue,
    sortValue: selectedPart.sortValue,
    supplierValue: selectedPart.supplierValue,
    locationValue: selectedPart.locationValue,
    categoryValue: selectedPart.categoryValue,
  };

  return (
    <>
      <Helmet>
        <title>{seoConfigs.meta_listing_title}</title>
        <meta name="description" content={seoConfigs.meta_listing_description} />
        <link rel="canonical" href={location.pathname} />
      </Helmet>
      <div className={classes.allListingsBox}>
        <Filter selectedOption={selectedOptionList} options={options} handleChange={handleChange} />
        <div className={classes.listArray}>
          {allListings?.map((list) => {
            return (
              <div key={list.id}>
                <Link
                  to={`/l/${list.id}-${list.title.replace('%', '')}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={classes.latestTrend}>
                    <img
                      src={list.images[0]}
                      className={classes.storeImage}
                      alt={list.title}
                      title={list.title}
                    />
                    <p className={classes.storeTitle}>{list.title}</p>
                    <div className={classes.bottomDesc}>
                      <img
                        src={list.account.images[0] || NoIamgeLogo}
                        alt={list.title}
                        title={list.account.name}
                      />{' '}
                      <p className={classes.storeName}>
                        {list.account.name.length < 9
                          ? list.account.name
                          : list.account.name.substring(0, 7) + '..'}
                      </p>
                      <p className={classes.amountTitle}>{list.offer_price.formatted}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Listings;
