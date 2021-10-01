import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../store/selectors/auth';
import classes from './Store.module.css';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import noStoreLogo from '../../../assets/images/store/noStore.svg';
import noProductLogo from '../../../assets/images/store/noProduct.svg';
import NoProductImage from '../../../assets/images/rsz_noimage.png';
import NoIamgeLogo from '../../../assets/images/home/store/noImage.svg';

import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AllenSollyLogo from '../../../assets/images/home/store/allenSolly.svg';
import StoreBanner from '../../../assets/images/store/store.svg';
import { totalCountOfProducts } from '../../../shared/constants';

const Store = () => {
  const [accountId, setAccountId] = useState(null);
  const dispatch = useDispatch();

  // reducer
  const loading = useSelector((state) => state.store.loading);
  const storeDetails = useSelector((state) => state.store.storeDetails);
  const storeLists = useSelector((state) => state.store.storeLists);
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const authRedirectPath = useSelector((state) => state.auth.authRedirectPath);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const listings = useSelector((state) => state.product.listings);

  // useEffect:
  useEffect(() => {
       dispatch(actions.userStoreLists(isAuthenticated));
   }, [isAuthenticated]);

  useEffect(() => {
       if (storeLists.length > 0) {
        const filter = '&account_id=' + storeLists[0].id;
        dispatch(actions.initListings(0, filter, totalCountOfProducts));
      }
   }, [storeLists]);

  let storeContent = null;
  if (isAuthenticated && storeLists) {
    if (storeLists.length > 0) {
      storeContent = (
        <React.Fragment>
          {storeLists.map((list, i) => {
            let imagePath = AllenSollyLogo;
            let description = list.description;
            if (description.size > 35) {
              description = description.substring(0, 35) + '...';
            }
            let storeName = list.name;
            let storeOwner = list.user.first_name;
            return (
              <div className=" " key={i}>
                <div>
                  <div className={classes.storeBanner}></div>
                  <div className={classes.storeHeader}>
                    <div className={classes.bannerText + ' col-sm-12'}>
                      <div className={classes.fashionStore}>
                        <div>
                          {list.images[0] ? (
                            <img src={list.images[0]} alt={storeName} title={storeName} />
                          ) : (
                            <img src={AllenSollyLogo} alt={storeName} title={storeName} />
                          )}
                        </div>

                        <div className={classes.fashionStoreNameBox}>
                          <h3>{storeName}</h3>
                          <span>@{storeOwner}</span>
                        </div>
                      </div>
                      <div className={classes.followBtn}>
                        <Link
                          to={{
                            pathname: '/edit-store',
                          }}
                          className="btnGreenStyle  "
                        >
                          Edit Store
                        </Link>
                        <Link
                          to={{
                            pathname: '/storeorders',
                            search: `account_id=${storeLists[0].id}`,
                          }}
                          className="btnGreenStyle  "
                        >
                          Store Orders
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {listings?.length > 0 ? (
                    <div className={classes.myStoreProducts}>
                      <Link to={`/addproduct/${list.id}`}>
                        <button className="btnGreenStyle pull-right">Add a product </button>
                      </Link>
                      <div className={classes.find}>
                        {listings?.map((list) => {
                          let imagePath = NoProductImage;
                          if (list.images[0] !== undefined) {
                            imagePath = list.images[0];
                          }
                          return (
                            <Link
                              to={list.active && `/l/${list.id}-${list.title}`}
                              key={i}
                              style={{ textDecoration: 'none', position: 'relative' }}
                            >
                              <div className={classes.latestTrend}>
                                <img
                                  src={imagePath}
                                  className={classes.productImage}
                                  alt={list.title}
                                  title={list.title}
                                />
                                <p className={classes.storeTitle}>{list.title}</p>
                                <div className={classes.bottomDesc}>
                                  {list.account !== undefined && list.account.images[0] ? (
                                    <>
                                      <img
                                        src={list.account.images[0]}
                                        alt={list.account.name}
                                        title={list.account.name}
                                      />
                                      <span>
                                        {list.account.name.length < 10
                                          ? list.account.name
                                          : list.account.name.substring(0, 10) + '..'}
                                      </span>
                                      <p className={classes.amountTitle}>
                                        {list.list_price.formatted !== undefined
                                          ? list.list_price.formatted
                                          : ''}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <img src={NoIamgeLogo} alt={list.title} title={list.title} />
                                      <span>N/A</span>
                                      <p className={classes.amountTitle}>
                                        {list.list_price.formatted !== undefined
                                          ? list.list_price.formatted
                                          : ''}
                                      </p>
                                    </>
                                  )}
                                </div>
                                {list.active === false && (
                                  <p className={classes.produtDontActive}>Under Review</p>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className={classes.noListingBox}>
                      <h3>You don't have a product</h3>
                      <Link to={`/addproduct/${list.id}`}>
                        <button className="btnGreenStyle">Add a product </button>
                      </Link>
                      <img src={noProductLogo} alt="" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </React.Fragment>
      );
    } else {
      storeContent = (
        <Aux>
          <div className={classes.noStore + ' container-fluid'}>
            <div className="col-lg-12">You don&apos;t have a store</div>
            <div>
              <Link to="/create-store">
                <button className={'btnGreenStyle'}>Create Store</button>
              </Link>
            </div>

            <img src={noStoreLogo} alt="Create Store" title="Create Store" />
          </div>
        </Aux>
      );
    }
  }
  let redirectUrl = null;
  return (
    <Aux>
      {redirectUrl}
      <Backdrop show={loading} />
      <Spinner show={loading} />
      {storeContent}

      <br />
      <br />
      <br />
    </Aux>
  );
};

export default Store;
