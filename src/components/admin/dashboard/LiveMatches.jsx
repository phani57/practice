function LiveMatches({ liveMatches }) {

    return (

        <div className="match-section">

            <div className="section-header">

                <h2>

                    🟢 Live Matches

                </h2>

            </div>

            {

                liveMatches.length > 0

                    ?

                    liveMatches.map(match => (

                        <div

                            key={match.id}

                            className="match-card"

                        >

                            <div className="match-top">

                                <h3>

                                    {match.team1.team_name}

                                    <span className="vs">

                                        {" "}VS{" "}

                                    </span>

                                    {match.team2.team_name}

                                </h3>

                                <span className="live-badge">

                                    LIVE

                                </span>

                            </div>

                        </div>

                    ))

                    :

                    <div className="empty-state">

                        No Live Matches

                    </div>

            }

        </div>

    );

}

export default LiveMatches;