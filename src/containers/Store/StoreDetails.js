import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import { connect } from 'react-redux';
import classes from './Store.module.css';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import StoreLogo from '../../assets/images/home/store/store1.svg';
import StoreLogo2 from '../../assets/images/home/store/store2.svg';
import StoreBanner from '../../assets/images/store/store.svg';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Skeleton from '../../components/UI/Skeleton/Skeleton';

class StoreDetails extends Component{

    componentDidMount(){ 
       
        this.timer = setTimeout(
            () => {
                //this.props.match.params.id
               this.props.onInitStoreDetails(5); 
            },
            1000,
          );


    }

   
    render(){

       

        let storeContent = null

        let storeName =  <Skeleton/>

        let storeOwner  =  <Skeleton/>
        if(this.props.storeDetails &&this.props.storeDetails.id!==undefined){
            storeName = this.props.storeDetails.name;
            if(this.props.storeDetails.user &&this.props.storeDetails.user.id!==undefined){
                storeOwner = this.props.storeDetails.user.first_name
            }
            
        }
        
        storeContent = (
            <Aux>
            <img src={StoreBanner} className={classes.storeImage} alt="Woman accesories" title="Woman accesories"/>
            <div class="container-fluid">
                <div className={classes.bannerimages + " row"}>
                    <div className="col-lg-12">
                    <div className={classes.bannerText + " col-sm-12"}>
                        <div className={classes.fashionStore +" col-sm-6" }>
                            <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories"/> 
                                <h3>{storeName}</h3>
                                <p>@{storeOwner}</p>                                    
                            </div>
                            <div className="col-sm-6">
                                <button className="btnGreenStyle pull-right mt-4">Follow</button>
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
            </Aux>
        )
        

        return (
           <Aux>
                <Backdrop show={this.props.loading} />
                <Spinner show={this.props.loading} />  
                {storeContent}
                
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
        storeLists: state.store.storeLists,
        isAuthentication : state.auth.token !== null,
        userId : state.auth.userId,
        token : state.auth.token
        
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitStoreDetails: (id) => dispatch(actions.initStoreDetails(id)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( StoreDetails );