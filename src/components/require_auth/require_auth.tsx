import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use_auth";

interface requireAuthProps {
    allowedRoles: number[]
}

function RequireAuth({ allowedRoles }: requireAuthProps) {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth?.user);

    return (auth?.roles?.find(role => allowedRoles?.includes(role)) ?
        <Outlet />
        //? we are moving user to login screen and replacing login in their history with the location where they came from :: force authentication
        : auth?.user
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />);
}

export default RequireAuth;
