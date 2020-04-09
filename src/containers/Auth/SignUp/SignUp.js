import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './SignUp.module.css';
class SignUp extends Component {
 
    render () {
        return (
            <div className="row">
                <div className={classes.title}>
                    Welcome to Tradly <br/> Marketplace
                </div>

                <div className="col-lg-12 nopaddingLeft">
                    <h5 className={classes.titleAcccount}>Create your account</h5>
                    <br/>
                    <form action="" method="post" className="">
                        <div className="form-group">
                            <input className={classes.input} type="text" placeholder="Full Name"/>
                        </div>

                        <div className="form-group mt-4">
                            <input className={classes.input} type="text" placeholder="Mobile Number"/>
                        </div>

                        <div className="form-group mt-4">
                            <input className={classes.input} type="text" placeholder="Password"/>
                        </div>

                        <div className="form-group mt-4">
                            <input className={classes.input} type="text" placeholder="Re Type Password"/>
                        </div>

                        <div className="form-group mt-5">
                            <button className={classes.button}>Sign Up</button>
                        </div>

                        <div className="text-center mt-5">
                        <Link to="/sign-in" className="text-center whiteColor">have an account ? Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default SignUp;