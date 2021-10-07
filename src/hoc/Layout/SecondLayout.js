/* eslint-disable react/prop-types */
import React from 'react';
import TopHeader from '../../components/Header/TopHeader/TopHeader';
import classes from "./SecondLayout.module.css"

const SecondLayout = (props) => {
  return (
    <div className={classes.layoutDesign}>
    
      <div className={classes.HeaderPart}>
        <TopHeader />
      </div>
      <div className={classes.childrenPart}>{props.children}</div>
    </div>
  );
};

export default SecondLayout;