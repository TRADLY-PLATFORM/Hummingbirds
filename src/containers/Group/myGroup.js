import React, { Component } from 'react';
import classes from './myGroup.module.css';

import Groupcategory from '../../assets/images/Group/Groupcategory.svg';
import toystorecommunity from '../../assets/images/Group/toystorecommunity.svg';
import devicestore from '../../assets/images/Group/devicestore.svg';
import adventure from '../../assets/images/Group/adventure.svg';
import coffee from '../../assets/images/Group/coffee.svg';
import womengroup from '../../assets/images/Group/womengroup.svg';

export default class myGroup extends Component {
    render() {
        return (
            <div>
                <div className="row">
            <div className="col-md-5">
                          <div className ="text-center"><button className={classes.btnGreenStyle}> + Create Group</button>
                      </div>
            </div>  

            
            <div className = "col-md-2" >
                          <div className = {classes.categoryMenu + " dropdown" }>
                             <button className= {classes.categoryMenu + " dropdown-toggle "} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             Category
                             <span className="caret"></span></button>
                          <ul className=" dropdown-menu ">
                                <li><a href="/#">A</a></li>
                                <li><a href="/#">B</a></li>
                                <li><a href="/#">C</a></li>
                          </ul>
                          </div>
            
             </div>

            <div className="col-md-5 col-sm-12 col-xs-12">
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                    <input type="text" className="form-control input-lg" placeholder="Search Group"/>                      
                </div>
        </div> 

        <br />

        <div className={classes.popularGroup + " row "}>
                        <div className={classes.pageTitle + " col-md-6 "}>
                          <h2 className={classes.pageTitle}>Popular Group </h2>
                        </div>            
                        <div className="col-md-6">
                         <div className={classes.viewBtn + " text-center "}>
                            <button className={classes.btnGreenStyle}> view all</button>
                        </div>
                      </div>
            </div>


             <div className="row">
                 <div className="container-fluid mt-5">
                     <div className="row">
                        <div className={"col-md-8th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "}> 
                            <div className={classes.latestTrend}>
                                <img src={Groupcategory} className={classes.groupImage} alt="Fashion store" title="fashion store"/>
                                <p className={classes.groupTitel}>Fashion Store</p>
                                <div className={classes.bottomDesc}>
                                    <span className={classes.memberNumber}> 876 member</span>
                                    <div className={classes.joinGroup}>
                                        <button className={classes.btnGreenStyle}> Join Group</button></div>
                                </div>                 
                            </div>                  
                        </div>

                        <div className={"col-md-8th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                                <img src={toystorecommunity} className={classes.groupImage} alt="Toy store community" title="Toy store community"/>
                                <p className={classes.groupTitel}>Toy Store Community</p>
                                <div className={classes.bottomDesc}>
                                    <span className={classes.memberNumber}> 876 member</span>
                                    <div className={classes.joinGroup}>
                                        <button className={classes.btnGreenStyle}> Join Group</button></div>
                                </div>                                 
                            </div>                  
                        </div>

                        <div className={"col-md-8th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                                <img src={devicestore} className={classes.groupImage} alt="Device store" title="Device store"/>
                                <p className={classes.groupTitel}>Device Store</p>
                                <div className={classes.bottomDesc}>
                                    <span className={classes.memberNumber}> 876 member</span>
                                    <div className={classes.joinGroup}>
                                        <button className={classes.btnGreenStyle}> Join Group</button></div>
                                </div>                                 
                            </div>                  
                        </div>

                          
                     </div>

                 </div>
            </div>
<br />

        <div className={classes.popularGroup + " row "}>
                        <div className={classes.pageTitle + " col-md-6 "}>
                          <h2 className={classes.pageTitle}>Newest Group </h2>
                        </div>            
                        <div className="col-md-6">
                         <div className={classes.viewBtn + " text-center "}>
                            <button className={classes.btnGreenStyle}> view all</button>
                        </div>
                      </div>
            </div>


             <div className="row">
                 <div className="container-fluid mt-5">
                     <div className="row">
                        <div className={"col-md-8th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "}> 
                            <div className={classes.latestTrend}>
                                <img src={adventure} className={classes.groupImage} alt="adventure" title="adventure"/>
                                <p className={classes.groupTitel}>Adventure</p>
                                <div className={classes.bottomDesc}>
                                    <span className={classes.memberNumber}> 876 member</span>
                                    <div className={classes.joinGroup}>
                                        <button className={classes.btnGreenStyle}> Join Group</button></div>
                                </div>                 
                            </div>                  
                        </div>

                        <div className={"col-md-8th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                                <img src={coffee} className={classes.groupImage} alt="coffee" title="coffee"/>
                                <p className={classes.groupTitel}>Coffee</p>
                                <div className={classes.bottomDesc}>
                                    <span className={classes.memberNumber}> 876 member</span>
                                    <div className={classes.joinGroup}>
                                        <button className={classes.btnGreenStyle}> Join Group</button></div>
                                </div>                                 
                            </div>                  
                        </div>

                        <div className={"col-md-8th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                                <img src={womengroup} className={classes.groupImage} alt="Women Group" title="Women Group"/>
                                <p className={classes.groupTitel}>Women Group</p>
                                <div className={classes.bottomDesc}>
                                    <span className={classes.memberNumber}> 876 member</span>
                                    <div className={classes.joinGroup}>
                                        <button className={classes.btnGreenStyle}> Join Group</button></div>
                                </div>                                 
                            </div>                  
                        </div>

                          
                     </div>

                 </div>
            </div>
        </div>
        )
    }
}
