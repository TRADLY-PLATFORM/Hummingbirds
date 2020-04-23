import React, { Component } from 'react';
import { toast, ToastContainer, Slide } from 'react-toastify'; //, Zoom, Flip, Bounce
import "react-toastify/dist/ReactToastify.css";


class Toast extends Component{
    render(){ 
        console.log(this.props);
        if(this.props.message != null && this.props.type!=null){
            if (! toast.isActive(this.toastId)) {
                if(this.props.type === 'error'){
                    this.toastId = toast.error(this.props.message);
               }else if(this.props.type === 'success'){
                    this.toastId = toast.success(this.props.message);
               }else if(this.props.type === 'warning'){
                    this.toastId = toast.warning(this.props.message);
               }else if(this.props.type === 'info'){
                    this.toastId = toast.info(this.props.message);
               }else{
                    this.toastId = toast.default(this.props.message); 
               }
            }
        }

        return (<ToastContainer position="top-center" transition={Slide} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover/>);
    }
}
// autoClose={1000} 

export default React.memo(Toast);