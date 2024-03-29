import React from 'react';
import { useLocation, Navigate, Outlet} from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../context/authSlice';


const PrivateRoutes = ({ allowedRoles }) =>{
    const token = useSelector(selectCurrentToken)  
    const location = useLocation();
    const role = token ? JSON.parse(atob(token.split('.')[1])).role : []
    return (
          allowedRoles?.includes(role)
          ? <div> <Navbar/> <Outlet/> <Footer/> </div>
          : token
            ? <Navigate to="/unauthorized" state={{ from: location }} replace/> 
            : <Navigate to="/signin" state={{ from: location }} replace/>
  );
}
export default PrivateRoutes;