
import React, { Component } from 'react';
import classes from './Group.module.css';
import {Link} from "react-router-dom";
import groupAvatar from '../../assets/images/Group/GroupLogo.svg';
import TradllyGroup from '../../assets/images/Group/TradllyGroup.svg';
import UnionLogo from '../../assets/images/Group/UnionLogo.svg';
import FinanceLogo from '../../assets/images/Group/FinanceLogo.svg';
import AssociationLogo from '../../assets/images/Group/AssociationLogo.svg';
// import axios from '../../axios';
// import { ACCESS_TOKEN } from '../../shared/utility';

import { toast, ToastContainer, Slide } from 'react-toastify';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/index';
 

class Group extends Component {
    ////////////////////////////////
        state = {
        showError : false,
        name: '',
        web_address: '',
        description: '',
        location: '',
        private: false,
        coordinates: {
            latitude: 26.55,
            longitude: 56.345
        },
        type_id: 1,
        image_path: ''
    }



    createGroup = (e) => {
        e.preventDefault();  

        if(this.state.name === ''){
            if (! toast.isActive(this.toastId)) {
                this.toastId = toast.error('Group name is required');               
            }
            return false;
        } else if(this.state.location === ''){
            if (! toast.isActive(this.toastId)) {
                this.toastId = toast.error('Group location is required');               
            }
            return false;
        } 

        this.setState({showError:true});


        const groups = {
            group  : {
                name : this.state.name,
                web_address: this.state.web_address,
                location : this.state.location
            }
        }



        this.props.onCreateGroup(groups, this.props.token);  


    }

    handleChange = (e) => {      
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
          [name]: value
        });
        this.setState({showError:false});
    }
    //////////////////////////////// 
         
    render() {
        ////////////////////////////////
           let redirectUrl = null;
           // if(!this.props.isAuthentication){
           //     redirectUrl = <Redirect to="/sign-in"/>
           // }
        /////////////////////////////

    return (

         <Aux>
                {redirectUrl}
                <Backdrop show={this.props.loading} />
                <Spinner show={this.props.loading} />  
                <ToastContainer autoClose={2000} position="top-center" transition={Slide} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover/>

            <div>
             
                <Link to="#">
                <button className={classes.button}><i className="fa fa-arrow-left "></i> back to my group</button>
                 </Link> 
                 <br />
             <div className={classes.mycontainer}>
               <div className={classes.groupcard }>
              <div className="row">
                  <div className="p-2">
                    <img className={classes.groupAvatar} src={groupAvatar} alt="Group Avatar" />
                  </div>
                
                  < div className = "p-2" >
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
                            <input className={classes.input + " form-control input-lg "} name="name" value={this.state.name} onChange={this.handleChange} type="text" placeholder="Group Name"/>
                        </div>

                        <div className="form-group mt-2 ">
                            <input className={classes.input + " form-control input-lg "} name="web_address" value={this.state.web_address} onChange={this.handleChange} type="text" placeholder="Store Web Address"/>
                        </div>

                        <div className="form-group mt-2">
                            <input className={classes.input + " form-control input-lg "} name="location" value={this.state.location} onChange={this.handleChange} type="text" placeholder="Location"/>
                        </div>                    
                    </div>

                    <div className={classes.groupType + " row "}><span>Group Type</span></div>
                    <br />
                    
                    <div className="row ">
                    <div className="col-lg-12 col-md-12 text-center">
                        
                            <div className="col-sm-3 col-md">
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
                   
                     <div className ="text-center"><button className={classes.btnGreenStyle} onClick={this.createGroup}>Create Group</button>
                      </div>
                      <br/>
                
            </div>
            </div>
        </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.group.loading,
        groupDetails: state.group.groupDetails,
        isAuthentication : state.auth.token !== null,
        authRedirectPath : state.auth.authRedirectPath,
        userId : state.auth.userId,
        token : state.auth.token
        
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateGroup: (Group ,token) => dispatch(actions.CreateGroup(Group,token)),
        onInitGroupDetails: (id) => dispatch(actions.initGroupDetails(id)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path, null))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( Group );