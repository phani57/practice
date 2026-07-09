import styles from "../../../styles/admin/TournamentDetails.module.css";
function TournamentInfo({ tournament }) {
  return (
    <>
      {/* ===========================
                PAGE HEADER
            =========================== */}

      <div className={styles.pageHeader}>
        <div>
          <p className={styles.pageSubtitle}>Tournament Details</p>

          <h1 className={styles.pageTitle}>{tournament.name}</h1>
        </div>

        <div className={`${styles.statusBadge} ${styles[tournament.status.toLowerCase()] || ''}`}>
          {tournament.status}
        </div>
      </div>

      {/* ===========================
                TOURNAMENT INFO
            =========================== */}

      <div className={styles.infoCard}>
        <div className={styles.infoItem}>
          <span>Start Date</span>

          <strong>{tournament.start_date}</strong>
        </div>

        <div className={styles.infoItem}>
          <span>End Date</span>

          <strong>{tournament.end_date}</strong>
        </div>
      </div>

      {/* ===========================
                PARTICIPATING TEAMS
            =========================== */}

      <div className={styles.card}>
        <h2>Participating Teams</h2>

        <div className={styles.teams}>
          {tournament.teams.map((team) => (
            <span key={team.id} className={styles.teamChip}>
              {team.team_name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default TournamentInfo;
