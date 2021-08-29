import React, { Component } from 'react';
import Aux from '../../Auxiliary/Auxiliary';
import Carousel from '../../../containers/Common/Carousel/Carousel';
import classes from './BeforeAuth.module.css';
class BeforeAuth extends Component {
 
    render () {

        
        return (
            <Aux>    
                <div className={  classes.BeforeAuth}>
                     
                        <div className={ classes.leftDiv}>
                            <Carousel/>                        
                        </div>

                        <div className={ classes.rightDiv}>                       
                            {this.props.children}               
                        </div>  
                    
                </div>          
            </Aux>
        )
    }
}


export default BeforeAuth;