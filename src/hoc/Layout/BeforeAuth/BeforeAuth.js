import React, { Component } from 'react';
import Aux from '../../Auxiliary/Auxiliary';
import Carousel from '../../../containers/Common/Carousel/Carousel';
import classes from './BeforeAuth.module.css';
class BeforeAuth extends Component {
 
    render () {

        
        return (
            <Aux>    
                <div className={"container-fluid " + classes.BeforeAuth}>
                    <div className="row  ">
                        <div className={"  col-md-6 text-center " + classes.leftDiv}>
                            <Carousel/>                        
                        </div>

                        <div className={"   col-md-6 " + classes.rightDiv}>                       
                            {this.props.children}               
                        </div>  
                    </div>
                </div>          
            </Aux>
        )
    }
}


export default BeforeAuth;