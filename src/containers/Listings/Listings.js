import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

// import classes from './Listings.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

import Listing from '../../components/Listing/Listing';
import Filter from '../../components/Listing/Filter/Filter';




const priceOptions = [
    { value: '10_1000', label: '10 to 1000' },
    { value: '1001_10000', label: '1001 to 10000' },
];
  
const sortByOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price_high_to_low', label: 'Price higt to low' },
    { value: 'price_low_to_high', label: 'Price low to high' },
    { value: 'newest_first', label: 'Newest first' },
];

class Listings extends Component{

    state = {
        selectedOption: {
            priceValue : null,
            sortValue : null,
            supplierValue : null,
            locationValue : null,
            categoryValue : null
        },
        loading : true,
        loadOnce : true,
        noListings: false,
    };

    handleChange = (selectedOption,selectedName) => {
        let name = selectedName.name;
        let selectedValue = {...this.state.selectedOption}
        selectedValue[name] = selectedOption;
        this.setState({selectedOption:selectedValue,loadOnce:true});
        
    };

    componentDidMount(){ 
        this.timer = setTimeout(
            () => {
                this.props.onCategoryLists();
                this.props.onInitListings(0,'');
            },
            1000,
          );

          this.timer = setTimeout(
            () => {
               this.setState({noListings : true})
            },
            4000,
          );
    }

    componentDidUpdate(){
        if(this.state.loadOnce){
            this.loadMore();
            this.setState({loadOnce:false})
        }
        
    }
    
    loadMore = () =>{
        let count = 4;

        let filter = '';

        if(this.state.selectedOption.sortValue !== null){
            filter+= '&sort='+this.state.selectedOption.sortValue.value;
        }

        if(this.state.selectedOption.priceValue !== null){

            let prices = this.state.selectedOption.priceValue.value;
            let spitPrices = prices.split('_');
            filter+= '&price_from='+spitPrices[0]+'&price_to='+spitPrices[1];
        }


        this.props.onInitListings(count,filter);
    
    
    }



    render(){
        
        console.log(this.state);
        let listing = '';
        console.log(this.props.listings);
        let showLoadButton = null;

        if(this.props.listings && this.props.listings.length > 0){
            listing = <Listing listings={this.props.listings} total_products={this.props.total_products}/>

            if(this.props.total_products > 4){
                showLoadButton =   <div className="col-sm-12">
                <button className="btnGreenStyle pull-right mt-4" onClick={this.loadMore}>Load More</button>
            </div> 
            }
                               
        }else{

            if(this.state.noListings){
                listing = <div style={{marginTop:'5em'}} className="alert alert-danger fade in alert-dismissible">
                            <Link to="#" className="close" data-dismiss="alert" aria-label="close" title="close">×</Link>
                            <strong>oops!</strong> No listings found.
                         </div>
            }

        }

        let options ={
            priceOptions : priceOptions,
            categoryOptions : [],
            locationOptions : [],
            supplerOptions : [],
            sortByOptions : sortByOptions
        }

        let selectedOption = {
            priceValue : this.state.selectedOption.priceValue,
            sortValue : this.state.selectedOption.sortValue,
            supplierValue:this.state.selectedOption.supplierValue,
            locationValue:this.state.selectedOption.locationValue,
            categoryValue:this.state.selectedOption.categoryValue,
        }

        return (
           <Aux>
                <Backdrop show={this.props.loading} />
                <Spinner show={this.props.loading} />
             

                <Filter selectedOption={selectedOption} options={options} handleChange={this.handleChange}/>
                
                
                {listing}
            
                {showLoadButton}

                <br/>
                <br/>
                <br/>
            
            
            
            </Aux>
            
        );
    }
}


const mapStateToProps = state => {
    return {
        error:  state.product.error,
        loading: state.product.loading,
        message:  state.product.message,
        listings: state.product.listings,
        page : state.product.page,
        total_products : state.product.total_products
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitListings: (count,filterValue) => dispatch(actions.initListings(count,filterValue)),
        onCategoryLists : () => dispatch(actions.initCategoryLists()) 
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( Listings );