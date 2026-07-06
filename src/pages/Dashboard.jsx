import "../styles/pages/Dashboard.css";
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

                setMyTeams(data.myTeams);

                setMatchesJoined(data.matchesJoined);

                setRank(data.rank);

                setLiveMatches(data.liveMatches);

                setUpcomingMatches(data.upcomingMatches);

            }

            catch (error) {

                console.log(error);

                setErrorMessage("Unable to load dashboard");

            }

            finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    return (

        <div className="dashboard-container">

            <div className="hero-banner">

                <div className="hero-content">

                    <span className="welcome-text">

                        Welcome Back 👋

                    </span>

                    <h1>

                        Fantasy Dashboard

                    </h1>

                    <p>

                        Manage your fantasy teams and track live matches.

                    </p>

                </div>

                <div className="hero-trophy">

                    🏆

                </div>

            </div>

            {

                loading && (

                    <div className="loading-card">

                        Loading Dashboard...

                    </div>

                )

            }

            {

                errorMessage && (

                    <div className="alert-card">

                        {errorMessage}

                    </div>

                )

            }

            {

                !loading && !errorMessage &&

                <>

                    <div className="stats-container">

                        <div className="stat-card teams">

                            <div className="stat-icon">

                                👥

                            </div>

                            <div>

                                <div className="stat-title">

                                    My Teams

                                </div>

                                <h2>

                                    {myTeams}

                                </h2>

                                <small>

                                    Total Fantasy Teams

                                </small>

                            </div>

                        </div>

                        <div className="stat-card matches">

                            <div className="stat-icon">

                                ⚽

                            </div>

                            <div>

                                <div className="stat-title">

                                    Matches Joined

                                </div>

                                <h2>

                                    {matchesJoined}

                                </h2>

                                <small>

                                    Active Entries

                                </small>

                            </div>

                        </div>

                        <div className="stat-card rank">

                            <div className="stat-icon">

                                🥇

                            </div>

                            <div>

                                <div className="stat-title">

                                    Global Rank

                                </div>

                                <h2>

                                    #{rank}

                                </h2>

                                <small>

                                    Current Position

                                </small>

                            </div>

                        </div>

                    </div>

                    <div className="section-card">

                        <div className="section-title">

                            🔴 Live Matches

                        </div>

                        {

                            liveMatches.length === 0 ?

                                (

                                    <div className="empty-card">

                                        No Live Matches

                                    </div>

                                )

                                :

                                liveMatches.map(match => (

                                    <div

                                        className="match-card"

                                        key={match.id}

                                    >

                                        <div className="team">

                                            {match.team1?.team_name}

                                        </div>

                                        <div className="match-middle">

                                            <div className="vs">

                                                VS

                                            </div>

                                            <span className="live-badge">

                                                LIVE

                                            </span>

                                        </div>

                                        <div className="team">

                                            {match.team2?.team_name}

                                        </div>

                                    </div>

                                ))

                        }

                    </div>

                    <div className="section-card">

                        <div className="section-title">

                            📅 Upcoming Matches

                        </div>

                        {

                            upcomingMatches.length === 0 ?

                                (

                                    <div className="empty-card">

                                        No Upcoming Matches

                                    </div>

                                )

                                :

                                upcomingMatches.map(match => (

                                    <div

                                        className="match-card upcoming"

                                        key={match.id}

                                    >

                                        <div className="team">

                                            {match.team1?.team_name}

                                        </div>

                                        <div className="match-middle">

                                            <div className="vs">

                                                VS

                                            </div>

                                            <small>

                                                {match.match_date}

                                            </small>

                                        </div>

                                        <div className="team">

                                            {match.team2?.team_name}

                                        </div>

                                    </div>

                                ))

                        }

                    </div>

                </>

            }

        </div>

    );

}

export default Dashboard;