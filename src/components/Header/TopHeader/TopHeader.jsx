import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { selectUserId } from '../../../store/selectors/auth';
import classes from './TopHeader.module.css';
import * as actions from '../../../store/actions/index';
import downArrow from '../../../assets/images/header/downArrow.png';
import profileUser from '../../../assets/images/header/profile-user.png';
import { Search } from '../../Search/Search';
import MoreLogo from '../../../assets/images/home/category/more.svg';
import Categories from '../../../containers/Home/Categories/Categories';

const TopHeader = () => {
  const [categoriesSet, setCategoriesSet] = useState([]);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const subCategoryRef = useRef()

  //use Effect
  useEffect(() => {
    dispatch(actions.initCategoryLists());
    dispatch(actions.initCurrencies());
    dispatch(actions.getShippingMethod());

  }, [0]);




  // reducer
  const onboardingConfigs = useSelector((state) => state.auth.onboarding_configs);
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const cartList = useSelector((state) => state.cart.cart_list);
  const { cart_details } = cartList;
  const userDetails = useSelector((state) => state.auth.userDetails);
  const categories = useSelector((state) => state.product.categoryLists);
  const currencies = useSelector((state) => state.store.currencies);
  const shipping_methods = useSelector((state) => state.payment.shipping_methods);


  // function
  function getUserName() {
    return userDetails.first_name  || 'Guest';
  }

  function getUserImage() {
    return userDetails.profile_pic || '';
  }

  const setPath = (pathname) => {
    dispatch(actions.setAuthRedirectPath(pathname, null));
  };

  // 
    useEffect(() => {
      if (isAuthenticated && currencies.length > 0 && shipping_methods.length) {
        dispatch(actions.getCartList(currencies[0], shipping_methods[0].id));
      }
    }, [currencies || cartList]);

    useEffect(() => {
      if (isAuthenticated) {
        dispatch(actions.getUserDetails(isAuthenticated));
       }
    }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (Categories.length > 0) {
      if (categories.length < 9) {
        setCategoriesSet(categories);
      } else {
        const sliceLength = 9;
        let updatedCategories = categories.slice(0, sliceLength);
        let moreCategory = {
          id: Math.random(),
          name: 'More',
          image_path: MoreLogo,
          has_sub_category: true,
          link: 'all-categories',
        };
        updatedCategories.push(moreCategory);
        setCategoriesSet(updatedCategories);
      }
    }
  }, [categories]);
 
  // 
  // const categoryHover = () => {
  //   const sub_category_box = document.getElementById('subCategoryBox');
  //   sub_category_box.style.display ='block'
  // }
  // const deactivecategoryHover = () => {
  //   const sub_category_box = document.getElementById('subCategoryBox');
  //   sub_category_box.style.display ='none'
  // }

  return (
    <div className={classes.topHeaderBox}>
      <div className={classes.firstPart}>
        <div></div>
        <div>
          <div className={classes.logo}>
            <Link to="/home">
              {onboardingConfigs.splash_image !== '' ? (
                <img
                  className="img-fluid"
                  src={onboardingConfigs.splash_image}
                  style={{ width: '95px', height: '50px' }}
                  alt="Tradly"
                  title="Tradly"
                />
              ) : (
                'Loading...'
              )}
            </Link>
          </div>
        </div>
        <div className={classes.userPart}>
          <div>
            <Link
              onClick={!isAuthenticated && (() => setPath('/wishlist'))}
              to={isAuthenticated ? '/wishlist' : '/sign-in'}
              style={{
                display: 'flex ',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={pathname === '/wishlist' ? 'var(--primary_color)' : '#959393'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.6328 6.64689C21.3187 5.91948 20.8657 5.2603 20.2992 4.70627C19.7323 4.15058 19.064 3.70898 18.3305 3.40549C17.5699 3.08953 16.7541 2.92781 15.9305 2.9297C14.775 2.9297 13.6477 3.24611 12.668 3.84377C12.4336 3.98674 12.2109 4.14377 12 4.31486C11.7891 4.14377 11.5664 3.98674 11.332 3.84377C10.3523 3.24611 9.225 2.9297 8.06953 2.9297C7.2375 2.9297 6.43125 3.08908 5.66953 3.40549C4.93359 3.71017 4.27031 4.14845 3.70078 4.70627C3.13359 5.25968 2.6805 5.91901 2.36719 6.64689C2.04141 7.40392 1.875 8.20783 1.875 9.03517C1.875 9.81564 2.03438 10.6289 2.35078 11.4563C2.61563 12.1477 2.99531 12.8649 3.48047 13.5891C4.24922 14.7352 5.30625 15.9305 6.61875 17.1422C8.79375 19.1508 10.9477 20.5383 11.0391 20.5945L11.5945 20.9508C11.8406 21.1078 12.157 21.1078 12.4031 20.9508L12.9586 20.5945C13.05 20.536 15.2016 19.1508 17.3789 17.1422C18.6914 15.9305 19.7484 14.7352 20.5172 13.5891C21.0023 12.8649 21.3844 12.1477 21.6469 11.4563C21.9633 10.6289 22.1227 9.81564 22.1227 9.03517C22.125 8.20783 21.9586 7.40392 21.6328 6.64689Z" />
              </svg>
            </Link>
          </div>
          <div>
            {
              <Link
                onClick={!isAuthenticated && (() => setPath('/store'))}
                to={isAuthenticated ? '/store' : '/sign-in'}
                style={{
                  display: 'flex ',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={pathname === '/store' ? 'var(--primary_color)' : '#959393'}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.546 7.93789L19.4386 4.49805C19.2502 4.18926 18.9158 4 18.5586 4H5.44014C5.08296 4 4.7485 4.18926 4.56017 4.49805L2.45277 7.93789C1.36498 9.71426 2.32938 12.1846 4.36209 12.4668C4.50821 12.4867 4.65758 12.4967 4.80695 12.4967C5.7681 12.4967 6.61885 12.065 7.20334 11.3977C7.78782 12.065 8.64182 12.4967 9.59973 12.4967C10.5609 12.4967 11.4116 12.065 11.9961 11.3977C12.5806 12.065 13.4346 12.4967 14.3925 12.4967C15.3537 12.4967 16.2044 12.065 16.7889 11.3977C17.3766 12.065 18.2274 12.4967 19.1853 12.4967C19.3379 12.4967 19.484 12.4867 19.6301 12.4668C21.6693 12.1879 22.637 9.71758 21.546 7.93789ZM19.1918 13.5625C18.8671 13.5625 18.5456 13.5127 18.2339 13.4363V16.75H5.76486V13.4363C5.45313 13.5094 5.13166 13.5625 4.80695 13.5625C4.61212 13.5625 4.41404 13.5492 4.22246 13.5227C4.04062 13.4961 3.86203 13.4529 3.68993 13.4031V19.9375C3.68993 20.5252 4.15427 21 4.72902 21H19.2762C19.851 21 20.3153 20.5252 20.3153 19.9375V13.4031C20.1399 13.4563 19.9646 13.4994 19.7828 13.5227C19.5847 13.5492 19.3899 13.5625 19.1918 13.5625Z" />
                </svg>
              </Link>
            }
          </div>
          <div className={classes.cartArea}>
            <Link
              to={isAuthenticated ? '/cart' : '/sign-in'}
              onClick={!isAuthenticated && (() => setPath('/cart'))}
              style={{
                display: 'flex ',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 22 20"
                fill={pathname === '/cart' ? 'var(--primary_color)' : '#959393'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.1712 11.7703L21.9768 3.64527C22.1072 3.05863 21.6712 2.5 21.083 2.5H6.08086L5.73077 0.749609C5.64354 0.31332 5.26816 0 4.83271 0H0.916667C0.410399 0 0 0.419727 0 0.9375V1.5625C0 2.08027 0.410399 2.5 0.916667 2.5H3.58581L6.26889 15.9154C5.627 16.293 5.19444 17.0009 5.19444 17.8125C5.19444 19.0206 6.15206 20 7.33333 20C8.51461 20 9.47222 19.0206 9.47222 17.8125C9.47222 17.2002 9.22598 16.6471 8.82964 16.25H16.837C16.4407 16.6471 16.1944 17.2002 16.1944 17.8125C16.1944 19.0206 17.1521 20 18.3333 20C19.5146 20 20.4722 19.0206 20.4722 17.8125C20.4722 16.9464 19.98 16.198 19.2661 15.8436L19.4768 14.8953C19.6072 14.3086 19.1712 13.75 18.5829 13.75H8.33086L8.08088 12.5H19.2774C19.7054 12.5 20.0764 12.1971 20.1712 11.7703Z" />
              </svg>

              {isAuthenticated && cart_details?.length > 0 && (
                <span className={classes.countCart}>{cart_details?.length}</span>
              )}
            </Link>
          </div>
          <div className={classes.userArea + ' dropdown'}>
            <Link
              to="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className={classes.userProfile}
            >
              <img
                className={classes.userAvatar}
                src={getUserImage() !== '' ? getUserImage() : profileUser}
                alt="User Avatar"
              />
              <span className={classes.spanName}>{getUserName()}</span>
              <img src={downArrow} className={classes.downArrow} alt="" />
            </Link>

            <div className={classes.dropdownMenu + ' user-menu dropdown-menu'}>
              {isAuthenticated ? (
                <div>
                  <Link
                    className={classes.navLink}
                    to={isAuthenticated ? '/profile' : '/sign-in'}
                   >
                    <i className="fa fa-user"></i> My Profile
                  </Link>
                  <Link className={classes.navLink} to="/logout">
                    <i className="fa fa-power-off"></i> Logout
                  </Link>
                </div>
              ) : (
                <Link className={classes.navLink} to="/sign-in" onClick={() => setPath(pathname)}>
                  <i className="fa fa-power-off mr-10"></i>Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.secondPart}>
        <div className={classes.categories}>
          {categoriesSet?.length > 0 &&
            categoriesSet?.map((category) => {
              let categoryName = category.name.replace(/\//g, '@');

              return (
                <>
                  <Link
                    // onMouseOver={categoryHover}
                    // onMouseOut={deactivecategoryHover}
                    to={
                      categoryName === 'More' ? '/categories' : `/lc/${category.id}-${categoryName}`
                    }
                    key={Math.random() * 300000}
                    className={classes.categoryBox}
                  >
                   
                      {category.name.length < 9
                        ? category.name
                        : category.name.substring(0, 6) + '..'}
                     
                  </Link>
                </>
              );
            })}
        </div>

        <div>
          <Search />
        </div>
      </div>
      {/* <div id="subCategoryBox" className={classes.subCategoryBox}>
        <ul>
          <li>Ahsan</li>
        </ul>
        { 
            <ul>
              {category.sub_category.map((sub_category) => {
                return <li key={Math.random()}>{sub_category.name}</li>;
              })}
            </ul>
         }
      </div> */}
    </div>
  );
};

export default TopHeader;
