import styles from "../../../styles/admin/Dashboard.module.css";
function UpcomingMatches({ upcomingMatches }) {

    return (

        <div className={styles.matchSection}>

            <div className={styles.sectionHeader}>

                <h2>

                    📅 Upcoming Matches

                </h2>

            </div>

            {

                upcomingMatches.length > 0

                    ?

                    upcomingMatches.map(match => (

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

                            </div>

                            <p className={styles.matchDate}>

                                {

                                    new Date(

                                        match.match_date

                                    ).toLocaleString()

                                }

                            </p>

                        </div>

                    ))

                    :

                    <div className={styles.emptyState}>

                        No Upcoming Matches

                    </div>

            }

        </div>

    );

}

export default UpcomingMatches;