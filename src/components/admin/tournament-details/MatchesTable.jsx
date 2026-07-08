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
    <div className="card">
      <h2>Tournament Matches</h2>

      <div className="table-wrapper">
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
                    className={`status-badge ${match.status.toLowerCase()}`}
                  >
                    {match.status}
                  </span>
                </td>

                <td className="actions">
                  <button className="edit-btn" onClick={() => onEdit(match)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(match.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="view-btn"
                    onClick={() => onPlayers(match.id)}
                  >
                    Playing XI
                  </button>

                  <button
                    className="primary-btn"
                    onClick={() => onScores(match.id)}
                  >
                    Scores
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => onGenerate(match.id)}
                  >
                    Generate
                  </button>

                  <button
                    className="primary-btn"
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
