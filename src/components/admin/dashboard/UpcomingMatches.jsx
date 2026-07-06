function UpcomingMatches({ upcomingMatches }) {

    return (

        <div className="match-section">

            <div className="section-header">

                <h2>

                    📅 Upcoming Matches

                </h2>

            </div>

            {

                upcomingMatches.length > 0

                    ?

                    upcomingMatches.map(match => (

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

                            </div>

                            <p className="match-date">

                                {

                                    new Date(

                                        match.match_date

                                    ).toLocaleString()

                                }

                            </p>

                        </div>

                    ))

                    :

                    <div className="empty-state">

                        No Upcoming Matches

                    </div>

            }

        </div>

    );

}

export default UpcomingMatches;