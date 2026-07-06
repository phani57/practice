import { Navigate } from "react-router-dom";
import authService from "../services/authService";

function ProtectedRoute({ children, role }) {

    const token = authService.getToken();

    const user = authService.getUser();

    if (!token) {

        return <Navigate to="/" replace />;

    }

    if (role && user.role !== role) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;