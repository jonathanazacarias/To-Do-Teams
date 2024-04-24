import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/contexts";

export default function ProtectedRoutes() {
    const auth = useAuth();

    return auth.user ? <Outlet /> : <Navigate to="/login" replace />;
}
