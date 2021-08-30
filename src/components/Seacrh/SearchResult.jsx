import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Listing from '../Listing/Listing';
import classes from "./SearchResult.module.css"
import NoProductImage from '../../assets/images/rsz_noimage.png';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';

const SearchResult = () => {
  const { key } = useParams();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.Search.searchList);

  useEffect(() => {
    dispatch(actions.getSearchingResult(key));
  }, [key]);
     const backClick = () => {
       window.history.back();
     };
  return (
    <>
      <div div className={classes.find}>
        {listings.length > 0 ? (
          listings.map((list, i) => {
            let imagePath = NoProductImage;
            if (list.images[0] !== undefined) {
              imagePath = list.images[0];
            }
            return (
              <Link to={`/l/${list.id}-${list.title}`} key={i} style={{ textDecoration: 'none' }}>
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
          })
        ) : (
          <div
            style={{ marginTop: '2em' }}
            className="alert alert-danger fade in alert-dismissible"
          >
            <Link to="#" className="close" data-dismiss="alert" aria-label="close" title="close">
              ×
            </Link>
            <strong>oops!</strong> No listings found.
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResult;
