import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

function Dashboard() {
    const [myTeams, setMyTeams] = useState(0);
    const [matchesJoined, setMatchesJoined] = useState(0);
    const [rank, setRank] = useState(0);

    const [liveMatches, setLiveMatches] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await dashboardService.getDashboardData();

                // console.log(data);

                setMyTeams(data.myTeams);
                setMatchesJoined(data.matchesJoined);
                setRank(data.rank);

                setLiveMatches(data.liveMatches);
                setUpcomingMatches(data.upcomingMatches);
            } catch (error) {
                console.error(error);

                setErrorMessage("Unable to load dashboard");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            {loading && <h3>Loading Dashboard...</h3>}

            {errorMessage && (
                <h3 style={{ color: "red" }}>
                    {errorMessage}
                </h3>
            )}

            {!loading && !errorMessage && (
                <>
                    <h2>My Teams: {myTeams}</h2>

                    <h2>Matches Joined: {matchesJoined}</h2>

                    <h2>Rank: #{rank}</h2>

                    <hr />

                    <h2>Live Matches</h2>

                    {liveMatches.length === 0 ? (
                        <p>No Live Matches</p>
                    ) : (
                        liveMatches.map((match) => (
                            <div key={match.id}>
                                {match.team1?.team_name} VS {match.team2?.team_name}
                            </div>
                        ))
                    )}

                    <hr />

                    <h2>Upcoming Matches</h2>

                    {upcomingMatches.length === 0 ? (
                        <p>No Upcoming Matches</p>
                    ) : (
                        upcomingMatches.map((match) => (
                            <div key={match.id}>
                                {match.team1?.team_name} VS {match.team2?.team_name}
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
}

export default Dashboard;