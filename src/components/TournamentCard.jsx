import styles from "../styles/components/TournamentCard.module.css";
function TournamentCard({
    tournamentId,
    name,
    status,
    startDate,
    endDate,
    onMatchClick
}) {

    return (

        <div className={styles.tournamentCard}>

            <div className={styles.statusBadge}>

                {status}

            </div>

            <h2>

                {name}

            </h2>

            <div className={styles.dates}>

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
                className={styles.viewBtn}
                onClick={() => onMatchClick(tournamentId)}
            >

                View Matches →

            </button>

        </div>

    );

}

export default TournamentCard;