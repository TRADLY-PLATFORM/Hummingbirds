import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Logo from '../../assets/images/logo.svg';
import classes from './Sidebar.module.css';

//import HomeLogo from '../../assets/images/sidebar/home.svg';
import HomeActiveLogo from '../../assets/images/sidebar/active/home.svg';
import WishlistLogo from '../../assets/images/sidebar/wishlist.svg';
import TransactionLogo from '../../assets/images/sidebar/transaction.svg';
import StoreLogo from '../../assets/images/sidebar/store.svg';
import GroupLogo from '../../assets/images/sidebar/group.svg';


const sidebar = () => {
    return (
        <Aux>
            <div className={classes.bgSidebar + " col-lg-2 sidenav hidden-xs nopadding" }>
                <br/>
                <div className={classes.logoImage}>
                    <img className="img-fluid" src={Logo} alt="Tradly" title="Tradly"/>
                </div>
                <ul className="nav nav-pills nav-stacked">
                <li className="active"><a href="#section1"><img className="img-fluid" src={HomeActiveLogo} alt="Home" title="Home"/><span>Home</span></a></li>
                <li><a href="#section2"><img className="img-fluid" src={WishlistLogo} alt="Home" title="Home"/><span>My Wishlist</span></a></li>
                <li><a href="#section3"><img className="img-fluid" src={TransactionLogo} alt="Home" title="Home"/><span>My Transaction</span></a></li>
                <li><a href="#section3"><img className="img-fluid" src={StoreLogo} alt="Home" title="Home"/><span>My Store</span></a></li>
                <li><a href="#section3"><img className="img-fluid" src={GroupLogo} alt="Home" title="Home"/><span>Group</span></a></li>
                </ul><br/>
            </div>
            <br/>
        </Aux>
    );
}

export default sidebar;