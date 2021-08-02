import React, { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import * as actions from '../../store/actions/index';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import classes from './AllStores.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const AllStores = () => {

  const location = useLocation()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getStores());
  }, []);
  const stores = useSelector((state) => state.store.storesLists);

  console.log(stores);
  return (
    <>
      <Helmet>
        <title>Tradly Web - Stores </title>
        <meta
          name="description"
          content=" All stores list . You can select a store"
        />
        <link rel="canonical" href={location.pathname} />
      </Helmet>
      <div className={classes.storesStyle}>
        {stores.accounts?.map((store, i) => {
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
                <button className={classes.btnGreenFollow }>Follow</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllStores;
