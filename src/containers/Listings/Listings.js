import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './Listings.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from 'react-select';
import * as actions from '../../store/actions/index';

import Listing from '../../components/Listing/Listing';
import Filter from '../../components/Listing/Filter/Filter';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class Listings extends Component{

    state = {
        selectedOption: null,
        loading : true,
    };

    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    componentDidMount(){ 
        this.timer = setTimeout(
            () => {
                this.props.onInitListings(0);
            },
            3000,
          );
    }
    
    loadMore = (count) =>{
        this.props.onInitListings(count);
    }

    render(){
        const { selectedOption } = this.state;

        let listing = <Spinner show={true} styles='SpinnerCenter'/> 
        console.log(this.props.listings);

        let showLoadButton = null;

        if(this.props.listings && this.props.listings.length > 0){
            listing = <Listing listings={this.props.listings} total_products={this.props.total_products}/>

            showLoadButton =   <div className="col-sm-12">
                                    <button className="btnGreenStyle pull-right mt-4" onClick={() => this.loadMore(4)}>Load More</button>
                                </div>  
                               
        }

        return (
           <Aux>
                <Backdrop show={this.props.loading} />
                <Spinner show={this.props.loading} />
             

                <Filter selectedOption={this.state.selectedOption} options={options} handleChange={this.handleChange}/>
                
                
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
        onInitListings: (count) => dispatch(actions.initListings(count))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)( Listings );