import "../styles/components/Navbar.css";
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

        <nav className="navbar">

            <div className="logo">

                <NavLink to="/dashboard">

                    <span className="logo-icon">🏆</span>

                    <span className="logo-text">
                        Fantasy League
                    </span>

                </NavLink>

            </div>

            <div className="menu">

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

            <div className="right-section">

                {user && (

                    <>
                        <div className="info-card points">

                            <span className="label">
                                Points
                            </span>

                            <span className="value">
                                🏆 {user.fantasy_points}
                            </span>

                        </div>

                        <div className="info-card wallet">

                            <span className="label">
                                Wallet
                            </span>

                            <span className="value">
                                ₹{user.wallet_balance}
                            </span>

                        </div>

                    </>

                )}

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;