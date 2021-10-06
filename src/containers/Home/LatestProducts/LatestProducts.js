/* eslint-disable react/prop-types */
import React  from 'react';
  
import classes from './LatestProduct.module.css';
import NoIamgeLogo from '../../../assets/images/home/store/noImage.svg';
import { Link } from 'react-router-dom';
import NoProductImage from '../../../assets/images/rsz_noimage.png';
//  import useWindowSize from '../../../components/Hooks/WindowSize/WindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const LatestProducts = ({ products }) => {
  //  const { width, height } = useWindowSize();
  // const collections = useSelector((state) => state.home.collections);

 
  // const dispatch = useDispatch();
  // useEffect(() => {
  //    dispatch(actions.initLatestProducts());
  // }, [0])
  // const products = useSelector((state) => state.home.latestProducts);

  let arrayListings = [];
  let title = products.title;
  arrayListings = products?.listings?.map((list, i) => {
    let imagePath = NoProductImage;
    if (list.images[0] !== undefined) {
      imagePath = list.images[0];
    }

    return (
      <Link
      
        to={{
          pathname: `/l/${list.id}-${list.title.replace('%', '')}`,
          state: { prevPath: 'Home' },
        }}
        key={i}
        style={{ textDecoration: 'none' }}
      >
        <div className={classes.latestTrend}>
          <img src={imagePath} className={classes.storeImage} alt={list.title} title={list.title} />
          <p className={classes.listTitle}>
            {list.title.length < 20 ? list.title : list.title.substring(0, 20) + '..'}
          </p>
          <p className={classes.amountTitle}>
            {list.list_price.formatted !== undefined ? list.list_price.formatted : ''}
          </p>
          <div>
            {list.account !== undefined && list.account.images[0] ? (
              <div className={classes.bottomDesc}>
                <img
                  src={list.account.images[0]}
                  alt={list.account.name}
                  title={list.account.name}
                />
                <span>
                  {list.account.name.length < 17
                    ? list.account.name
                    : list.account.name.substring(0, 15) + '..'}
                </span>
              </div>
            ) : (
              <div className={classes.bottomDesc}>
                <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                <span>
                  {(list.account.name.length < 17
                    ? list.account.name
                    : list.account.name.substring(0, 15) + '..') || 'N/A'}
                </span>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </Link>
    );
  });

  return (
    <>
      {arrayListings?.length > 0 && (
        <div className={classes.latestProducts}>
          <div className={classes.latestProductsHeader}>
            <div className="  ">
              <h3 className={classes.headingTitle}>{title}</h3>
            </div>
            <div className="  ">
              <Link to="/listings">
                <button className={'btnGreenStyle pull-right'}>View All</button>
              </Link>
            </div>
          </div>
           <div >
            <Swiper
              slidesPerView={'auto'}
              slidesPerGroup={1}
              spaceBetween={16}
              loop={false}
               navigation={  false}
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
              //   1890: {
              //     slidesPerView: 8,
              //     spaceBetween: 16,
              //   },
              // }}
            >
              {arrayListings?.map((list, i) => (
                <SwiperSlide className={classes.swiperSlider} key={Math.random()*600000}>{list}</SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestProducts;
 