import styles from "../styles/pages/Dashboard.module.css";
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

        <div className={styles.dashboardContainer}>

            <div className={styles.heroBanner}>

                <div className={styles.heroContent}>

                    <span className={styles.welcomeText}>

                        Welcome Back 👋

                    </span>

                    <h1>

                        Fantasy Dashboard

                    </h1>

                    <p>

                        Manage your fantasy teams and track live matches.

                    </p>

                </div>

                <div className={styles.heroTrophy}>

                    🏆

                </div>

            </div>

            {

                loading && (

                    <div className={styles.loadingCard}>

                        Loading Dashboard...

                    </div>

                )

            }

            {

                errorMessage && (

                    <div className={styles.alertCard}>

                        {errorMessage}

                    </div>

                )

            }

            {

                !loading && !errorMessage &&

                <>

                    <div className={styles.statsContainer}>

                        <div className={`${styles.statCard} ${styles.teams}`}>

                            <div className={styles.statIcon}>

                                👥

                            </div>

                            <div>

                                <div className={styles.statTitle}>

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

                        <div className={`${styles.statCard} ${styles.matches}`}>

                            <div className={styles.statIcon}>

                                ⚽

                            </div>

                            <div>

                                <div className={styles.statTitle}>

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

                        <div className={`${styles.statCard} ${styles.rank}`}>

                            <div className={styles.statIcon}>

                                🥇

                            </div>

                            <div>

                                <div className={styles.statTitle}>

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

                    <div className={styles.sectionCard}>

                        <div className={styles.sectionTitle}>

                            🔴 Live Matches

                        </div>

                        {

                            liveMatches.length === 0 ?

                                (

                                    <div className={styles.emptyCard}>

                                        No Live Matches

                                    </div>

                                )

                                :

                                liveMatches.map(match => (

                                    <div

                                        className={styles.matchCard}

                                        key={match.id}

                                    >

                                        <div className={styles.team}>

                                            {match.team1?.team_name}

                                        </div>

                                        <div className={styles.matchMiddle}>

                                            <div className={styles.vs}>

                                                VS

                                            </div>

                                            <span className={styles.liveBadge}>

                                                LIVE

                                            </span>

                                        </div>

                                        <div className={styles.team}>

                                            {match.team2?.team_name}

                                        </div>

                                    </div>

                                ))

                        }

                    </div>

                    <div className={styles.sectionCard}>

                        <div className={styles.sectionTitle}>

                            📅 Upcoming Matches

                        </div>

                        {

                            upcomingMatches.length === 0 ?

                                (

                                    <div className={styles.emptyCard}>

                                        No Upcoming Matches

                                    </div>

                                )

                                :

                                upcomingMatches.map(match => (

                                    <div

                                        className={`${styles.matchCard} ${styles.upcoming}`}

                                        key={match.id}

                                    >

                                        <div className={styles.team}>

                                            {match.team1?.team_name}

                                        </div>

                                        <div className={styles.matchMiddle}>

                                            <div className={styles.vs}>

                                                VS

                                            </div>

                                            <small>

                                                {match.match_date}

                                            </small>

                                        </div>

                                        <div className={styles.team}>

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