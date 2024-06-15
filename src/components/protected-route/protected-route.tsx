import {FC, JSX} from "react";
import {useAppSelector} from "../../services/store";
import {Navigate, useLocation} from "react-router-dom";

interface IProtectedRouteProps {
    children: JSX.Element;
    anonymous: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({children, anonymous = false}) => {

    const isLoggedIn = useAppSelector((store) => store.auth.isLoggedIn);
    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isLoggedIn) {
        return <Navigate to={from}/>;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}

export default ProtectedRoute;