// import "../../styles/admin/leaderboard/Leaderboard.css";

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

        <div className="leaderboard-container">

            {/* ==========================
                PAGE HEADER
            ========================== */}

            <div className="page-header">

                <div>

                    <p className="page-subtitle">

                        Rankings

                    </p>

                    <h1 className="page-title">

                        Global Leaderboard

                    </h1>

                </div>

            </div>

            {/* ==========================
                LEADERBOARD TABLE
            ========================== */}

            <div className="table-card">

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

                                            className="empty-state"

                                        >

                                            No Users Found

                                        </td>

                                    </tr>

                                )

                                :

                                users.map(user => (

                                    <tr key={user.id}>

                                        <td>

                                            <span className="rank-badge">

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