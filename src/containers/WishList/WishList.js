import React, { useEffect } from 'react';
import classes from './WishList.module.css';
import * as actions from '../../store/actions/index';
 import { useDispatch, useSelector } from 'react-redux';
import NoIamgeLogo from '../../assets/images/home/store/noImage.svg';
import NoProductImage from '../../assets/images/rsz_noimage.png';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const WishList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getWishlist());
  }, [0]);
  const wishList = useSelector((state) => state.wishList.wishLists );
  const loading = useSelector((state) => state.wishList.loading );
   return (
     <div className={classes.wishListsBox}>
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
         {loading ? (
           <div className={classes.Backdrop}><Loader
             type="ThreeDots"
             color="var(--primary_color)"
             height={100}
             width={100}
             style={{
               position: 'absolute',
               right: 0,
               height: '100vh',
               width: '100%',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               zIndex: '500',
             }}
           /></div>
           
         ) : wishList.length && wishList?.length > 0 ? (
           <div className={classes.wishList}>
             {wishList.map((list, i) => {
               let productImage = NoProductImage;
               if (list.images[0] !== undefined) {
                 productImage = list.images[0];
               }
               let storelogo = list.account.images[0];
               let price = list.list_price.formatted !== undefined ? list.list_price.formatted : '';
               return (
                 <Link
                   to={`/l/${list.id}-${list.title}`}
                   key={i}
                   style={{ textDecoration: 'none' }}
                 >
                   <div className={''}>
                     <div className={classes.latestTrend}>
                       <img
                         src={productImage}
                         className={classes.storeImage}
                         alt="Woman accesories"
                         title="Woman accesories"
                       />
                       <p className={classes.storeTitle}>{list.title}</p>
                       <div className={classes.bottomDesc}>
                         <img
                           src={storelogo || NoIamgeLogo}
                           alt="Woman accesories"
                           title="Woman accesories"
                         />{' '}
                         <p className={classes.storeName}>
                           {list.account.name.length < 9
                             ? list.account.name
                             : list.account.name.substring(0, 7) + '..'}
                         </p>
                         <p className={classes.amountTitle}>{price}</p>
                       </div>
                     </div>
                   </div>
                 </Link>
               );
             })}
           </div>
         ) : (
           <div
             style={{ marginTop: '2em' }}
             className="alert  alert-info fade in alert-dismissible"
           >
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
