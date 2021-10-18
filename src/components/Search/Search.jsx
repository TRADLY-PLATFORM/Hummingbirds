 import React, { useState } from 'react';
import { useEffect } from 'react';
 import { useHistory, useLocation } from 'react-router-dom';
 import classes from "./Search.module.css"

import searchIcon from "../../assets/images/header/search (1).png"

export  const Search = () => {
   const [searchText, setSearchText] = useState('');
   let history = useHistory();
  let { pathname } = useLocation();
 useEffect(() => {
    if (pathname.split('/')[1] !== 'search') {
      setSearchText('');
    } else {
      setSearchText(pathname.split('/')[2]);
    }
  }, [pathname]);

  //
 
  // Function
   const handleChange = (e) => {
     setSearchText(e.target.value);
    //  dispatch(actions.getSearchingResult(e.target.value));
   };
   const handleKeypress = (e) => {
     //it triggers by pressing the enter key
     if (e.key === 'Enter') {
        history.push('/search/'+searchText)
     }
   };
  return (
    <>
      <div className="col-sm-6" style={{ padding: '0' }}>
        <div className={classes.searchBar}>
          <span className={classes.SearchIcon}>
            <img src={searchIcon} alt="" />
          </span>
          <input
            type="text"
            value={searchText}
            className={classes.searchInput}
            placeholder="Search Product"
            onChange={handleChange}
            onKeyPress={(e) => {
              handleKeypress(e);
            }}
          />
        </div>
        {/* <div className={classes.shortResult} style={listings.length > 0 ? {display:"block"}:{display:"none"}}>{listings.length}</div> */}
      </div>
    </>
  );
};
 