import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, redirectTo  = '/register'}) => {
  const {loggedInUser} = useSelector((state) => state.auth);

  return loggedInUser ? children : (<Navigate to={redirectTo} state={
    {
      redirectFromCheckout: true,
    }
  } 
  
  />
 );
}

export default ProtectedRoute