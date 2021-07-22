import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './LatestProduct.module.css';
import NoIamgeLogo from '../../../assets/images/home/store/noImage.svg';
import { Link } from 'react-router-dom';
import NoProductImage from '../../../assets/images/rsz_noimage.png';
import ItemsCarousel from 'react-items-carousel';

const LatestProducts = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const categories = useSelector((state) => state.home.collections);
  let arrayListings = [];
  let title;
  categories.map((collection, index) => {
    if (collection.title === 'Latest Products') {
      title = collection.title;
      arrayListings = collection.listings.map((list, i) => {
        let imagePath = NoProductImage;
        if (list.images[0] !== undefined) {
          imagePath = list.images[0];
        }

        return (
          <Link to={`/product-details/${list.id}/${list.title}`} key={i}>
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
                    <span>{list.account.name}</span>
                  </>
                ) : (
                  <>
                    <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                    <span>N/A</span>
                  </>
                )}

                <div className={classes.amountTitle}>
                  {list.list_price.formatted !== undefined ? list.list_price.formatted : ''}
                </div>
              </div>
            </div>
          </Link>
        );
      });
    }
  });
  return (
    <div className="row">
      <div className="col-lg-6 nopaddingLeft">
        <h3 className={classes.headingTitle}>{title}</h3>
      </div>
      <div className="col-lg-6 nopaddingRight">
        <Link to="/listings">
          <button className={'btnGreenStyle pull-right'}>View All</button>
        </Link>
      </div>
      <div style={{ marginTop: '60px' }}>
        <ItemsCarousel
          infiniteLoop={false}
          gutter={12}
          activePosition={'center'}
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={5}
          slidesToScroll={3}
          outsideChevron={false}
          showSlither={false}
          firstAndLastGutter={true}
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          rightChevron={
            <span
              className="glyphicon glyphicon-chevron-right"
              style={{ fontSize: '30px', color: '#e6e6e6' }}
              aria-hidden="true"
            ></span>
          }
          leftChevron={
            <span
              className="glyphicon glyphicon-chevron-left"
              style={{ fontSize: '30px', color: '#e6e6e6' }}
              aria-hidden="true"
            ></span>
          }
        >
          {arrayListings}
        </ItemsCarousel>
      </div>
    </div>
  );
};

export default LatestProducts;
