import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    // TODO: Use authentication token
    // const localStorageToken = localStorage.getItem("token");
    let user = true;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;