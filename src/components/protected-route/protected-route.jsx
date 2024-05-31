import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {

    const {accessToken} = useSelector((state) => state.auth);

    if (accessToken) {
        return <Outlet/>
    } else {
        return <Navigate to="/login"/>;
    }
}

export default ProtectedRoute;