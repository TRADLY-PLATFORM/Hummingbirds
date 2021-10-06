/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import AllenSollyLogo from '../../../assets/images/home/store/allenSolly.svg';
import { Link, useLocation } from 'react-router-dom';
import classes from './StoreToFollow.module.css';
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
  //  const { width, height } = useWindowSize();
 
  const dispatch = useDispatch();
    const { pathname } = useLocation();

  // useEffect(() => {
  //   dispatch(actions.initStoresToFollow());
  // }, [0]);

   const followError = useSelector((state) => state.store.error);
   const isAuthenticated = useSelector((state) => selectUserId(state));


  
  const setPath = () => {
      dispatch(actions.setAuthRedirectPath(pathname));
    };

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

      dispatch(actions.postStoreFollow(storeId, IsFollowing));
 
      setTimeout(() => { 
        if (!followError) {
          dispatch(actions.initStoresToFollow());
        }
      }, 1000);
    };
  
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
              className={list.following ? classes.btnGreenFollowing : classes.btnGreenUnFollowing}
              onClick={(e) => postStoreFollow(e, list.id)}
              to="/"
            >
              {list.following ? 'Following' : 'Follow'}
            </Link>
          ) : (
            <Link to="/sign-in" onClick={setPath}>
              <button className={classes.btnGreenUnFollowing}>Follow</button>
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
            <div className="  ">
              <Link to="/stores">
                <button className={'btnGreenStyle pull-right'}>View All</button>
              </Link>
            </div>
          </div>

          <div>
            <Swiper
              slidesPerView={'auto'}
              slidesPerGroup={1}
              spaceBetween={16}
              loop={false}
              navigation={ false}
              className="mySwiper"
              // breakpoints={{
              //   1050: {
              //     slidesPerView: 4,
              //     spaceBetween: 16,
              //   },
              //   1250: {
              //     slidesPerView: 5,
              //     spaceBetween: 16,
              //   },
              //   1450: {
              //     slidesPerView: 6,
              //     spaceBetween: 16,
              //   },
              //   1650: {
              //     slidesPerView: 7,
              //     spaceBetween: 16,
              //   },
              //   1800: {
              //     slidesPerView: 8,
              //     spaceBetween: 16,
              //   },
              // }}
            >
              {arrayListings?.map((list, i) => (
                <SwiperSlide className={classes.swiperSlide} key={Math.random()*7000000}>{list}</SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default StoresToFollow;

 