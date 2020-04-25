import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        userData  : {}
    }

    componentDidMount(){ 

        this.timer = setTimeout(
            () => {
                let userData = sessionStorage.getItem('userData');
                this.setState({userData: JSON.parse(userData)})
            },
            3000,
          );
    }

   

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
                    <Sidebar isAuthentication={this.props.isAuthentication}/>
                    
                    <div className={classes.rightPanel + " col-lg-10"}>
                        <Header userData={this.state.userData} isAuthentication={this.props.isAuthentication}/>
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


const mapStateToProps = state => {
    return {
        isAuthentication : state.auth.token !== null
    };
}

  
export default connect(mapStateToProps)( Layout );

