import React from 'react';
//import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import AvatarImage from '../../assets/images/header/avatar.jpg';
import CartImage from '../../assets/images/header/cart.svg';

const header = () => {
    return (
        <header className={classes.header}>

            <div className="header-menu">
                <div className="col-sm-6">
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                    <input type="text" className="form-control input-lg" placeholder="Search Product"/>                      
                </div>

                <div className="col-sm-6">
                    <div className={classes.userArea + " dropdown"}>
                        <Link to="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className= { classes.userAvatar } src={AvatarImage} alt="User Avatar"/>
                            <span className={ classes.spanName}>Siddiq</span>
                        </Link>

                        <div className={classes.dropdownMenu + " user-menu dropdown-menu"}>
                                <Link className={classes.navLink} to="#"><i className="fa fa- user"></i>My Profile</Link>

                                <Link className={classes.navLink} to="#"><i className="fa fa -cog"></i>Settings</Link> 

                                <Link className={classes.navLink} to="/logout"><i className="fa fa-power -off"></i>Logout</Link>
                        </div>
                    </div>

                    <div className={classes.cartArea}>
                   
                        <Link to="#">
                            <div>
                                <img className= { classes.cartImage } src={CartImage} alt="Cart"/>
                                <span className={ classes.countCart }>5</span>
                                {/* <span className={ classes.cartName}>Cart</span> */}
                            </div>
                            
                        </Link>
                    </div>

                   

                </div>
            </div>

        </header>
    );
}

export default header;