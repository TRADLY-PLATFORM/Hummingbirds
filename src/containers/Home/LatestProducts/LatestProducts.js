import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './LatestProduct.module.css';
import NoIamgeLogo from '../../../assets/images/home/store/noImage.svg';
import { Link } from 'react-router-dom';
import NoProductImage from '../../../assets/images/rsz_noimage.png';
import ItemsCarousel from 'react-items-carousel';
import { size } from 'underscore';
import useWindowSize from '../../../components/Hooks/WindowSize/WindowSize';

const LatestProducts = ({ products }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { width, height } = useWindowSize();

  const dispatch = useDispatch();
  // useEffect(() => {
  //    dispatch(actions.initLatestProducts());
  // }, [0])
  // const products = useSelector((state) => state.home.latestProducts);

  let arrayListings = [];
  let title = 'Latest Products';
  arrayListings = products.map((list, i) => {
    let imagePath = NoProductImage;
    if (list.images[0] !== undefined) {
      imagePath = list.images[0];
    }

    return (
      <Link to={`/l/${list.id}-${`${list.title.replace("%","")}`}`} key={i} style={{ textDecoration: 'none' }}>
        <div className={classes.latestTrend}>
          <img src={imagePath} className={classes.storeImage} alt={list.title} title={list.title} />
          <p>{list.title.length < 20
                    ? list.title 
                    : list.title.substring(0, 20) + '..'}</p>
          <div className={classes.bottomDesc}>
            {list.account !== undefined && list.account.images[0] ? (
              <div>
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
  });

  return (
    <>
      {arrayListings.length > 0 && (
        <div className={classes.latestProducts + 'row'}>
          <div className="col-lg-6  ">
            <h3 className={classes.headingTitle}>{title}</h3>
          </div>
          <div className="col-lg-6  ">
            <Link to="/listings">
              <button className={'btnGreenStyle pull-right'}>View All</button>
            </Link>
          </div>
          <br />
          <div style={{ marginTop: '60px', marginLeft: '-10px', marginRight: '10px' }}>
            <ItemsCarousel
              infiniteLoop={false}
              gutter={12}
              activePosition={'center'}
              chevronWidth={60}
              disableSwipe={false}
              alwaysShowChevrons={false}
              numberOfCards={width < 780 ? 1 : 5}
              slidesToScroll={width < 780 ? 1 : 3}
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
      )}
    </>
  );
};

export default LatestProducts;
