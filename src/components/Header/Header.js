import React, { useState } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import profileUser from '../../assets/images/header/profile-user.png';

import { selectCategoryLists } from '../../store/selectors/product';
import Listings from '../../containers/Listings/Listings';
import axios from '../../axios';

//import CartImage from '../../assets/images/header/cart.svg';
import CartImage from '../../assets/images/header/cart.svg';
import NoProductImage from '../../assets/images/rsz_noimage.png';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';
import { Search } from '../Seacrh/Search';

// import Skeleton from '../UI/Skeleton/Skeleton';

const Header = (props) => {
  const [searchText, setSearchText] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      axios.get('/products/v1/listings?page=1&search_key=' + searchText).then(function (response) {
        // handle success
        setShowSearchResult(true);
        setSearchResult(response.data.data.listings);
        console.log(response.data.data.listings);
      });
    }
  };

  const { userData } = props;
  console.log(' ', userData);
  function getUserName() {
    return userData.get('first_name', 'Guests') + ' ' + userData.get('last_name', '');
  }

  function getUserImage() {
    return userData.get('profile_pic', '');
  }

  const backClick = () => {
    setSearchText('');
    setShowSearchResult(false);
  };

  return (
    <>
      <header className={classes.header}>
        <div className="header-menu">
          <Search/>

          <div className="col-sm-6  hidden-xs">
            <div className={classes.userArea + ' dropdown'}>
              <Link
                to="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className={classes.userAvatar}
                  src={getUserImage() !== '' ? getUserImage() : profileUser}
                  alt="User Avatar"
                />
                <span className={classes.spanName}>{getUserName()}</span>
              </Link>

              <div className={classes.dropdownMenu + ' user-menu dropdown-menu'}>
                {userData.get('id', '') === '' ? (
                  <Link className={classes.navLink} to="/sign-in">
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

            {/* <div className={classes.cartArea}>
              <Link to="/cart">
                <span className={classes.cartIcon}>
                  <i className="fa fa-shopping-cart mr-10"></i>
                </span>
                Cart
                <span className={classes.countCart}>0</span>
              </Link>
            </div> */}
          </div>
        </div>
        
      </header>
    </>
  );
};
export default Header;
