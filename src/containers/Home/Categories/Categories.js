import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import MoreLogo from '../../../assets/images/home/category/more.svg';
import Category from '../../../components/Category/Category';
import classes from "./Categories.module.css"
import useWindowSize from '../../../components/Hooks/WindowSize/WindowSize';

const Categories = () => { 
  const [categories, setCategories] = useState([]);
  const Categories = useSelector((state) => state.home.categories);
  console.log(Categories);
  const [categorySet, setCategorySet] = useState([]);
    const { width, height } = useWindowSize();

console.log('====================================');
console.log(width);
console.log('====================================');
  useEffect(() => {
    if (Categories && Categories.length > 0) {
      console.log(Categories);
      let copyCategories = [...Categories];
      let lengthOfCategories = Categories.length;
      let firstCategorySet = '';
      if (lengthOfCategories <= 4) {
        firstCategorySet = copyCategories.slice(0, 4);
      } else if (lengthOfCategories <= 8) {
        firstCategorySet = copyCategories.slice(0, 8);
      } else if (lengthOfCategories > width>700?3:8) {
        firstCategorySet = copyCategories.slice(0,  width>700?7:3);
        let moreCategory = {
          id: Math.random(),
          name: 'More',
          image_path: MoreLogo,
          has_sub_category: true,
          link: 'all-categories',
        };
        firstCategorySet.push(moreCategory);
      }
      setCategorySet(firstCategorySet);
    }
  }, [Categories]);

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
    <div style={{ marginTop: '20px', minHeight: '150px' }}>
      <div className="col-lg-12 col-md-12">
        <div className={classes.CategoryBox  }>
          <Category categories={categorySet} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
