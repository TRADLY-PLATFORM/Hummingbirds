import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import AllenSollyLogo from '../../../assets/images/home/store/allenSolly.svg';
import { Link } from 'react-router-dom';
import classes from './StoreToFollow.module.css';
import ItemsCarousel from 'react-items-carousel';
import backdrop from '../../../components/UI/Backdrop/Backdrop';
import spinner from '../../../components/UI/Spinner/Spinner';
import useWindowSize from '../../../components/Hooks/WindowSize/WindowSize';
import { selectUserId } from '../../../store/selectors/auth';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

 

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const StoresToFollow = ({ storesToFollow }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { width, height } = useWindowSize();
  const [isFollow, setIsFollow] = useState();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(actions.initStoresToFollow());
  // }, [0]);

  const categories = useSelector((state) => state.home.collections);
  const followError = useSelector((state) => state.store.error);
  const followLoading = useSelector((state) => state.store.loading);
  const isAuthenticated = useSelector((state) => selectUserId(state));

  // const [followSet,setFollowSet] = useState()
  let arrayListings = [];
  let title = storesToFollow.title;

  arrayListings = storesToFollow?.accounts?.map((list, i) => {
    let imagePath = AllenSollyLogo;
     if (list.images.length > 0) {
      imagePath = list.images[0];
    }

    let description = list.description;
    if (description.length > 15) {
      description = description.substring(0, 13) + '..';
    }

    const postStoreFollow = (e, id) => {
      const storeId = id;
      let IsFollowing = false;
      if (list.following !== false) {
        IsFollowing = true;
      }

      setTimeout(() => {
        dispatch(actions.postStoreFollow(storeId, IsFollowing));
      }, 500);

      setTimeout(() => {
        if (!followError) {
          dispatch(actions.initStoresToFollow());
        }
      }, 1000);
    };
    let slideView;
    if (width > 780) {
      slideView =1
    }
    else if (width > 1180) {
      slideView = 5;
    }
      return (
        <Link className={classes.wellStore} key={i} id={list.id} to={`/a/${list.id}-${list.name}`}>
           
            <div className={classes.imageDiv}>
              <img src={imagePath} alt={list.name} title={list.name} />
            </div>
            <div className={classes.wellStoreDetails}>
              <p style={{ fontWeight: 'bold', marginBottom: '1em' }}>
                {list.name.length < 10 ? list.name : list.name.substring(0, 15) + '..'}
              </p>
              <p>{description}</p>
            </div>
        
          {isAuthenticated ? (
            <Link
              id="followBtn"
               
              className={
                (list.following ? classes.btnGreenFollowing : classes.btnGreenUnFollowing)  
              }
              onClick={(e) => postStoreFollow(e, list.id)}
            >
              {list.following ? 'Following' : 'Follow'}
            </Link>
          ) : (
            <Link to="/sign-in">
              <button className={classes.btnGreenUnFollowing  }>Follow</button>
            </Link>
          )}
        </Link>
      );
  });

  return (
    <>
      {arrayListings?.length > 0 && (
        <div className={classes.storePart}>
          <div className={classes.storePartHeader}>
            <div className="  ">
              <h3 className={classes.headingTitle}>{title}</h3>
            </div>
            <div className="  " style={{ marginRight: '0.4%' }}>
              <Link to="/stores">
                <button className={'btnGreenStyle pull-right'}>View All</button>
              </Link>
            </div>
          </div>
          <br />

          <div style={{ marginTop: '60px' }}>
            <Swiper
              slidesPerView={width < 600 ?"auto":2}
              slidesPerGroup={1}
              spaceBetween={10}
              loop={false}
              navigation={width < 780 ? false : true}
              className="mySwiper"
              style={{ marginTop: '60px' }}
              breakpoints={{
                 "600": {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                
                "950": {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                "1160": {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                
                "1300": {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
            >
              {arrayListings?.map((list, i) => (
                <SwiperSlide className={classes.swiperSlide}>{list}</SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default StoresToFollow;


// <ItemsCarousel
//   infiniteLoop={false}
//   gutter={12}
//   activePosition={'center'}
//   chevronWidth={60}
//   disableSwipe={false}
//   alwaysShowChevrons={false}
//   numberOfCards={width < 780 ? 1 : 5}
//   slidesToScroll={width < 780 ? 1 : 3}
//   outsideChevron={false}
//   showSlither={false}
//   firstAndLastGutter={true}
//   requestToChangeActive={setActiveItemIndex}
//   activeItemIndex={activeItemIndex}
//   rightChevron={
//     <span
//       className="glyphicon glyphicon-chevron-right"
//       style={{ fontSize: '30px', color: '#e6e6e6' }}
//       aria-hidden="true"
//     ></span>
//   }
//   leftChevron={
//     <span
//       className="glyphicon glyphicon-chevron-left"
//       style={{ fontSize: '30px', color: '#e6e6e6' }}
//       aria-hidden="true"
//     ></span>
//   }
// >
//   {arrayListings}
// </ItemsCarousel>;