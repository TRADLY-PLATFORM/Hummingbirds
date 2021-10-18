import React from 'react';
import classes from './Listing.module.css';
 import { Link } from 'react-router-dom';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';
import { getThumbnailImage } from '../../shared/constants';

const listing = (props) => {
  let listArray = props.listings.map((list) => {
    return (
      <div key={list.get('id')}>
        <Link
          to={{
            pathname: `/l/${list.get('id')}-${list.get('title').replace('%', '').replace('/', '')}`,
            state: { prevPath: `${ props.message}` },
          }}
          style={{ textDecoration: 'none' }}
        >
          <div className={classes.latestTrend}>
            <img
              src={getThumbnailImage(list.getIn(['images', 0])) }
              className={classes.storeImage}
              alt={list.get('title', '')}
              title={list.get('title', '')}
            />
            <p className={classes.storeTitle}>{list.get('title', '')}</p>
            <div className={classes.bottomDesc}>
              <img
                src={list.getIn(['account', 'images', 0])? getThumbnailImage(list.getIn(['account', 'images', 0])) : NoIamgeLogo}
                alt={list.get('title', '')}
                title={list.getIn(['account', 'name'])}
              />{' '}
              <p className={classes.storeName}>
                {list.getIn(['account', 'name']).length < 9
                  ? list.getIn(['account', 'name'])
                  : list.getIn(['account', 'name']).substring(0, 7) + '..'}
              </p>
              <p className={classes.amountTitle}>{list.getIn(['offer_price', 'formatted'])}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="  mt-5" style={{ padding: '0px' }}>
      <div className={classes.listArray}>{listArray}</div>
    </div>
  );
};

export default listing;
