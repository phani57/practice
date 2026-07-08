function TournamentsHeader({ onAddTournament }) {
  return (
    <div className="page-header">
      <div>
        <p className="page-subtitle">Tournament Management</p>

        <h1 className="page-title">Tournaments</h1>
      </div>

      <button className="primary-btn" onClick={onAddTournament}>
        + Add Tournament
      </button>
    </div>
  );
}

export default TournamentsHeader;
