import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const spinner = (props) => {
  

  return props.show ? (
    <Loader
      type="ThreeDots"
      color="var(--primary_color)"
      height={100}
      width={100}
      style={{
        position: 'absolute',
        right: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '500',
      }}
    />
  ) : null;
};

export default spinner;
