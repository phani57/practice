import "../styles/pages/Tournaments.css";
import  { useState, useEffect } from "react";
import TournamentCard from "../components/TournamentCard";
import tournamentService from "../services/tournamentService";
import { useNavigate } from "react-router-dom";

function Tournaments() {
    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([]);
    function viewMatches(id) {

        navigate(`/matches/${id}`);

    }

    useEffect(() => {
        async function loadTournaments() {

            try {

                const data =

                    await tournamentService.getTournaments();

                setTournaments(data);

            }
            catch (error) {

                console.log(error);

            }

        }
        
        loadTournaments();

    }, []);



    return (

        <div>

            <div className="tournaments-container">

                <div className="page-header">

                    <div>

                        <h1>

                            Tournaments

                        </h1>

                        <p>

                            Choose a tournament and start building your fantasy team.

                        </p>

                    </div>

                </div>

                <div className="header-stats">

                    <div className="mini-card">

                        <span>🏆</span>

                        <div>

                            <h3>

                                {tournaments.length}

                            </h3>

                            <small>

                                Total Tournaments

                            </small>

                        </div>

                    </div>

                    <div className="mini-card">

                        <span>🔥</span>

                        <div>

                            <h3>

                                {
                                    tournaments.filter(
                                        t => t.status === "Live"
                                    ).length
                                }

                            </h3>

                            <small>

                                Live

                            </small>

                        </div>

                    </div>

                    <div className="mini-card">

                        <span>📅</span>

                        <div>

                            <h3>

                                {
                                    tournaments.filter(
                                        t => t.status === "Upcoming"
                                    ).length
                                }

                            </h3>

                            <small>

                                Upcoming

                            </small>

                        </div>

                    </div>

                </div>

                <div className="tournaments-grid">

                    {
                        tournaments.map((tournament) => (

                            <TournamentCard

                                key={tournament.id}

                                tournamentId={tournament.id}

                                name={tournament.name}

                                status={tournament.status}

                                startDate={tournament.start_date}

                                endDate={tournament.end_date}

                                onMatchClick={viewMatches}

                            />

                        ))
                    }

                </div>

            </div>


        </div>

    );

}

export default Tournaments;