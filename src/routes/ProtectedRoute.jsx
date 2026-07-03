import { Navigate } from "react-router-dom";

import authService from "../services/authService";

function ProtectedRoute({ children }) {

    const token = authService.getToken();

    if (!token) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;