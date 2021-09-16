import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as actions from "../../store/actions/index"
import classes from "./Search.module.css"

import searchIcon from "../../assets/images/header/search (1).png"

export  const Search = () => {
   const [searchText, setSearchText] = useState('');
   const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const dispatch = useDispatch()
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
  const listings = useSelector((state) => state.Search.searchList);

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
 