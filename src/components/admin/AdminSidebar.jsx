import styles from "../../styles/admin/Layout/AdminSidebar.module.css";
import { NavLink } from "react-router-dom";

function AdminSidebar() {

    return (

        <div className={styles.sidebar}>

            <div className={styles.logo}>

                <div className={styles.logoIcon}>

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

                    <span className={styles.icon}>

                        🏠

                    </span>

                    <span>

                        Dashboard

                    </span>

                </NavLink>

                <NavLink to="/admin/tournaments">

                    <span className={styles.icon}>

                        🏆

                    </span>

                    <span>

                        Tournaments

                    </span>

                </NavLink>

                <NavLink to="/admin/teams">

                    <span className={styles.icon}>

                        👥

                    </span>

                    <span>

                        Teams

                    </span>

                </NavLink>

                <NavLink to="/admin/players">

                    <span className={styles.icon}>

                        🏏

                    </span>

                    <span>

                        Players

                    </span>

                </NavLink>

                <NavLink to="/admin/users">

                    <span className={styles.icon}>

                        👤

                    </span>

                    <span>

                        Users

                    </span>

                </NavLink>

                <NavLink to="/admin/global-leaderboard">

                    <span className={styles.icon}>

                        📊

                    </span>

                    <span>

                        Leaderboard

                    </span>

                </NavLink>

                <NavLink to="/admin/AdminAnnouncement">

                    <span className={styles.icon}>

                        📢

                    </span>

                    <span>

                        Announcements

                    </span>

                </NavLink>

                <div className={styles.bottomMenu}>

                    <NavLink to="/admin/recycle-bin">

                        <span className={styles.icon}>

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