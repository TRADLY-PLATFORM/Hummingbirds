import React, { useEffect } from 'react';
import classes from './ListingByCategory.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {   totalCountOfProducts } from '../../shared/constants';
 import NoProductImage from '../../assets/images/rsz_noimage.png';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Loader from 'react-loader-spinner';


import { Helmet } from 'react-helmet';

const ListingsByCategory = () => {
  const location = useLocation();

  const { categoryName } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.initListings(0, '&category_id=' + categoryName.split('-')[0], totalCountOfProducts)
    );
  }, [categoryName, dispatch]);
  let listings = useSelector((state) => state.product.listings);
  let loading = useSelector((state) => state.product.loading);

  return (
    <>
      <Helmet>
        <title>Best {categoryName.split('-')[1]} products near me</title>
        <meta
          name="description"
          content={`Buy and sell products online - ${categoryName.split('-')[1]} `}
        />
        <link rel="canonical" href={location.pathname} />
      </Helmet>
      <Aux>
        {loading ? (
          <Loader
            type="ThreeDots"
            color="var(--primary_color)"
            height={100}
            width={100}
            style={{
              position: 'absolute',
              right: 0,
              height: '70%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '500',
            }}
          />
        ) : listings?.length > 0 ? (
          <div className={classes.find}>
            {listings?.map((list, i) => {
              let imagePath = NoProductImage;
              if (list.images[0] !== undefined) {
                imagePath = list.images[0];
              }
              return (
                <Link
                  to={{
                    pathname: `/l/${list.id}-${list.title.replace('%', '')}`,
                    state: { prevPath: `${categoryName.split('-')[1]} listings` },
                  }}
                  key={i}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={classes.latestTrend}>
                    <img
                      src={imagePath}
                      className={classes.storeImage}
                      alt={list.title}
                      title={list.title}
                    />
                    <p className={classes.storeTitle}>{list.title}</p>
                    <div className={classes.bottomDesc}>
                      {list.account !== undefined && list.account.images[0] ? (
                        <>
                          <img
                            src={list.account.images[0]}
                            alt={list.account.name}
                            title={list.account.name}
                          />
                          <span>
                            {list.account.name.length < 10
                              ? list.account.name
                              : list.account.name.substring(0, 10) + '..'}
                          </span>
                          <p className={classes.amountTitle}>
                            {list.list_price.formatted !== undefined
                              ? list.list_price.formatted
                              : ''}
                          </p>
                        </>
                      ) : (
                        <>
                          <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                          <span>N/A</span>
                          <p className={classes.amountTitle}>
                            {list.list_price.formatted !== undefined
                              ? list.list_price.formatted
                              : ''}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div></div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ marginTop: '2em' }} className="alert  alert-info fade in alert-dismissible">
            <Link to="#" className="close" data-dismiss="alert" aria-label="close" title="close">
              ×
            </Link>
            <strong>oops!</strong> No listings found.
          </div>
        )}
      </Aux>
    </>
  );
};

export default ListingsByCategory;
