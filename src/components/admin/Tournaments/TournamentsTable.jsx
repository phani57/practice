function TournamentsTable({
  tournaments,

  onEdit,

  onDelete,

  onView,
}) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Start Date</th>

            <th>End Date</th>

            <th>Status</th>

            <th>Teams</th>

            <th width="260">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <td>{tournament.name}</td>

              <td>{tournament.start_date}</td>

              <td>{tournament.end_date}</td>

              <td>
                <span
                  className={`status ${
                    tournament.status === "Live"
                      ? "live"
                      : tournament.status === "Upcoming"
                        ? "upcoming"
                        : "completed"
                  }`}
                >
                  {tournament.status}
                </span>
              </td>

              <td>{tournament.teams.length}</td>

              <td className="actions">
                <button className="edit-btn" onClick={() => onEdit(tournament)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(tournament.id)}
                >
                  Delete
                </button>

                <button
                  className="view-btn"
                  onClick={() => onView(tournament.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TournamentsTable;
