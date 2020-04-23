import React from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import Category from '../Category';


const allCategory = (props) => {

    let categoryContent =   <Spinner show={true} styles='SpinnerCenter'/> 

    if(props.categories && props.categories.length > 0){
        categoryContent = <Category categories={props.categories}/>
    }

    return categoryContent;
   
}


  
const mapStateToProps = state => {
    return {       
        categories: state.home.categories
    };
}


export default connect(mapStateToProps)( allCategory );