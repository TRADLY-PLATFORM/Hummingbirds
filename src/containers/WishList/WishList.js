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
      <div className="">
        <div>
          <h2 className={classes.pageTitle}>My Wishlist </h2>
        </div>

        <div className="">
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

      <div className="">
        {wishList.length > 0 ? (
          <div className={classes.wishList}>
            {wishList.map((list, i) => {
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
                  <div className={''}>
                    <div className={classes.latestTrend}>
                      <img
                        src={productImage}
                        className={classes.storeImage}
                        alt="Woman accesories"
                        title="Woman accesories"
                      />
                      <p>{list.title}</p>
                      <div className={classes.bottomDesc}>
                        <img
                          src={storelogo || NoIamgeLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />{' '}
                        <span>
                          {' '}
                          {list.account.name.length < 10
                            ? list.account.name
                            : list.account.name.substring(0, 8) + '..'}
                        </span>
                        <p className={classes.amountTitle}>{price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ marginTop: '2em' }} className="alert  alert-info fade in alert-dismissible">
            <Link to="#" className="close" data-dismiss="alert" aria-label="close" title="close">
              ×
            </Link>
            You haven't added an item to wishlist
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
