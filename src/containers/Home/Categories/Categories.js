/* eslint-disable react/prop-types */
import React, {  useState } from 'react';
 import MoreLogo from '../../../assets/images/home/category/more.svg';
import Category from '../../../components/Category/Category';
import classes from './Categories.module.css';
// import useWindowSize from '../../../components/Hooks/WindowSize/WindowSize';

const Categories = ({ categories }) => {
  // const Categories = useSelector((state) => state.home.categories);
 
  const [categorySet, setCategorySet] = useState([...categories]);
  // const { width, height } = useWindowSize();
   // useEffect(() => {
  //   dispatch(actions.initCategories());
  // }, [0]);
  
 
  const sendCategories = () => {
   
    if (categorySet.length <= 10) {
      return (
        <Category categories={categorySet} />)
        
          
    }
    else {
      const sliceLength =9;
      let updatedCategories = categorySet.slice(0, sliceLength);
      let moreCategory = {
          id: Math.random(),
          name: 'More',
          image_path: MoreLogo,
          has_sub_category: true,
          link: 'all-categories',
        };
        updatedCategories.push(moreCategory);
       return <Category categories={updatedCategories} />;
    }
  }
      // console.log(categories);
      // let copyCategories = [...categories];
      // let lengthOfCategories = categories.length;
      
      // if (lengthOfCategories > 8) {
      //  const sliceLength = width > 700 ? 3 : 7;
 
      //   let  firstCategorySet = copyCategories.slice(0, sliceLength);
      //   let moreCategory = {
      //     id: Math.random(),
      //     name: 'More',
      //     image_path: MoreLogo,
      //     has_sub_category: true,
      //     link: 'all-categories',
      //   };
      //   firstCategorySet.push(moreCategory);
       
       
      // }  
       
      
    
  

  // let categoryContent;
  // if (categorySet && categorySet.length > 0) {
  //   if (categorySet <= 4) {
  //     categoryContent = (
  //       <div className="col-lg-12 col-md-12">
  //         <div className="row">
  //           <Category categories={this.state.categorySet} />
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     categoryContent = (
  //       <>
  //         <div className="col-lg-6 col-md-12">
  //           <div className="row">
  //             <Category categories={categorySet.slice(0, 4)} />
  //           </div>
  //         </div>
  //         <div className="col-lg-6 col-md-12">
  //           <div className="row">
  //             <Category categories={categorySet.slice(4, 8)} />
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }
  // }
  return (
   
         <div className={classes.CategoryBox}>
          {
            sendCategories()
         }
        </div>
    );
};

export default Categories;
