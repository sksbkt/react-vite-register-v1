import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use_auth";
import jwt_decode from "jwt-decode";

interface requireAuthProps {
    allowedRoles: number[]
}

function RequireAuth({ allowedRoles }: requireAuthProps) {
    const { auth } = useAuth();
    const location = useLocation();

    const decoded: any = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined;

    const roles: number[] = decoded?.UserInfo?.roles || [];
    console.log(`ROLES FOUND ${roles} AUTH:${JSON.stringify(auth)}`);

    return (roles.find(role => allowedRoles?.includes(role)) ?
        <Outlet />
        //? we are moving user to login screen and replacing login in their history with the location where they came from :: force authentication
        : auth?.accessToken
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />);
}

export default RequireAuth;
