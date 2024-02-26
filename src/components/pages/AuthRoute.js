import React from 'react'
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ component, allowedRoles }) {
    // const { auth } = useAuth();
    const location = useLocation();
  
    const hasPermission = allowedRoles
      ? allowedRoles.find(
          (r) => r.toLowerCase() === (auth?.roles || "").toLowerCase()
        )
      : true;
  
    return auth?.accessToken && hasPermission ? (
      component
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
}
