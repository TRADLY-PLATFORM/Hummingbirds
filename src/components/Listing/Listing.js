import React from 'react';
import classes from './Listing.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';

const listing = (props) => {
  let listArray = props.listings.map((list) => {
    return (
      <div key={list.get('id')}>
        <Link to={`/l/${list.get('id')}-${list.get('title').replace("%","")}`}>
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
                <div>
                  <img
                    src={list.getIn(['account', 'images', 0]) || NoIamgeLogo}
                    alt={list.get('title', '')}
                    title={list.getIn(['account', 'name'])}
                  />{' '}
                  <span>
                    {list.getIn(['account', 'name']).length < 11
                      ? list.getIn(['account', 'name'])
                      : list.getIn(['account', 'name']).substring(0, 11) + '..'}
                  </span>
                </div>
                <div className={classes.amountTitle}>
                  <Aux>{list.getIn(['offer_price', 'formatted'])}</Aux>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="container-fluid mt-5" style={{ padding: '0px' }}>
      <div className={classes.listArray}>{listArray}</div>
    </div>
  );
};

export default listing;
