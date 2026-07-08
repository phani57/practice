function TournamentInfo({ tournament }) {
  return (
    <>
      {/* ===========================
                PAGE HEADER
            =========================== */}

      <div className="page-header">
        <div>
          <p className="page-subtitle">Tournament Details</p>

          <h1 className="page-title">{tournament.name}</h1>
        </div>

        <div className={`status-badge ${tournament.status.toLowerCase()}`}>
          {tournament.status}
        </div>
      </div>

      {/* ===========================
                TOURNAMENT INFO
            =========================== */}

      <div className="info-card">
        <div className="info-item">
          <span>Start Date</span>

          <strong>{tournament.start_date}</strong>
        </div>

        <div className="info-item">
          <span>End Date</span>

          <strong>{tournament.end_date}</strong>
        </div>
      </div>

      {/* ===========================
                PARTICIPATING TEAMS
            =========================== */}

      <div className="card">
        <h2>Participating Teams</h2>

        <div className="teams">
          {tournament.teams.map((team) => (
            <span key={team.id} className="team-chip">
              {team.team_name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default TournamentInfo;
