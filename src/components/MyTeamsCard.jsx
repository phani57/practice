function TeamCard({

    team,

    expanded,

    onToggle,

    onDelete,

    onEdit

}) {

    return (

        <div className="team-card">

            <div className="card-top">

                <h2>

                    {team.team_name}

                </h2>

                <span
                    className={`status ${team.match.status.toLowerCase()}`}
                >

                    {team.match.status}

                </span>

            </div>

            <div className="match-box">

                <div className="team-name">

                    {team.match.team1.team_name}

                </div>

                <div className="vs">

                    VS

                </div>

                <div className="team-name">

                    {team.match.team2.team_name}

                </div>

            </div>

            <div className="match-date">

                📅 {team.match.match_date}

            </div>

            <div className="actions">

                <button
                    className="view-btn"
                    onClick={() => onToggle(team.id)}
                >

                    {expanded
                        ? "Hide Team"
                        : "View Team"}

                </button>

                {
                    team.match.status === "Upcoming"

                        ?

                        <button
                            className="edit-btn"
                            onClick={() => onEdit(team.id)}
                        >

                            Edit

                        </button>

                        :

                        <button
                            className="locked-btn"
                            disabled
                        >

                            🔒 Locked

                        </button>
                }

                <button
                    className="delete-btn"
                    onClick={() => onDelete(team.id)}
                >

                    Delete

                </button>

            </div>

            {

                expanded && (

                    <div className="players-section">

                        <h3>

                            Selected Players

                        </h3>

                        <div className="players-grid">

                            {

                                team.players.map(player => (

                                    <div
                                        key={player.id}
                                        className="player-card"
                                    >

                                        <span>

                                            {player.player_name}

                                        </span>

                                        <div className="badges">

                                            {

                                                player.pivot.is_captain === 1 && (

                                                    <span className="captain">

                                                        C

                                                    </span>

                                                )

                                            }

                                            {

                                                player.pivot.is_vice_captain === 1 && (

                                                    <span className="vice">

                                                        VC

                                                    </span>

                                                )

                                            }

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default TeamCard;