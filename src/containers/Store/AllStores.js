import React, { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import * as actions from '../../store/actions/index';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import classes from './AllStores.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import backdrop from '../../components/UI/Backdrop/Backdrop';
import spinner from '../../components/UI/Spinner/Spinner';
import { selectUserId } from '../../store/selectors/auth';


const AllStores = () => {

  const location = useLocation()
  const followError = useSelector((state) => state.store.error);
  const followLoading = useSelector((state) => state.store.loading);
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getStores());
  }, []);
  const stores = useSelector((state) => state.store.storesLists);

  console.log(followLoading);

const postStoreFollow = (id,following) => {
  const storeId = id;
  let IsFollowing = following;
  
  console.log(storeId);

  setTimeout(() => {
    dispatch(actions.postStoreFollow(storeId, IsFollowing));
  }, 2000);

  setTimeout(() => {
    if (!followError) {
      dispatch(actions.getStores());
    }
  }, 3000);
};

  return (
    <Aux>
      <Helmet>
        <title>Tradly Web - Stores </title>
        <meta name="description" content=" All stores list . You can select a store" />
        <link rel="canonical" href={location.pathname} />
      </Helmet>
      {followLoading ? <div className={classes.Backdrop} ></div> : null}
      
      <spinner show={followLoading} />
      <div className={classes.storesStyle}>
        {stores?.map((store, i) => {
          let imagePath = AllenSollyLogo;
          if (store.images.length > 0) {
            imagePath = store.images[0];
          }

          let description = store.description;
          if (description.length > 25) {
            description = description.substring(0, 25) + '...';
          }

          return (
            <div className={classes.wellStore + ' col-lg-12'} key={i}>
              <Link
                to={`/store-details/${store.id}/${store.name}`}
                style={{ textDecoration: 'none' }}
              >
                <div className={classes.imageDiv}>
                  <img src={imagePath} alt={store.name} title={store.name} />
                </div>
                <div className={classes.wellStoreDetails}>
                  <p style={{ fontWeight: 'bold', marginBottom: '1em' }}>{store.name}</p>
                  <p>{description}</p>
                </div>
              </Link>
              {isAuthenticated ? (
                <button
                  className={
                    (store.following ? classes.btnGreenFollow : classes.btnGreenUnFollowing) +
                    ' mt-5'
                  }
                  onClick={() => postStoreFollow(store.id, store.following)}
                >
                  {store.following ? 'following' : 'follow'}
                </button>
              ) : (
                <Link to="/sign-in">
                  <button
                    className={classes.btnGreenUnFollowing + ' mt-5'}
                    style={{ marginLeft: '15px' }}
                  >
                    follow
                  </button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </Aux>
  );
};

export default AllStores;
