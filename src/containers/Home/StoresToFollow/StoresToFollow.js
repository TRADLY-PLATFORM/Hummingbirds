import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import AllenSollyLogo from '../../../assets/images/home/store/allenSolly.svg';
import { Link } from 'react-router-dom';
import classes from './StoreToFollow.module.css';
import ItemsCarousel from 'react-items-carousel';

const StoresToFollow = ({ isAuthenticated }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.home.collections);
  const followError = useSelector((state) => state.store.error);
  // const [followSet,setFollowSet] = useState()

  let arrayListings = [];
  let title;
  categories.map((collection, index) => {
    if (collection.title === 'Stores to Follow') {
      title = collection.title;
      arrayListings = collection.accounts.map((list, i) => {
        let imagePath = AllenSollyLogo;
        var followSet ;
        if (list.images.length > 0) {
          imagePath = list.images[0];
        }

        let description = list.description;
        if (description.length > 25) {
          description = description.substring(0, 25) + '...';
        }

        const postStoreFollow = (id) => {
          const storeId =  id;
          let IsFollowing = false;
          if (list.following !== false) {
            IsFollowing = true;
          }
          console.log(storeId);

           setTimeout(() => {
            dispatch(actions.postStoreFollow(storeId, IsFollowing));
          }, 1000);

            setTimeout(() => {
              if (!followError) {
               dispatch(actions.initHomeCollections());
            }
          }, 2000);
        };

        return (
          <div className={classes.wellStore + ' col-lg-12'} key={i}>
            <Link to={`/store-details/${list.id}/${list.name}`} style={{ textDecoration: 'none' }}>
              <div className={classes.imageDiv}>
                <img src={imagePath} alt={list.name} title={list.name} />
              </div>
              <div className={classes.wellStoreDetails}>
                <p style={{ fontWeight: 'bold', marginBottom: '1em' }}>{list.name}</p>
                <p>{description}</p>
              </div>
            </Link>
            {isAuthenticated ? (
              <button
                className={classes.btnGreenFollow + ' mt-5'}
                onClick={() => postStoreFollow(list.id)}
              >
                {list.following? 'following' : 'follow'}
              </button>
            ) : (
              <Link to="/sign-in">
                <button className={classes.btnGreenFollow + ' mt-5'} style={{ marginLeft: '15px' }}>
                  follow
                </button>
              </Link>
            )}
          </div>
        );
      });
    }
  });

  return (
    <div className="row">
      <div className="col-lg-6  ">
        <h3 className={classes.headingTitle}>{title}</h3>
      </div>
      <div className="col-lg-6  ">
        <Link to="/stores">
          <button className={'btnGreenStyle pull-right'}>View All</button>
        </Link>
      </div>

      <div style={{ marginTop: '60px', marginLeft: '-10px', marginRight: '10px' }}>
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
