import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './PhoneVerification.module.css';
class PhoneVerification extends Component {
 
    render () {
        return (
            <div className="row text-center mt-5">
                <div className={classes.title}>
                    Phone verification
                </div>

                <div className="col-lg-12 nopaddingLeft">
                    <h5 className={classes.titleAcccount}>Enter verification code here</h5>
                    <br/>
                    <form action="" method="post" className="">
                    <div className="row text-center mt-4">
                        <div className="col-2">
                            <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className="col-2">
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className="col-2">
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className="col-2">
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className="col-2">
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                        <div className="col-2">
                        <input type="text" className={ classes.PhoneDigit + " form-control" } maxLength="1"/>
                        </div>
                    </div>

                        <div className="text-center mt-5">
                        Didn't you recieved any code ?<Link to="/sign-in" className="text-center whiteColor">Resend code</Link>
                        </div>

                        <div className="form-group mt-5">
                            <button className={classes.button}>Verify</button>
                        </div>

                        
                    </form>
                </div>
            </div>
        )
    }
}


export default PhoneVerification;