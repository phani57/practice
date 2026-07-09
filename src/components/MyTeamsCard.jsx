import styles from "../styles/pages/MyTeams.module.css";
function TeamCard({

    team,

    expanded,

    onView,

    onDelete,

    onEdit

}) {

    return (

        <div className={styles.teamCard}>

            <div className={styles.cardTop}>

                <h2>

                    {team.team_name}

                </h2>

                <span
                    className={`${styles.status} ${styles[team.match.status.toLowerCase()] || ''}`}
                >

                    {team.match.status}

                </span>

            </div>

            <div className={styles.matchBox}>

                <div className={styles.teamName}>

                    {team.match.team1.team_name}

                </div>

                <div className={styles.vs}>

                    VS

                </div>

                <div className={styles.teamName}>

                    {team.match.team2.team_name}

                </div>

            </div>

            <div className={styles.matchDate}>

                📅 {team.match.match_date}

            </div>

            <div className={styles.actions}>

                <button
                    className={styles.viewBtn}
                    onClick={() => onView(team.id)}
                >

                    View Team

                </button>

                {
                    team.match.status === "Upcoming"

                        ?

                        <button
                            className={styles.editBtn}
                            onClick={() => onEdit(team.id)}
                        >

                            Edit

                        </button>

                        :

                        <button
                            className={styles.lockedBtn}
                            disabled
                        >

                            🔒 Locked

                        </button>
                }

                <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(team.id)}
                >

                    Delete

                </button>

            </div>



        </div>

    );

}

export default TeamCard;