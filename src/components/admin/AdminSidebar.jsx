import "../../styles/admin/layout/AdminSidebar.css";
import { NavLink } from "react-router-dom";

function AdminSidebar() {

    return (

        <div className="sidebar">

            <div className="logo">

                <div className="logo-icon">

                    🏆

                </div>

                <div>

                    <h2>

                        Fantasy League

                    </h2>

                    <p>

                        Admin Panel

                    </p>

                </div>

            </div>

            <nav>

                <NavLink to="/admin/dashboard">

                    <span className="icon">

                        🏠

                    </span>

                    <span>

                        Dashboard

                    </span>

                </NavLink>

                <NavLink to="/admin/AdminTournaments">

                    <span className="icon">

                        🏆

                    </span>

                    <span>

                        Tournaments

                    </span>

                </NavLink>

                <NavLink to="/admin/teams">

                    <span className="icon">

                        👥

                    </span>

                    <span>

                        Teams

                    </span>

                </NavLink>

                <NavLink to="/admin/players">

                    <span className="icon">

                        🏏

                    </span>

                    <span>

                        Players

                    </span>

                </NavLink>

                <NavLink to="/admin/users">

                    <span className="icon">

                        👤

                    </span>

                    <span>

                        Users

                    </span>

                </NavLink>

                <NavLink to="/admin/global-leaderboard">

                    <span className="icon">

                        📊

                    </span>

                    <span>

                        Leaderboard

                    </span>

                </NavLink>

                <div className="bottom-menu">

                    <NavLink to="/admin/recycle-bin">

                        <span className="icon">

                            🗑

                        </span>

                        <span>

                            Recycle Bin

                        </span>

                    </NavLink>

                </div>

            </nav>

        </div>

    );

}

export default AdminSidebar;