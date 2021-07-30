import React, { useEffect } from 'react';
import classes from './ListingByCategory.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { priceOptions, sortByOptions, totalCountOfProducts } from '../../shared/constants';
import Listing from '../../components/Listing/Listing';
import NoProductImage from '../../assets/images/rsz_noimage.png';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';
import backdrop from '../../components/UI/Backdrop/Backdrop';
import spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const ListingsByCategory = () => {
  const { categoryID } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initListings(0, '&category_id=' + categoryID, totalCountOfProducts));
  }, []);
  let listings = useSelector((state) => state.product.listings);
  let loading = useSelector((state) => state.product.loading);

  return (
    <Aux>
      <backdrop show={loading} />
      <spinner show={loading} />
      {
        <div className={classes.find}>
          {listings.map((list, i) => {
            let imagePath = NoProductImage;
            if (list.images[0] !== undefined) {
              imagePath = list.images[0];
            }
            return (
              <Link
                to={`/product-details/${list.id}/${list.title}`}
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
                  <p>{list.title}</p>
                  <div className={classes.bottomDesc}>
                    {list.account !== undefined && list.account.images[0] ? (
                      <div>
                        <img
                          src={list.account.images[0]}
                          alt={list.account.name}
                          title={list.account.name}
                        />
                        <span>
                          {list.account.name.length < 15
                            ? list.account.name
                            : list.account.name.substring(0, 14) + '..'}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                        <span>N/A</span>
                      </div>
                    )}

                    <div className={classes.amountTitle}>
                      {list.list_price.formatted !== undefined ? list.list_price.formatted : ''}
                    </div>
                  </div>
                </div>
                <div></div>
              </Link>
            );
          })}
        </div>
      }
      <br />
      <br />
      <br />
    </Aux>
  );
};

export default ListingsByCategory;
