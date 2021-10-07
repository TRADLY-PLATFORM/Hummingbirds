import React, { useEffect } from 'react';
import classes from './MyProfile.module.css';
import AvatarImage from '../../assets/images/header/profile-user.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/auth';
import * as actions from '../../store/actions/index';

const MyProfile = () => {
  // reducer
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const userDetails = useSelector((state) => state.auth.userDetails);
  const storeLists = useSelector((state) => state.store.storeLists);


  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actions.getUserDetails(isAuthenticated));
      dispatch(actions.userStoreLists(isAuthenticated));

    }
  }, [dispatch, isAuthenticated]);

   function getUserImage() {
     return userDetails.profile_pic || '';
   }

  return (
    <div className="container mt-4">
      <div className={classes.Mycontainer}>
        <div className={classes.profileBox}>
          <div className="col ">
            <img
              className={classes.userAvatar}
              src={getUserImage() !== '' ? getUserImage() : AvatarImage}
              alt="User Avatar"
            />
          </div>
          <div className="col ">
            <span className={classes.accountName}>
              {userDetails?.first_name + ' ' + userDetails?.last_name}
            </span>
            <br />
            <span>{userDetails?.email} </span>
          </div>
          <div>
            <div className="">
              <Link to="#">
                <button className={classes.btnGreenStyle}>Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Mycontainer}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Link className="textDecorationOff" to="/store">
              My store
            </Link>
            {storeLists.length === 0 && (
              <Link tp="/create-store" className={classes.button}>
                Create Store
              </Link>
            )}
            <hr />
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12">
            <Link className="textDecorationOff" to="/myorder">
              My Orders
            </Link>
            <hr />
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12">
            <p>My sales</p>
            <hr />
          </div>

          {storeLists.length > 0 && (
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Link className="textDecorationOff" to="/payment">
                Payment
              </Link>
              <hr />
            </div>
          )}

          {/* <div className="col-lg-12 col-md-12 col-sm-12">
            <p>Feedback</p>
            <hr />
          </div> */}
          {/* 
          <div className="col-lg-12 col-md-12 col-sm-12">
            <p>Refer a friend</p>
            <hr />
          </div> */}

          <div className="col-lg-12 col-md-12 col-sm-12">
            <p>Terms & conditions</p>
            <hr />
          </div>

          <div className="ccol-lg-12 col-md-12 col-sm-12">
            <p>Support</p>
            <hr />
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12">
            <Link to="/logout">
              <button className={classes.logout}>Log out</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
