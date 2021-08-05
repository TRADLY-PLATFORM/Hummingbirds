import React, { useEffect } from 'react';
import classes from './WishList.module.css';
import * as actions from '../../store/actions/index';
import StoreLogo from '../../assets/images/home/store/store1.svg';
import StoreLogo2 from '../../assets/images/home/store/store2.svg';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import { useDispatch, useSelector } from 'react-redux';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';
import NoProductImage from '../../assets/images/rsz_noimage.png';
import { Link } from 'react-router-dom';

const WishList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getWishlist());
  }, []);
  const wishList = useSelector((state) => state.wishList.wishLists || []);
  console.log(wishList);
  return (
    <div>
      <div className="row">
        <div className={classes.pageTitle + ' col-md-5 '}>
          <h2 className={classes.pageTitle}>My Wishlist </h2>
        </div>

        <div className="col-md-2">
          {/* <div className={classes.SortbyMenu + ' dropdown'}>
            <button
              className={classes.SortbyMenu + ' dropdown-toggle '}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort by
              <span className="caret"></span>
            </button>
            <ul className=" dropdown-menu ">
              <li>
                <a href="/#">A</a>
              </li>
              <li>
                <a href="/#">B</a>
              </li>
              <li>
                <a href="/#">C</a>
              </li>
            </ul>
          </div> */}
        </div>

        {/* <div className="col-md-5 col-sm-12 col-xs-12">
          <span className="glyphicon glyphicon-search form-control-feedback"></span>
          <input type="text" className="form-control input-lg" placeholder="Search My Wishlist" />
        </div> */}
      </div>

      <div className="row">
        <div className={classes.wishList + 'container-fluid mt-5'}>
          {wishList &&
            wishList.map((list, i) => {
              let productImage = NoProductImage;
              if (list.images[0] !== undefined) {
                productImage = list.images[0];
              }
              let title = list.title;
              let storelogo = list.account.images[0];
              let storeName = list.account.name;
              let price = list.list_price.formatted !== undefined ? list.list_price.formatted : '';
              console.log(storeName);
              return (
                <Link to={`/l/${list.id}-${list.title}`} key={i} style={{ textDecoration: 'none' }}>
                  <div className={'col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 '}>
                    <div className={classes.latestTrend}>
                      <img
                        src={productImage}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>{title}</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={storelogo || NoIamgeLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{' '}
                        <span>
                          {' '}
                          {list.account.name.length < 15
                            ? list.account.name
                            : list.account.name.substring(0, 14) + '..'}
                        </span>
                        <div className={classes.amountTitle}>{price}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WishList;
