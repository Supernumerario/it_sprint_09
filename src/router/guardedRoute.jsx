import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function GuardedRoute ({ auth, children }) {
  if (!auth) {
    console.log("User not logged in. Redirecting to homepage.");
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
}

export default GuardedRoute;