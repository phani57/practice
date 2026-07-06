import "../styles/pages/Matches.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import matchService from "../services/matchService";

function Matches() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        async function loadMatches() {

            try {

                const data =
                    await matchService.getMatches(id);

                setMatches(data);

            }

            catch (error) {

                console.log(error);

            }

        }

        loadMatches();

    }, []);



    function createTeam(matchId) {

        navigate(`/create-team/${matchId}`);

    }

    return (

        <>

            <div className="matches-container">

                <h1>

                    Matches

                </h1>

                {
                    matches.map((match) => (

                        <div
                            key={match.id}
                            className="match-card"
                        >

                            <div className="match-header">

                                <h2>

                                    {match.team1.team_name}

                                    <span className="vs">

                                        VS

                                    </span>

                                    {match.team2.team_name}

                                </h2>

                                <span
                                    className={`status-badge ${match.status.toLowerCase()}`}
                                >

                                    {match.status}

                                </span>

                            </div>

                            <p className="date">

                                📅 {match.match_date}

                            </p>

                            {
                                match.status === "Upcoming"

                                    ?

                                    <button

                                        className="create-team-btn"

                                        onClick={() =>
                                            createTeam(match.id)
                                        }

                                    >

                                        Create Team

                                    </button>

                                    :

                                    match.status === "Live"

                                        ?

                                        <button
                                            disabled
                                            className="live-btn"
                                        >

                                            Match Live

                                        </button>

                                        :

                                        <button
                                            disabled
                                            className="closed-btn"
                                        >

                                            Completed

                                        </button>

                            }

                        </div>

                    ))
                }

                {
                    matches.length === 0 &&

                    <div className="empty-state">

                        No Matches Found

                    </div>

                }

            </div>

        </>

    );

}

export default Matches;