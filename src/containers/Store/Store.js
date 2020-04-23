import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Store.module.css';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import StoreLogo from '../../assets/images/home/store/store1.svg';
import StoreLogo2 from '../../assets/images/home/store/store2.svg';
import StoreBanner from '../../assets/images/store/store.svg';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Store extends Component{

    componentDidMount(){ 
       
        this.timer = setTimeout(
            () => {
               this.props.onInitStoreDetails(this.props.match.params.id); 
            },
            3000,
          );
    }

    render(){


        return (
           <Aux>
                <Backdrop show={this.props.loading} />
                <Spinner show={this.props.loading} />  
                <img src={StoreBanner} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                <div class="container-fluid">
                    <div className={classes.bannerimages + " row"}>
                        <div className="col-lg-12">
                        <div className={classes.bannerText + " col-sm-12"}>
                            <div className={classes.fashionStore +" col-sm-6" }>
                                <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> 
                                    <h3>Fashion Store</h3>
                                    <p>@Rahulchaun</p>                                    
                                </div>
                                <div className="col-sm-6">
                                    <button className="btnGreenStyle pull-right mt-4">Follow</button>
                                </div>  
                                </div>
                        </div>
                    </div>
                </div>
                
                
                {/* <br/><br/> */}
                <div class="container-fluid mt-5">


                    <div className="row">
                        <div class={"col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p>
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>                                 
                            </div>                  
                        </div>
                        <div class={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                            <img src={StoreLogo2} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                            <p>White Full Slive Top</p> 
                            <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>    
                            </div>
                        </div>
                        <div class={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend }>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>
                        </div>
                        <div class={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo2} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p>   
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                        <div class={"col-md-5th-1 col-sm-4 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                    </div>
                </div>
            
            
               

                <div class="container-fluid mt-5">
                    <div className="row">
                        <div class={"col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p>
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>                                 
                            </div>                  
                        </div>
                        <div class={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                            <img src={StoreLogo2} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                            <p>White Full Slive Top</p> 
                            <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>    
                            </div>
                        </div>
                        <div class={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend }>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>
                        </div>
                        <div class={"col-md-5th-1 col-sm-4"}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo2} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p>   
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                        <div class={"col-md-5th-1 col-sm-4 "}> 
                            <div className={classes.latestTrend}>
                                <img src={StoreLogo} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
                                <p>White Full Slive Top</p> 
                                <div className={classes.bottomDesc}>
                                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>
                                    <div className={classes.amountTitle}>$25</div>
                                </div>   
                            </div>    
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            
            
            
            </Aux>
           
            
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.store.loading,
        storeDetails: state.store.storeDetails,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitStoreDetails: (id) => dispatch(actions.initStoreDetails(id))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( Store );