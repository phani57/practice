import styles from "../../styles/admin/Dashboard.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import adminDashboardService from "../../services/admin/adminDashboardService";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import StatsGrid from "../../components/admin/dashboard/StatsGrid";

import LiveMatches from "../../components/admin/dashboard/LiveMatches";
import UpcomingMatches from "../../components/admin/dashboard/UpcomingMatches";

import SignatureModal from "../../components/SignatureModal";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const [liveMatches, setLiveMatches] = useState([]);

  const [upcomingMatches, setUpcomingMatches] = useState([]);

  //practice --sample data from api
  const [externalUsers, setExternalUsers] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);

  async function fetchExternalUsers() {
    try {
      setLoadingUsers(true);

      const data = await adminDashboardService.getExternalUsers();

      setExternalUsers(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch users.");
    } finally {
      setLoadingUsers(false);
    }
  }

  //signature
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await adminDashboardService.getDashboardStats();

        console.log(data);

        setStats(data);

        setLiveMatches(data.liveMatchesList);

        setUpcomingMatches(data.upcomingMatchesList);
      } catch (error) {
        console.log(error);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader />

      <StatsGrid stats={stats} />

      <LiveMatches liveMatches={liveMatches} />

      <UpcomingMatches upcomingMatches={upcomingMatches} />

      <button onClick={() => setOpen(true)}>Open Signature</button>

      {open && <SignatureModal onClose={() => setOpen(false)} />}

      {/* practice sample data from api */}
      <button onClick={fetchExternalUsers}>Fetch External Users</button>
      {loadingUsers && <p>Loading users...</p>}
      {externalUsers.map((user) => (
        <div key={user.id} className={styles.externalUserCard}>
          <h3>{user.name}</h3>

          <p>Email : {user.email}</p>

          <p>Phone : {user.phone}</p>

          <p>Website : {user.website}</p>

          <p>Company : {user.company.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
