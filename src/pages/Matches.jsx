import styles from "../styles/pages/Matches.module.css";
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

            <div className={styles.matchesContainer}>

                <h1>

                    Matches

                </h1>

                {
                    matches.map((match) => (

                        <div
                            key={match.id}
                            className={styles.matchCard}
                        >

                            <div className={styles.matchHeader}>

                                <h2>

                                    {match.team1.team_name}

                                    <span className={styles.vs}>

                                        VS

                                    </span>

                                    {match.team2.team_name}

                                </h2>

                                <span
                                    className={`${styles.statusBadge} ${styles[match.status.toLowerCase()] || ''}`}
                                >

                                    {match.status}

                                </span>

                            </div>

                            <p className={styles.date}>

                                📅 {match.match_date}

                            </p>

                            {
                                match.status === "Upcoming"

                                    ?

                                    <button

                                        className={styles.createTeamBtn}

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
                                            className={styles.liveBtn}
                                        >

                                            Match Live

                                        </button>

                                        :

                                        <button
                                            disabled
                                            className={styles.closedBtn}
                                        >

                                            Completed

                                        </button>

                            }

                        </div>

                    ))
                }

                {
                    matches.length === 0 &&

                    <div className={styles.emptyState}>

                        No Matches Found

                    </div>

                }

            </div>

        </>

    );

}

export default Matches;