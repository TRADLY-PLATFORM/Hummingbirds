import React, { Component } from 'react'
import classes from "./EditProfile.module.css"
import{Link} from "react-router-dom";
import AvatarImage from '../../assets/images/header/avatar.jpg';


export default class EditProfile extends Component {
    render() {
        return (
            <div className="row">
                <Link to="/profile">
                <button className={classes.button}><i className="fa fa-arrow-left "></i> back to profile</button>
                 </Link>

            
                <div className={classes.editProfile}>
                 <div className={classes.profilecard }>
              <div className="row">
                  <div className="p-2">
                    <img
                      className={classes.userAvatar}
                      src={AvatarImage}
                      alt="User Avatar"
                    />
                  </div>
                
                  <div className="p-2">
                    <Link to="#">
                      <button className={classes.button}>
                        Change photo
                      </button>
                    </Link>
           
                  </div>

                  
              </div>
            </div>
                    <div className={classes.changeinfo }>                  
                      < div className = "form-group  mt-2" >
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Full Name"/>  
                      </div>
                  
 
                        <div className="form-group mt-2">
                            <input className={classes.input + " form-control input-lg "} type="tel" placeholder="Mobile Number"/>
                        
                        </div>
                       
                    <div className = "">
                     <button className={classes.btnGreenStyle}> Save Change </button>
                      </div>
                    </div>
                    </div>
           <br/>

           <div className={classes.editProfile}>
                    <div className={classes.changepassword }>
                        <div className="form-group mt-2 ">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Old Password"/>
                        </div>

                        <div className="form-group mt-2 ">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Password"/>
                        </div>

                        <div className="form-group mt-2">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Re Type Password"/>
                        </div>

                    <div className = "">
                     <button className={classes.btnGreenStyle}>
                        Save Change
                      </button>
                      </div>
                      
                    </div>
                    </div>
                </div>
        )
    }
}
