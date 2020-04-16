import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const spinner = (props) => (
    props.show ? 
    <Loader
         type="ThreeDots"
         color="#13B58C" 
         height={100}
         width={100}
         style={{position: 'absolute', top: '50%', left: '50%', margin: '-50px 0px 0px -50px', zIndex: '999'}} 
      /> : null
);

export default spinner;


