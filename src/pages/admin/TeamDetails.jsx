import styles from "../../styles/admin/TeamDetails.module.css";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import teamService from "../../services/admin/teamService";

function TeamDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [team, setTeam] = useState(null);

  // Load selected team details
  useEffect(() => {
    loadTeam();
  }, []);

  // Fetch team from backend
  async function loadTeam() {
    try {
      const data = await teamService.getTeam(id);

      setTeam(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Navigate back to teams page
  function goBack() {
    navigate("/admin/teams");
  }

  return (
    <div className={styles.teamDetails}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.pageSubtitle}>Team Details</p>

          <h1 className={styles.pageTitle}>{team?.team_name}</h1>
        </div>

        <button className={styles.backBtn} onClick={goBack}>
          ← Back
        </button>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoItem}>
          <span>Total Players</span>

          <strong>{team?.players?.length}</strong>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table>
          <thead>
            <tr>
              <th>Player</th>

              <th>Country</th>

              <th>Age</th>

              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {team?.players?.map((player) => (
              <tr key={player.id}>
                <td>{player.player_name}</td>

                <td>{player.country}</td>

                <td>{player.age}</td>

                <td>₹ {player.player_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamDetails;
