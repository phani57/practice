import styles from "../../styles/admin/Dashboard.module.css";
import { useEffect, useState } from "react";

import adminDashboardService from "../../services/admin/adminDashboardService";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import StatsGrid from "../../components/admin/dashboard/StatsGrid";

import LiveMatches from "../../components/admin/dashboard/LiveMatches";
import UpcomingMatches from "../../components/admin/dashboard/UpcomingMatches";
function Dashboard() {

    const [stats, setStats] = useState(null);

    const [liveMatches, setLiveMatches] = useState([]);

    const [upcomingMatches, setUpcomingMatches] = useState([]);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data =

                    await adminDashboardService.getDashboardStats();

                console.log(data);

                setStats(data);

                setLiveMatches(

                    data.liveMatchesList

                );

                setUpcomingMatches(

                    data.upcomingMatchesList

                );

            }

            catch (error) {

                console.log(error);

            }

        }

        loadDashboard();

    }, []);

    return (

        <div className={styles.dashboardContainer}>

            <DashboardHeader />

            <StatsGrid stats={stats} />

            <LiveMatches

                liveMatches={liveMatches}

            />

            <UpcomingMatches

                upcomingMatches={upcomingMatches}

            />

        </div>

    );

}

export default Dashboard;