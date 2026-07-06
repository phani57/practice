import "../../styles/admin/layout/AdminHeader.css";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

function AdminHeader() {

    const navigate = useNavigate();



    const user = authService.getUser();
    function logout() {

        authService.logout();

        navigate("/");

    }

    return (

        <header className="admin-header">

            <div className="header-left">

                <div className="page-info">

                    <p className="page-label">

                        ADMIN PANEL

                    </p>

                    <h2>

                        Fantasy League

                    </h2>

                </div>

            </div>

            <div className="header-right">

                <div className="admin-profile">

                    <div className="avatar">

                        A

                    </div>

                    <div className="admin-info">

                        <span className="admin-name">

                            {user.name}

                        </span>

                        <span className="admin-role">

                            {user.role}

                        </span>


                    </div>

                </div>

                <button

                    className="logout-btn"

                    onClick={logout}

                >

                    Logout

                </button>

            </div>

        </header>

    );

}

export default AdminHeader;