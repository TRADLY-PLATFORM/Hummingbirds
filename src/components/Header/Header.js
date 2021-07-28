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
          <div className="col-sm-6">
            <span className="glyphicon glyphicon-search form-control-feedback"></span>
            <input
              type="text"
              value={searchText}
              className="form-control input-lg"
              placeholder="Search Product"
              onChange={handleChange}
              onKeyPress={(e) => {
                handleKeypress(e);
              }}
            />
          </div>

          <div className="col-sm-6 ">
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
                    <Link className={classes.navLink} to="#">
                      <i className="fa fa-user"></i> My Profile
                    </Link>
                    <Link className={classes.navLink} to="#">
                      <i className="fa fa-cog"></i> Settings
                    </Link>
                    <Link className={classes.navLink} to="/logout">
                      <i className="fa fa-power-off"></i> Logout
                    </Link>
                  </Aux>
                )}
              </div>
            </div>

            <div className={classes.cartArea}>
              <Link to="/cart">
                <span className={classes.cartIcon}>
                  <i className="fa fa-shopping-cart mr-10"></i>
                </span>
                Cart
                <span className={classes.countCart}>0</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={classes.searchResultShowing}
          style={{ display: showSearchResult ? 'block' : 'none' }}
        >
          <button className={classes.closeBtn} onClick={backClick}>
            <i className="fa fa-arrow-left "></i> Back
          </button>

          <div>
            {searchResult.length != 0 ? (
              <div className={classes.find}>
                {searchResult.map((list, i) => {
                  let imagePath = NoProductImage;
                  if (list.images[0] !== undefined) {
                    imagePath = list.images[0];
                  }
                  return (
                    <Link
                      to={`/product-details/${list.id}/${list.title}`}
                      key={i}
                      style={{ textDecoration: 'none' }}
                      onClick={backClick}
                    >
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
                            <div>
                              <img
                                src={list.account.images[0]}
                                alt={list.account.name}
                                title={list.account.name}
                              />
                              <span>
                                {list.account.name.length < 15
                                  ? list.account.name
                                  : list.account.name.substring(0, 14) + '..'}
                              </span>
                            </div>
                          ) : (
                            <div>
                              <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                              <span>N/A</span>
                            </div>
                          )}

                          <div className={classes.amountTitle}>
                            {list.list_price.formatted !== undefined
                              ? list.list_price.formatted
                              : ''}
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className={classes.notFound}>
                Oops!! The product you searched for was not found
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
