import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({children, anonymous = false}) => {

    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
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