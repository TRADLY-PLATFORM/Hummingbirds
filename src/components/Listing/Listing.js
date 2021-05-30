import React from 'react';
import classes from './Listing.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';

import StoreLogo from '../../assets/images/home/store/store1.svg';

const listing = (props) => {
  let listArray = props.listings.map((list, index) => {
    console.log('list', list);

    //let list_price  = null
    let offer_price = null;

    // if(list.list_price !== ''){
    //     list_price = <Aux>{list.currency.symbol}{list.list_price}</Aux>
    //     if(list.offer_price !== '' ){
    //         list_price = <strike>{list.currency.symbol}{list.list_price}</strike>
    //     }
    // }

    if (list.offer_price !== '') {
      offer_price = <Aux>{list.offer_price.formatted}</Aux>;
    }

    return (
      //col-md-offset-0 col-sm-offset-2
      <Link to={'/product-details/' + list.id} key={list.id}>
        <div className={'col-md-5th-1 col-sm-4 '}>
          <div className={classes.latestTrend}>
            <img
              src={StoreLogo}
              className={classes.storeImage}
              alt={list.title}
              title={list.title}
            />
            <p>{list.title}</p>
            <div className={classes.bottomDesc}>
              <img src={AllenSollyLogo} alt={list.title} title={list.account.name} />{' '}
              <span>{list.account.name}</span>
              <div className={classes.amountTitle}>{offer_price}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="container-fluid mt-5">
      <div className="row">{listArray}</div>
    </div>
  );
};

export default listing;
