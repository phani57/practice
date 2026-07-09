import styles from "../../../styles/admin/AdminTournaments.module.css";
function TournamentsHeader({ onAddTournament }) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <p className={styles.pageSubtitle}>Tournament Management</p>

        <h1 className={styles.pageTitle}>Tournaments</h1>
      </div>

      <button className={styles.primaryBtn} onClick={onAddTournament}>
        + Add Tournament
      </button>
    </div>
  );
}

export default TournamentsHeader;
