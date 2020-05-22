import React, { Component } from 'react'
import classes from './MyTransactionst.module.css';
import transactionImage from "../../assets/images/MyTransaction/transactionImage.svg"
import storeIcon from "../../assets/images/MyTransaction/storeIcon.svg"

export default class MyTransactionst extends Component {
    render() {
        return (
           <div>
            <div className="row">
            <div className={classes.pageTitle + " col-md-6 "}>
                          <h2 className={classes.pageTitle}>My Transaction </h2>
            </div>  

            
            <div className = "col-md-2 col-sm-2 col-sx-2" >
                          <div className = {classes.SortbyMenu + " dropdown" }>
                             <button className= {classes.SortbyMenu + " dropdown-toggle "} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             Sort by
                             <span className="caret"></span></button>
                          <ul className=" dropdown-menu ">
                                <li><a href="/#">A</a></li>
                                <li><a href="/#">B</a></li>
                                <li><a href="/#">C</a></li>
                          </ul>
                          </div>
            
             </div>
            <div className="col-md-4 col-sm-12 col-xs-12">
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                    <input type="text" className="form-control input-lg" placeholder="Search My Transaction"/>                      
                </div>
            </div>

<br/>
            <div className="row">
                <div className="col-md-4"><h4>Transaction History</h4></div>
                <div className="col-md-2 text-center"><h4>Date</h4></div>
                <div className="col-md-2 text-center"><h4>Price</h4></div>
                <div className="col-md-2"><h4>Status</h4></div>
                
            </div>
            
            
            <div className={classes.transactionContainer }>
                <div className={" nopadding col-md-4 "}> 
                <img className={classes.productImg} src={transactionImage} alt="product img" /> 
                                   <p className={classes.transactionDetails}>White Full Slive Top</p> 
                                   <div className={classes.bottomDesc}>
                                   <img src={storeIcon} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>    
                                </div>
                     </div>
                <div className="col-md-2 "><span>21 </span><span>Dec </span><span>2019 </span></div>
                < div className = "col-md-2"> < h4 > $ </h4></div >
                <div className="col-md-2 nopaddingLeft "><button className={classes.btnGreenStyle + " text-center "}>Delivered</button></div>
                <div className="col-md-2"><button className={classes.button}>View Receipt</button></div>
              </div>

              <br />

               <div className={classes.transactionContainer }>
                <div className="nopadding col-md-4">
                   <img className={classes.productImg} src={transactionImage} alt="product img" /> 
                                   <p className={classes.transactionDetails}>White Full Slive Top</p> 
                                   <div className={classes.bottomDesc}>
                                   <img src={storeIcon} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span> 
                                   </div>
                                </div>
                <div className="col-md-2"><span>21 </span><span>Dec </span><span>2019 </span></div>
                <div className="col-md-2"><h4>$</h4></div>
                <div className="col-md-2 nopaddingLeft "><button className={classes.btnGreenStyle + " text-center "}>Delivered</button></div>
                <div className="col-md-2"><button className={classes.button}>View Receipt</button></div>
              </div>

                            <br />

               <div className={classes.transactionContainer }>
                <div className="nopadding col-md-4 col-lg-4">
                   <img className={classes.productImg} src={transactionImage} alt="product img" /> 
                                   <p className={classes.transactionDetails}> White Full Slive Top</p> 
                                   <div className={classes.bottomDesc}>
                                   <img src={storeIcon} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>    
                                </div>
                              </div>
                <div className="col-md-2"><span>21 </span><span>Dec </span><span>2019 </span></div>
                <div className="col-md-2"><h4>$</h4></div>
                <div className="col-md-2 nopaddingLeft "><button className={classes.btnGreenStyle + " text-center "}>Delivered</button></div>
                <div className="col-md-2"><button className={classes.button}>View Receipt</button></div>
              </div>

                               <br />

              <div className={classes.transactionContainer }>
                <div className="nopadding col-md-4 ">
                   <img className={classes.productImg} src={transactionImage} alt="product img" /> 
                                   <p className={classes.transactionDetails}> White Full Slive Top</p> 
                                   <div className={classes.bottomDesc}>
                                   <img src={storeIcon} alt="Woman accesories" title="Woman accesories"/> <span>Rahul</span>    
                                </div>
                              </div>
                <div className="col-md-2"><span>21 </span><span>Dec </span><span>2019 </span></div>
                <div className="col-md-2"><h4>$</h4></div>
                <div className="col-md-2 nopaddingLeft "><button className={classes.btnGreenStyle + " text-center "}>Delivered</button></div>
                <div className="col-md-2"><button className={classes.button}>View Receipt</button></div>
              </div>
         

      </div>
        )
    }
}
