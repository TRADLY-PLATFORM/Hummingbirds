import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import AllenSollyLogo from '../../../assets/images/home/store/allenSolly.svg';
import { Link } from 'react-router-dom';
import classes from './StoreToFollow.module.css';
import ItemsCarousel from 'react-items-carousel';

const StoresToFollow = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const categories = useSelector((state) => state.home.collections);

  let arrayListings = [];
  let title;
  categories.map((collection, index) => {
    if (collection.title === 'Stores to Follow') {
      title = collection.title;
      arrayListings = collection.accounts.map((list, i) => {
        let imagePath = AllenSollyLogo;
        if (list.images.length > 0) {
          imagePath = list.images[0];
        }

        let description = list.description;
        if (description.length > 35) {
          description = description.substring(0, 35) + '...';
        }

        return (
          <div className={classes.wellStore + ' col-lg-12'} key={i}>
            <div className={classes.imageDiv}>
              <img src={imagePath} alt={list.name} title={list.name} />
            </div>
            <div>{list.name}</div>
            <p>{description}</p>
            <Link to={`/store-details/${list.id}/${list.name}`}>
              <button className={classes.btnGreenFollow + ' mt-5'}>View Details</button>
            </Link>
          </div>
        );
      });
    }
  });

  return (
    <div className="row">
      <div className="col-lg-6 nopaddingLeft">
        <h3 className={classes.headingTitle}>{title}</h3>
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

export default StoresToFollow;
