import "../../styles/admin/MatchLeaderboard.css";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import tournamentService from "../../services/admin/tournamentService";

function MatchLeaderboard() {

    const { id } = useParams();

    const [match, setMatch] = useState(null);

    const [leaderboards, setLeaderboards] = useState([]);

    useEffect(() => {

        loadLeaderboard();

    }, []);

    // Load leaderboard for the selected match
    async function loadLeaderboard() {

        try {

            const response = await tournamentService.getLeaderboard(id);

            setMatch(response.match);

            setLeaderboards(response.leaderboards);

        }

        catch (error) {

            console.log(error);

        }

    }

    if (!match) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="leaderboard-container">

            <div className="page-header">

                <div>

                    <p className="page-subtitle">

                        Match Leaderboard

                    </p>

                    <h1 className="page-title">

                        {match.team1.team_name}

                        {" "}VS{" "}

                        {match.team2.team_name}

                    </h1>

                </div>

            </div>

            <div className="table-card">

                <table>

                    <thead>

                        <tr>

                            <th>Rank</th>

                            <th>User</th>

                            <th>Fantasy Points</th>

                            <th>Wallet</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            leaderboards.map(item => (

                                <tr key={item.id}>

                                    <td>

                                        #{item.rank}

                                    </td>

                                    <td>

                                        {item.user?.name}

                                    </td>

                                    <td>

                                        {item.total_points}

                                    </td>

                                    <td>

                                        ₹ {item.user?.wallet_balance}

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

export default MatchLeaderboard;