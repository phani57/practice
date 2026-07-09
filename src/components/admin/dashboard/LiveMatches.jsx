import styles from "../../../styles/admin/Dashboard.module.css";
function LiveMatches({ liveMatches }) {

    return (

        <div className={styles.matchSection}>

            <div className={styles.sectionHeader}>

                <h2>

                    🟢 Live Matches

                </h2>

            </div>

            {

                liveMatches.length > 0

                    ?

                    liveMatches.map(match => (

                        <div

                            key={match.id}

                            className={styles.matchCard}

                        >

                            <div className={styles.matchTop}>

                                <h3>

                                    {match.team1.team_name}

                                    <span className={styles.vs}>

                                        {" "}VS{" "}

                                    </span>

                                    {match.team2.team_name}

                                </h3>

                                <span className={styles.liveBadge}>

                                    LIVE

                                </span>

                            </div>

                        </div>

                    ))

                    :

                    <div className={styles.emptyState}>

                        No Live Matches

                    </div>

            }

        </div>

    );

}

export default LiveMatches;