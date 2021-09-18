import React from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect, useDispatch,useSelector } from 'react-redux';
import Category from '../Category';
import { useEffect } from 'react';
import * as actions from '../../../store/actions/index';
 import classes from "./AllCategories.module.css"
  
 const AllCategory = () => {
     const dispatch = useDispatch()
     useEffect(() => {
         dispatch(actions.initCategories());
     },[])
       const Categories = useSelector((state) => state.home.categories);
      return (
       <div>
         <div style={{ marginTop: '20px', minHeight: '150px',  }}>
           
             <div className={classes.categoryBox} >
               <Category categories={Categories} />
             </div>
            
         </div>
       </div>
     );
 };
 
 export default AllCategory;