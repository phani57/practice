import styles from "../../styles/admin/GlobalLeaderboard.module.css";

import { useEffect, useState } from "react";

import leaderboardService from "../../services/admin/leaderboardService";

function GlobalLeaderboard() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadLeaderboard();

    }, []);

    async function loadLeaderboard() {

        try {

            const data = await leaderboardService.getGlobalLeaderboard();

            setUsers(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className={styles.leaderboardContainer}>

            {/* ==========================
                PAGE HEADER
            ========================== */}

            <div className={styles.pageHeader}>

                <div>

                    <p className={styles.pageSubtitle}>

                        Rankings

                    </p>

                    <h1 className={styles.pageTitle}>

                        Global Leaderboard

                    </h1>

                </div>

            </div>

            {/* ==========================
                LEADERBOARD TABLE
            ========================== */}

            <div className={styles.tableCard}>

                <table>

                    <thead>

                        <tr>

                            <th>Rank</th>

                            <th>User</th>

                            <th>Fantasy Points</th>

                            <th>Wallet Balance</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.length === 0 ?

                                (

                                    <tr>

                                        <td

                                            colSpan="4"

                                            className={styles.emptyState}

                                        >

                                            No Users Found

                                        </td>

                                    </tr>

                                )

                                :

                                users.map(user => (

                                    <tr key={user.id}>

                                        <td>

                                            <span className={styles.rankBadge}>

                                                #{user.rank}

                                            </span>

                                        </td>

                                        <td>

                                            {user.name}

                                        </td>

                                        <td>

                                            {user.fantasy_points}

                                        </td>

                                        <td>

                                            ₹ {user.wallet_balance}

                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default GlobalLeaderboard;