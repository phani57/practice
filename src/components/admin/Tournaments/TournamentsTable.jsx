import styles from "../../../styles/admin/AdminTournaments.module.css";
function TournamentsTable({
  tournaments,

  onEdit,

  onDelete,

  onView,
}) {
  return (
    <div className={styles.tableCard}>
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
                  className={`${styles.status} ${ tournament.status === "Live" ? styles.live : tournament.status === "Upcoming" ? styles.upcoming : styles.completed }`}
                >
                  {tournament.status}
                </span>
              </td>

              <td>{tournament.teams.length}</td>

              <td className={styles.actions}>
                <button className={styles.editBtn} onClick={() => onEdit(tournament)}>
                  Edit
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(tournament.id)}
                >
                  Delete
                </button>

                <button
                  className={styles.viewBtn}
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
