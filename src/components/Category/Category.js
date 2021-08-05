import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Category.module.css';

// import WomanAccesoriesLogo from '../../assets/images/home/category/womanaccesories.svg';
// import WomanClothLogo from '../../assets/images/home/category/womancloth.svg';
// import BookLogo from '../../assets/images/home/category/book.svg';
// import TextBooksLogo from '../../assets/images/home/category/textbooks.svg';
// import ElectronicsLogo from '../../assets/images/home/category/electronics.svg';
// import SporsLogo from '../../assets/images/home/category/sports.svg';
// import GamesLogo from '../../assets/images/home/category/games.svg';

const categoryHtmlHandler = (categories, categoryLength) => {
  return categories.map(function (category, index) {
    // if ((index + 1) === categoryLength) {
    //     return [<div className="col-sm-3" key={category.id}>
    //                 <div className={classes.wellCategory}>
    //                     <img src={category.image_path} alt={category.name} title={category.name} style={{width:'32px',height:'32px'}} />
    //                     <p>{category.name}</p>
    //                 </div>
    //             </div>, <div className="col-sm-3" key={Math.random()}>
    //                 <div className={classes.wellCategory}>
    //                 <img src={MoreLogo} alt="More" title="More"/>
    //                     <p>More</p>
    //                 </div>
    //             </div> ];
    // }
    console.log(category);

    let link = '/link';

    // if (category.link) {
    //   link = '/' + category.link;
    // }
    let categoryName = category.name.replace(/\//g, '-');

    return (
      
      <Link
        to={categoryName ==="More"?"/categories":`/category/${categoryName}/${category.id}`}
        key={category.id}
         style={{ textDecoration: 'none' }}
      >
        <div className={classes.wellCategory}>
          <img
            src={category.image_path}
            alt={category.name}
            title={category.name}
            style={{ width: '32px', height: '32px' }}
          />
          <p>{category.name}</p>
        </div>
      </Link>
    );
  });
};

const category = (props) => {

  let categoryContent = <Spinner show={true} styles="SpinnerCenter" />;

  if (props.categories.length > 0) {
    let categoryLength = props.categories.length;
    categoryContent = categoryHtmlHandler(props.categories, categoryLength);
  } else {
    categoryContent = '';
  }
  return categoryContent;
};



export default category;
