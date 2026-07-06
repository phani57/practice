import "../styles/components/TournamentCard.css";
function TournamentCard({
    tournamentId,
    name,
    status,
    startDate,
    endDate,
    onMatchClick
}) {

    return (

        <div className="tournament-card">

            <div className="status-badge">

                {status}

            </div>

            <h2>

                {name}

            </h2>

            <div className="dates">

                <div>

                    <span>📅 Start</span>

                    <strong>{startDate}</strong>

                </div>

                <div>

                    <span>🏁 End</span>

                    <strong>{endDate}</strong>

                </div>

            </div>

            <button
                className="view-btn"
                onClick={() => onMatchClick(tournamentId)}
            >

                View Matches →

            </button>

        </div>

    );

}

export default TournamentCard;