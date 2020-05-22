import React, { Component } from 'react'
import classes from "./MyProfile.module.css"
import AvatarImage from '../../assets/images/header/avatar.jpg';
import {Link} from "react-router-dom";

export default class MyProfile extends Component {
    render() {
        return (
          <div class="container ">
            <div className={classes.mycontainer}>
              <div className="row">
                <div class="col-md-1 col-lg-1 col-sm-1 col-sx-1">
                  <img
                    className={classes.userAvatar}
                    src={AvatarImage}
                    alt="User Avatar"
                  />
                </div>
                <div className="col-md-8 col-lg-8 col-sm-1 col-sx-1">
                  <span>Name</span>
                  <br />
                  <span>+1 1111111</span>
                </div>
                <div>
                  <div className="">
                    <Link to="/editprofile">
                      <button className={classes.btnGreenStyle}>
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className={classes.mycontainer}>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <span>my store</span>
                  <button className={classes.button}>Add Store</button>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>my union</p>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>my transaction</p>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>my sales</p>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>payment</p>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>movement planner</p>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>languge & currency</p>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>feedback</p>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>Refer a friend</p>
                  <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p>terms & conditions</p>
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
    }
}
