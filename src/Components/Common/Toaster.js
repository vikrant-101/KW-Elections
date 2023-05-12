import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Toaster = ()=> {
 return(
  <React.Fragment>
    <ToastContainer theme='dark'/>
  </React.Fragment>
 )
}

export default Toaster;