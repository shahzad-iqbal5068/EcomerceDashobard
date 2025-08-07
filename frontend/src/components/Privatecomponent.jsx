import React from "react";
import {Navigate,Outlet} from 'react-router-dom';

const Privatecomponent = ()=>{
    const auth = localStorage.getItem('userid');
    return auth ? <Outlet/> :<Navigate to="/login"/>
}

export default Privatecomponent;