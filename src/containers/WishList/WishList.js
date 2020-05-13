import React, { Component } from 'react'
import classes from './WishList.module.css';

export default class WishList extends Component {
    render() {
        return (
                 
           
             <div className="row">
            <div className={classes.pageTitle + " col-md-6 "}>
                          <h2 className={classes.pageTitle}>My Wishlist </h2>
            </div>  

            
            <div className = "col-md-2 col-sm-2 col-sx-2" >
                          <div className = {classes.SortbyMenu + " dropdown" }>
                             <button className= {classes.SortbyMenu + " dropdown-toggle "} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             Sort by
                             <span className="caret"></span></button>
                          <ul className=" dropdown-menu ">
                                <li><a href="/#">A</a></li>
                                <li><a href="/#">B</a></li>
                                <li><a href="/#">C</a></li>
                          </ul>
                          </div>
            
             </div>
            <div className="col-md-4">
                  <span className=" glyphicon glyphicon-search form-control-feedback"></span>
                 <input type="text" className= "form-control input-lg" placeholder="Search My Wishlist"/>   
            </div>
        
           
        <div className="row col-md-12">
        
                        <div className="col-lg-2 col-md-2">
                        <div className="row">

                        <div className={classes.wishListItem}>
                        <img src={Image} alt="itemphoto" title="itemphoto"/>
                        <p>item name</p>
                        <span className="float-right">store name</span>
                        <span className="float-left">$</span>
                        </div>
                        </div>
                    </div>
                      
                         <div className="col-lg-2 col-md-2">
                        <div className="row">

                        <div className={classes.wishListItem}>
                        <img src={Image} alt="itemphoto" title="itemphoto"/>
                        <p>item name</p>
                        <span className="float-right">store name</span>
                        <span className="float-left">$</span>
                        </div>
                        </div>
                        </div> 

                         <div className="col-lg-2 col-md-2">
                        <div className="row">

                        <div className={classes.wishListItem}>
                        <img src={Image} alt="itemphoto" title="itemphoto"/>
                        <p>item name</p>
                        <span className="float-right">store name</span>
                        <span className="float-left">$</span>
                        </div>
                        </div>
                        </div> 

                        <div className="col-lg-2 col-md-2">
                        <div className="row">

                        <div className={classes.wishListItem}>
                        <img src={Image} alt="itemphoto" title="itemphoto"/>
                        <p>item name</p>
                        <span className="float-right">store name</span>
                        <span className="float-left">$</span>
                        </div>
                        </div>
                        </div>         

                        <div className="col-lg-2 col-md-2">
                        <div className="row">

                        <div className={classes.wishListItem}>
                        <img src={Image} alt="itemphoto" title="itemphoto"/>
                        <p>item name</p>
                        <span className="float-right">store name</span>
                        <span className="float-left">$</span>
                        </div>
                        </div>
                        </div>       
                        
                        <div className="col-lg-2 col-md-2">
                        <div className="row">

                        <div className={classes.wishListItem}>
                        <img src={Image} alt="itemphoto" title="itemphoto"/>
                        <p>item name</p>
                        <span className="float-right">store name</span>
                        <span className="float-left">$</span>
                        </div>
                        </div>
                        </div>                  

                        <div className="col-lg-2 col-md-2">
                        <div className="row">

                        <div className={classes.wishListItem}>
                        <img src={Image} alt="itemphoto" title="itemphoto"/>
                        <p>item name</p>
                        <span className="float-right">store name</span>
                        <span className="float-left">$</span>
                        </div>
                        </div>
                        </div>        
 
        </div>                
</div>

        )
    }
}


