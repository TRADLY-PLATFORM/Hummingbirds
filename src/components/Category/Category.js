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

        let link = '#';

        if(category.link){
            link = '/'+category.link;
        }
        return (<Link to={link}  key={category.id}><div className="col-sm-3">
                    <div className={classes.wellCategory}>
                        <img src={category.image_path} alt={category.name} title={category.name} style={{width:'32px',height:'32px'}} />
                        <p>{category.name}</p> 
                    </div>
                </div></Link>);
    });
}

const category = (props) => {

    // let dummyCategoryContent =  (
    //     <div className="row mt-5">
    //         <div className="col-lg-6 col-md-12">
    //             <div className="row">
    //                 <div className="col-sm-3">
    //                     <div className={classes.wellCategory}>
    //                         <img src={WomanAccesoriesLogo} alt="Woman accesories" title="Woman accesories"/>
    //                         <p>Woman accesories</p> 
    //                     </div>
    //                 </div>
    //                 <div className="col-sm-3">
    //                     <div className={classes.wellCategory}>
    //                     <img src={WomanClothLogo} alt="Woman cloth" title="Woman cloth"/>
    //                         <p>Woman cloth</p> 
    //                     </div>
    //                 </div>
    //                 <div className="col-sm-3">
    //                     <div className={classes.wellCategory}>
    //                     <img src={BookLogo} alt="Book" title="Book"/>
    //                         <p>Book</p> 
    //                     </div>
    //                 </div>
    //                 <div className="col-sm-3">
    //                     <div className={classes.wellCategory}>
    //                     <img src={TextBooksLogo} alt="Text books" title="Text books"/>
    //                         <p>Text books</p> 
    //                     </div>
    //                 </div>
    //             </div>
    //         </div> 
    //         <div className="col-lg-6 col-md-12">
    //             <div className="row">
    //                 <div className="col-sm-3">
    //                     <div className={classes.wellCategory}>
    //                     <img src={SporsLogo} alt="Sports" title="Sports"/>
    //                         <p>Sports</p> 
    //                     </div>
    //                 </div>
    //                 <div className="col-sm-3">
    //                     <div className={classes.wellCategory}>
    //                     <img src={ElectronicsLogo} alt="Electornics" title="Electornics"/>
    //                         <p>Electornics</p> 
    //                     </div>
    //                 </div>
    //                 <div className="col-sm-3">
    //                     <div className={classes.wellCategory}>
    //                     <img src={GamesLogo} alt="Game &amp; toys" title="Game &amp; toys"/>
    //                         <p>Game &amp; toys</p> 
    //                     </div>
    //                 </div>
    //                 <div className="col-sm-3">
    //                     <div className={classes.wellCategory}>
    //                     <img src={MoreLogo} alt="More" title="More"/>
    //                         <p>More</p> 
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>);

        let categoryContent =   <Spinner show={true} styles='SpinnerCenter'/> 

        if (props.categories.length > 0){
            let categoryLength = props.categories.length;
            categoryContent =    categoryHtmlHandler(props.categories,categoryLength);            
        }else{
            categoryContent ='';
        }
        return categoryContent;
}


// return <div className={divLength}><div className="row">{categories.map(function (category, index) {    

//     if ((index + 1) === categoryLength) {
//         return [<div className="col-sm-3" key={category.id}>
//                     <div className={classes.wellCategory}>
//                         <img src={category.image_path} alt={category.name} title={category.name} style={{width:'32px',height:'32px'}} />
//                         <p>{category.name}</p> 
//                     </div>
//                 </div>, <div className="col-sm-3" key={Math.random()}>
//                     <div className={classes.wellCategory}>
//                     <img src={MoreLogo} alt="More" title="More"/>
//                         <p>More</p> 
//                     </div>
//                 </div> ];
//     }

//     return (<div className="col-sm-3" key={category.id}>
//                     <div className={classes.wellCategory}>
//                         <img src={category.image_path} alt={category.name} title={category.name} style={{width:'32px',height:'32px'}} />
//                         <p>{category.name}</p> 
//                     </div>
//                 </div>);
// })}</div></div>;
  
export default category;