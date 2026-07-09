import styles from "../../../styles/admin/TournamentDetails.module.css";

function MatchesTable({
  matches,

  onEdit,

  onDelete,

  onPlayers,

  onScores,

  onGenerate,

  onLeaderboard,
}) {
  return (
    <div className={styles.card}>
      <h2>Tournament Matches</h2>

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Match</th>

              <th>Date</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                <td>
                  {match.team1.team_name} VS {match.team2.team_name}
                </td>

                <td>{match.match_date}</td>

                <td>
                  <span
                    className={`${styles.statusBadge} ${styles[match.status.toLowerCase()] || ''}`}
                  >
                    {match.status}
                  </span>
                </td>

                <td className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => onEdit(match)}>
                    Edit
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(match.id)}
                  >
                    Delete
                  </button>

                  <button
                    className={styles.viewBtn}
                    onClick={() => onPlayers(match.id)}
                  >
                    Playing XI
                  </button>

                  <button
                    className={styles.primaryBtn}
                    onClick={() => onScores(match.id)}
                  >
                    Scores
                  </button>

                  <button
                    className={styles.secondaryBtn}
                    onClick={() => onGenerate(match.id)}
                  >
                    Generate
                  </button>

                  <button
                    className={styles.primaryBtn}
                    onClick={() => onLeaderboard(match.id)}
                  >
                    Leaderboard
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MatchesTable;
