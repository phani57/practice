import styles from "../../styles/admin/layout/AdminHeader.module.css";
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

        <header className={styles.adminHeader}>

            <div className={styles.headerLeft}>

                <div className={styles.pageInfo}>

                    <p className={styles.pageLabel}>

                        ADMIN PANEL

                    </p>

                    <h2>

                        Fantasy League

                    </h2>

                </div>

            </div>

            <div className={styles.headerRight}>

                <div className={styles.adminProfile}>

                    <div className={styles.avatar}>

                        A

                    </div>

                    <div className={styles.adminInfo}>

                        <span className={styles.adminName}>

                            {user.name}

                        </span>

                        <span className={styles.adminRole}>

                            {user.role}

                        </span>


                    </div>

                </div>

                <button

                    className={styles.logoutBtn}

                    onClick={logout}

                >

                    Logout

                </button>

            </div>

        </header>

    );

}

export default AdminHeader;