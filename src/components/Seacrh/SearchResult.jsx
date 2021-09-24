import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Listing from '../Listing/Listing';
import classes from "./SearchResult.module.css"
import NoProductImage from '../../assets/images/rsz_noimage.png';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';
import backdrop from '../UI/Backdrop/Backdrop';
import spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Loader from 'react-loader-spinner';

const SearchResult = () => {
  const { key } = useParams();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.Search.searchList);
  const loading = useSelector((state) => state.Search.loading);

  const location = useLocation()

  useEffect(() => {
    dispatch(actions.getSearchingResult(key));
  }, [key]);
     const backClick = () => {
       window.history.back();
     };
  return (
    <Aux>
      {loading ? (
        <Loader
          type="ThreeDots"
          color="var(--primary_color)"
          height={100}
          width={100}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      ) : listings.length > 0 ? (
        <div div className={classes.find}>
          {listings.map((list, i) => {
            let imagePath = NoProductImage;
            if (list.images[0] !== undefined) {
              imagePath = list.images[0];
            }
            return (
              <Link
                to={{
                  pathname: `/l/${list.id}-${list.title.replace('%', '')}`,
                  state: { prevPath: 'search results ' },
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
                          {list.list_price.formatted !== undefined ? list.list_price.formatted : ''}
                        </p>
                      </>
                    ) : (
                      <>
                        <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                        <span>N/A</span>
                        <p className={classes.amountTitle}>
                          {list.list_price.formatted !== undefined ? list.list_price.formatted : ''}
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
        <div style={{ marginTop: '2em' }} className="alert alert-danger fade in alert-dismissible">
          <Link to="#" className="close" data-dismiss="alert" aria-label="close" title="close">
            ×
          </Link>
          <strong>oops!</strong> No listings found.
        </div>
      )}
    </Aux>
  );
};

export default SearchResult;
