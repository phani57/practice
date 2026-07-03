import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import authService from "../services/authService";


function Navbar() {

    const navigate = useNavigate();
    const { user,setUser } = useContext(AuthContext);
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

                <Link to="/dashboard">

                    <span className="logo-icon">🏆</span>

                    <span className="logo-text">
                        Fantasy League
                    </span>

                </Link>

            </div>
            {user && (
    <h3>Welcome {user.name}</h3>
)}

            <div className="menu">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/tournaments">
                    Tournaments
                </Link>

                <Link to="/my-teams">
                    My Teams
                </Link>

                <Link to="/leaderboard">
                    Leaderboard
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

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