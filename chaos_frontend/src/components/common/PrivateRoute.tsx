import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "@/context/AuthContext.tsx";
import Loading from "./Loading.tsx"

interface PrivateRouteProps {
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const {isAuthenticated, isLoading} = useAuth();

    if (isLoading) {
        return <Loading/>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return children ? <>{children}</> : <Outlet/>;
};

export default PrivateRoute;
