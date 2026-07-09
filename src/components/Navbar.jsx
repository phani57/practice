import styles from "../styles/components/Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import authService from "../services/authService";


function Navbar() {

    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    async function logout() {

        try {

            await authService.logout();


        }
        catch (error) {

            console.log(error);

        }
        finally {

            authService.clearAuth();

            setUser(null);

            navigate("/");

        }

    }
    return (

        <nav className={styles.navbar}>

            <div className={styles.logo}>

                <NavLink to="/dashboard">

                    <span className={styles.logoIcon}>🏆</span>

                    <span className={styles.logoText}>
                        Fantasy League
                    </span>

                </NavLink>

            </div>

            <div className={styles.menu}>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/tournaments"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Tournaments
                </NavLink>

                <NavLink
                    to="/my-teams"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    My Teams
                </NavLink>

                <NavLink
                    to="/leaderboard"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Leaderboard
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Profile
                </NavLink>

            </div>

            <div className={styles.rightSection}>

                {user && (

                    <>
                        <div className={`${styles.infoCard} ${styles.points}`}>

                            <span className={styles.label}>
                                Points
                            </span>

                            <span className={styles.value}>
                                🏆 {user.fantasy_points}
                            </span>

                        </div>

                        <div className={`${styles.infoCard} ${styles.wallet}`}>

                            <span className={styles.label}>
                                Wallet
                            </span>

                            <span className={styles.value}>
                                ₹{user.wallet_balance}
                            </span>

                        </div>

                    </>

                )}

                <button
                    className={styles.logoutBtn}
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;