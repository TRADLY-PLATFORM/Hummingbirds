import React, { Component } from 'react';
import classes from './Group.module.css';
import {Link} from "react-router-dom";
import groupAvatar from '../../assets/images/Group/GroupLogo.svg';
import TradllyGroup from '../../assets/images/Group/TradllyGroup.svg';
import UnionLogo from '../../assets/images/Group/UnionLogo.svg';
import FinanceLogo from '../../assets/images/Group/FinanceLogo.svg';
import AssociationLogo from '../../assets/images/Group/AssociationLogo.svg';

export default class Group extends Component {
    render() {
        return (
            <div>
             
                <Link to="#">
                <button className={classes.button}><i className="fa fa-arrow-left "></i> back to my group</button>
                 </Link> 
                 <br />

                <div className={classes.mycontainer}>
                    <div className={classes.groupcard }>
                        <div className="row">
                                <div class="p-2">
                                    <img className={classes.groupAvatar} src={groupAvatar} alt="Group Avatar" />
                                </div>
                                
                                <div class="p-2">
                                    <Link to="#">
                                    <button className={classes.button}>
                                        Add your group photo
                                    </button>
                                    </Link>
                        
                                </div>
                        </div>
                    </div>

                    <div className={classes.addgroup}>
                        <div className="form-group mt-2 ">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Group Name"/>
                        </div>

                        <div className="form-group mt-2 ">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Store Web Address"/>
                        </div>

                        <div className="form-group mt-2">
                            <input className={classes.input + " form-control input-lg "} type="text" placeholder="Location"/>
                        </div>                    
                    </div>

                    <div className="row text-center"><span>Group Type</span></div>
                    <br />
                    
                    <div className="row ">
                    <div className="col-lg-12 col-md-12 text-center">
                        
                            <div className="col-sm-3">
                            <div className={classes.typeGroup}>
                                <img src={TradllyGroup} alt="Tradlly" title="Tradlly"/>
                                <p>Tradlly</p> 
                            </div>
                            </div>
                            <div className="col-sm-3">
                            <div className={classes.typeGroup}>
                            <img src={UnionLogo} alt="Union" title="Union"/>
                                <p>Union</p> 
                            </div>
                            </div>
                            <div className="col-sm-3">
                            <div className={classes.typeGroup}>
                            <img src={FinanceLogo} alt="Tradlly" title="Tradlly"/>
                                <p>Finance</p> 
                            </div>
                            </div>
                            <div className="col-sm-3">
                            <div className={classes.typeGroup}>
                            <img src={AssociationLogo} alt="Association" title="AssociationLogo"/>
                                <p>Association</p> 
                            </div>
                            </div>
                            
                        </div> 
                    </div>
                   
                     <div className ="text-center"><button className={classes.creategroup}>Create Group</button>
                     </div>
                
                </div>
            </div>
        )
    }
}
