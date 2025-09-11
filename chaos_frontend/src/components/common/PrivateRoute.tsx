import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import Loading from "./Loading.tsx"

interface PrivateRouteProps {
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {

    const isLoading = false;
    const isAuthenticated = true;

    if (isLoading) {
        return <Loading/>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return children ? <>{children}</> : <Outlet/>;
};

export default PrivateRoute;
