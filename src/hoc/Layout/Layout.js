import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import classes from './Layout.module.css';

class Layout extends Component {
 
    render () {
        return (
            <Aux>        
                <nav className="navbar navbar-inverse visible-xs">
                  <div className="container-fluid">
                      <div className="navbar-header">
                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>                        
                      </button>
                      <Link className="navbar-brand" to="#">Logo</Link>
                      </div>
                      <div className="collapse navbar-collapse" id="myNavbar">
                      <ul className="nav navbar-nav">
                          <li className="active"><Link to="#">Dashboard</Link></li>
                          <li><Link to="#">Age</Link></li>
                          <li><Link to="#">Gender</Link></li>
                          <li><Link to="#">Geo</Link></li>
                      </ul>
                      </div>
                    </div>
                </nav>
          
                <div className={classes.bgColor +" container-fluid"}>
                  <div className="row content">
                    <Sidebar/>
                    
                    <div className={classes.rightPanel + " col-lg-10"}>
                        <Header/>
                        <main className={classes.rightTopMargin + " col-lg-12"}>
                            {this.props.children}
                        </main>
                   </div>
                  </div>
                </div>
            </Aux> 
        )
    }
}


export default Layout;

// <div className="well">
// <h4>Dashboard</h4>
// <p>Some text..</p>
// </div>
// <div className="row">
// <div className="col-sm-3">
//   <div className="well">
//     <h4>Users</h4>
//     <p>1 Million</p> 
//   </div>
// </div>
// <div className="col-sm-3">
//   <div className="well">
//     <h4>Pages</h4>
//     <p>100 Million</p> 
//   </div>
// </div>
// <div className="col-sm-3">
//   <div className="well">
//     <h4>Sessions</h4>
//     <p>10 Million</p> 
//   </div>
// </div>
// <div className="col-sm-3">
//   <div className="well">
//     <h4>Bounce</h4>
//     <p>30%</p> 
//   </div>
// </div>
// </div>
// <div className="row">
// <div className="col-sm-4">
//   <div className="well">
//     <p>Text</p> 
//     <p>Text</p> 
//     <p>Text</p> 
//   </div>
// </div>
// <div className="col-sm-4">
//   <div className="well">
//     <p>Text</p> 
//     <p>Text</p> 
//     <p>Text</p> 
//   </div>
// </div>
// <div className="col-sm-4">
//   <div className="well">
//     <p>Text</p> 
//     <p>Text</p> 
//     <p>Text</p> 
//   </div>
// </div>
// </div>
// <div className="row">
// <div className="col-sm-8">
//   <div className="well">
//     <p>Text</p> 
//   </div>
// </div>
// <div className="col-sm-4">
//   <div className="well">
//     <p>Text</p> 
//   </div>
// </div>
// </div>
