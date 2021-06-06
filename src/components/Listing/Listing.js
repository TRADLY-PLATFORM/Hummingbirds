import React from 'react';
import classes from './Listing.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';

const listing = (props) => {
  let listArray = props.listings.map((list) => {
    return (
      <Link to={`/product-details/${list.get('id')}/${list.get('title')}`} key={list.get('id')}>
        <div className={'col-md-5th-1 col-sm-4 '}>
          <div className={classes.latestTrend}>
            <img
              src={list.getIn(['images', 0])}
              className={classes.storeImage}
              alt={list.get('title', '')}
              title={list.get('title', '')}
            />
            <p>{list.get('title', '')}</p>
            <div className={classes.bottomDesc}>
              <img
                src={list.getIn(['account', 'images', 0])}
                alt={list.get('title', '')}
                title={list.getIn(['account', 'name'])}
              />{' '}
              <span>{list.getIn(['account', 'name'])}</span>
              <div className={classes.amountTitle}>
                <Aux>{list.getIn(['offer_price', 'formatted'])}</Aux>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="container-fluid mt-5" style={{ padding: '0px' }}>
      <div className="row">{listArray}</div>
    </div>
  );
};

export default listing;
