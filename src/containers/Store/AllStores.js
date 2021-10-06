import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import classes from './AllStores.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import backdrop from '../../components/UI/Backdrop/Backdrop';
import spinner from '../../components/UI/Spinner/Spinner';
import { selectUserId } from '../../store/selectors/auth';
import StoreFilter from './StoreFilter';
import { priceOptions, sortByOptions } from '../../shared/constants';

const AllStores = () => {

  const [selectedPart, setSelectedPart] = useState({
    priceValue: null,
    sortValue: null,
    supplierValue: null,
    locationValue: null,
    categoryValue: null,
  });

  const location = useLocation();
  const followError = useSelector((state) => state.store.error);
  const followLoading = useSelector((state) => state.store.loading);
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getStores(1,20));
    dispatch(actions.accountCategories());

  }, [0]);
  
  const setPath = () => {
    dispatch(actions.setAuthRedirectPath(location.pathname));
  };


  const stores = useSelector((state) => state.store.storesLists);
  const accountCategory = useSelector((state) => state.store.categories);

 
  const postStoreFollow = (id, following) => {
    const storeId = id;
    let IsFollowing = following;

       dispatch(actions.postStoreFollow(storeId, IsFollowing));
 
    setTimeout(() => {
      if (!followError) {
        dispatch(actions.getStores(parseInt(stores.page), stores.accounts.length));
      }
    }, 1000);
  };

  // 
  const handleChange = (selectedOption, selectedName) => {
    
    let name = selectedName.name;
    let selectedValue = { ...selectedPart };
    if (selectedOption?.value === null) {
      selectedValue[name] = null;
    } else {
      selectedValue[name] = selectedOption;
    }
    setSelectedPart(selectedValue);

     
  };
  // 
     let options = {
       priceOptions: priceOptions,
       categoryOptions: accountCategory.map((item, index) => {
         return (
           {label:item.name,value:item.id}
         )
       }),
       locationOptions: [],
       supplerOptions: [],
       sortByOptions: sortByOptions,
     };

  // 
  const loadMore = () => {
     if (stores.accounts.length !== 100) {
      dispatch(actions.getStores(parseInt(stores.page), stores.accounts.length + 20));
    } else {
       dispatch(actions.getStores(parseInt(stores.page) + 1, 20));
    }
  }

  return (
    <Aux>
      <Helmet>
        <title>Tradly Web - Stores </title>
        <meta name="description" content=" All stores list . You can select a store" />
        <link rel="canonical" href={location.pathname} />
      </Helmet>
      {followLoading ? <div className={classes.Backdrop}></div> : null}

      <spinner show={followLoading} />
      <div className={classes.filterBox}>
        <StoreFilter selectedPart={selectedPart} options={options} handleChange={handleChange} />
      </div>
      <div className={classes.storesStyle}>
        {stores?.accounts?.map((store, i) => {
          let imagePath = AllenSollyLogo;
          if (store.images.length > 0) {
            imagePath = store.images[0];
          }

          let description = store.description;
          if (description.length > 15) {
            description = description.substring(0, 15) + '..';
          }
          let name = store.name;
          // if (description.length > 15) {
          //   name = name.substring(0, 15) + '..';
          // }

          return (
            <Link
              className={classes.wellStore + ' col-lg-12'}
              key={i}
              to={`/a/${store.id}-${store.name}`}
              style={{ textDecoration: 'none' }}
            >
              <div className={classes.imageDiv}>
                <img src={imagePath} alt={store.name} title={store.name} />
              </div>
              <div className={classes.wellStoreDetails}>
                <p style={{ fontWeight: 'bold', marginBottom: '1em' }}>
                  {store.name.length < 10 ? store.name : store.name.substring(0, 15) + '..'}
                </p>
                <p>{description}</p>
              </div>

              {isAuthenticated ? (
                <Link
                  style={{ textDecoration: 'none' }}
                  className={
                    (store.following ? classes.btnGreenFollow : classes.btnGreenUnFollowing) +
                    ' mt-5'
                  }
                  onClick={() => postStoreFollow(store.id, store.following)}
                  to="/stores"
                >
                  {store.following ? 'Following' : 'Follow'}
                </Link>
              ) : (
                <Link to="/sign-in" onClick={setPath}>
                  <button className={classes.btnGreenUnFollowing + ' mt-5'}>Follow</button>
                </Link>
              )}
            </Link>
          );
        })}
      </div>
      <div className="col-sm-12">
        <button
          className="btnGreenStyle pull-right mt-4"
          onClick={() =>loadMore()}
          style={{ marginBottom: '50px' }}
        >
          Load More
        </button>
      </div>
    </Aux>
  );
};

export default AllStores;
