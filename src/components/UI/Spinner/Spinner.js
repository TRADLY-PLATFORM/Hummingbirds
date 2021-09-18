import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const spinner = (props) => {

    let styleImage = 'SpinnerPosition';
    if(props.styles){
       styleImage = props.styles
    }

    return props.show ? (
      <Loader
        type="ThreeDots"
        color="var(--primary_color)"
        height={100}
        width={100}
        className={styleImage}
      />
    ) : null;
}



export default spinner;


