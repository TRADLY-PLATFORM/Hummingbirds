import React, { useEffect, useState } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link, useLocation } from 'react-router-dom';
import classes from './Header.module.css';
import profileUser from '../../assets/images/header/profile-user.png';

import { selectCategoryLists } from '../../store/selectors/product';
import Listings from '../../containers/Listings/Listings';
import axios from '../../axios';

//import CartImage from '../../assets/images/header/cart.svg';
import CartImage from '../../assets/images/header/active/cartIcon (1).svg';
import NoProductImage from '../../assets/images/rsz_noimage.png';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';
import downArrow from '../../assets/images/header/downArrow.png';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions/index"


import { Search } from '../Seacrh/Search';
import { selectUserId } from '../../store/selectors/auth';

// import Skeleton from '../UI/Skeleton/Skeleton';

const Header = (props) => {
 

  // reducer
    const isAuthenticated = useSelector((state) => selectUserId(state));
  const cartList = useSelector((state) => state.cart.cart_list);
  const { cart, cart_details } = cartList;
    const currencies = useSelector((state) => state.store.currencies);



  const dispatch = useDispatch()
  const {pathname,url} = useLocation()
  console.log('====================================');
  console.log(pathname);
  console.log('====================================');
 
  // 
     useEffect(() => {
      dispatch(actions.initCurrencies());
    }, [0]);

    useEffect(() => {
      if (isAuthenticated && currencies.length > 0) {
        dispatch(actions.getCartList(currencies[0],1));
      }
    }, [currencies || cartList]);

  const { userData } = props;
   function getUserName() {
    return userData.get('first_name', 'Guest') + ' ' + userData.get('last_name', '');
  }

  function getUserImage() {
    return userData.get('profile_pic', '');
  }

 


  const setPath = (pathname) => {
    dispatch(actions.setAuthRedirectPath(pathname, null));
  };

  return (
    <>
      <header className={classes.header}>
        <Search />
        <div className=" ">
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
              {userData.get('id', '') === '' ? (
                <Link className={classes.navLink} to="/sign-in" onClick={()=>setPath(pathname)}>
                  <i className="fa fa-power-off mr-10"></i>Login
                </Link>
              ) : (
                <Aux>
                  {/* <Link className={classes.navLink} to="#">
                      <i className="fa fa-user"></i> My Profile
                    </Link>
                    <Link className={classes.navLink} to="#">
                      <i className="fa fa-cog"></i> Settings
                    </Link> */}
                  <Link className={classes.navLink} to="/logout">
                    <i className="fa fa-power-off"></i> Logout
                  </Link>
                </Aux>
              )}
            </div>
          </div>

          

          <div className={pathname === '/cart' ? classes.cartAreaActive : classes.cartArea}>
            <Link  to={isAuthenticated?"/cart":"/sign-in"} onClick={!isAuthenticated &&(()=>setPath("/cart"))} >
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill={pathname === '/cart' ? 'var(--primary_color)' : '#959393'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.1712 11.7703L21.9768 3.64527C22.1072 3.05863 21.6712 2.5 21.083 2.5H6.08086L5.73077 0.749609C5.64354 0.31332 5.26816 0 4.83271 0H0.916667C0.410399 0 0 0.419727 0 0.9375V1.5625C0 2.08027 0.410399 2.5 0.916667 2.5H3.58581L6.26889 15.9154C5.627 16.293 5.19444 17.0009 5.19444 17.8125C5.19444 19.0206 6.15206 20 7.33333 20C8.51461 20 9.47222 19.0206 9.47222 17.8125C9.47222 17.2002 9.22598 16.6471 8.82964 16.25H16.837C16.4407 16.6471 16.1944 17.2002 16.1944 17.8125C16.1944 19.0206 17.1521 20 18.3333 20C19.5146 20 20.4722 19.0206 20.4722 17.8125C20.4722 16.9464 19.98 16.198 19.2661 15.8436L19.4768 14.8953C19.6072 14.3086 19.1712 13.75 18.5829 13.75H8.33086L8.08088 12.5H19.2774C19.7054 12.5 20.0764 12.1971 20.1712 11.7703Z" />
              </svg>

              <span className={classes.cartText}>Cart</span>
              {isAuthenticated && cart_details?.length>0 &&(<span className={classes.countCart}>{ cart_details?.length}</span>)}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;





