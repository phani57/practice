import styles from "../../../styles/admin/AdminTournaments.module.css";
function TournamentsToolbar({
  searchText,

  onSearchChange,
}) {
  return (
    <div className={styles.toolbar}>
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Search tournaments..."
        value={searchText}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default TournamentsToolbar;
