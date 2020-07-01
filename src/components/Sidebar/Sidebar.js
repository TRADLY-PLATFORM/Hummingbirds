import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import Logo from '../../assets/images/logo.svg';
import classes from './Sidebar.module.css';
import { Link, Redirect } from 'react-router-dom';
//import HomeLogo from '../../assets/images/sidebar/home.svg';
import HomeActiveLogo from '../../assets/images/sidebar/active/home.svg';
import WishlistLogo from '../../assets/images/sidebar/wishlist.svg';
import TransactionLogo from '../../assets/images/sidebar/transaction.svg';
import StoreLogo from '../../assets/images/sidebar/store.svg';
import GroupLogo from '../../assets/images/sidebar/group.svg';
import * as actions from '../../store/actions/index';

class Sidebar extends Component{
    
    state = {
        redirect : false,
        loadOnce : true,
        logo : Logo
    }
    authRedirectHandler = (path) => {
       this.props.onSetAuthRedirectPath(path); 
       this.setState({redirect:true})
     
    }

  

    componentWillUpdate(){
        let logo_path = localStorage.getItem('logo_path');
        if(logo_path !== '' && this.state.loadOnce){
            this.setState({logo:logo_path,loadOnce:false});
        }
    }

    render(){

        let storeLogo =  this.state.logo;
        
        let redirectUrl = null;
        if(this.state.redirect){
            redirectUrl = <Redirect to="/sign-in"/>
        }

        return (
            <Aux>
                {redirectUrl}
                <div className={classes.bgSidebar + " col-lg-2 sidenav hidden-xs nopadding" }>
                    <br/>
                    <div className={classes.logoImage}>
                        <Link to="/home"><img className="img-fluid" src={storeLogo} style={{width:'145px'}} alt="Tradly" title="Tradly"/></Link>
                    </div>
                    <ul className="nav nav-pills nav-stacked">
                    <li className="active"><Link to="/home"><img className="img-fluid" src={HomeActiveLogo} alt="Home" title="Home"/><span>Home</span></Link></li>
                    <li><Link to="/wishlist"><img className="img-fluid" src={WishlistLogo} alt="Home" title="Home"/><span>My Wishlist</span></Link></li>
                    <li className=""><Link to="/Listings"><img className="img-fluid" src={HomeActiveLogo} alt="Home" title="Home"/><span>Listings</span></Link></li>
                    <li><Link to="/mytransaction"><img className="img-fluid" src={TransactionLogo} alt="Home" title="Home"/><span>My Transaction</span></Link></li>
                    <li>
                        { (!this.props.isAuthentication) ? <Link to="#" onClick={(path) => this.authRedirectHandler('/store')}><img className="img-fluid" src={StoreLogo} alt="Home" title="Home"/><span>My Store</span></Link> :
                        <Link to="/store"><img className="img-fluid" src={StoreLogo} alt="Home" title="Home"/><span>My Store</span></Link> }
                    </li>
                    <li><Link to="/group"><img className="img-fluid" src={GroupLogo} alt="Home" title="Home"/><span>Group</span></Link></li>
                    </ul><br/>
                </div>
                <br/>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path,null))
    }
}

  
export default connect(null,mapDispatchToProps)( Sidebar );