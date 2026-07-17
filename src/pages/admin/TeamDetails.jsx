import styles from "../../styles/admin/TeamDetails.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import teamService from "../../services/admin/teamService";

function TeamDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  /**
   * Invokes the teamService to retrieve the team player CSV data as a Blob,
   * generates a temporary local Object URL, and programmatically clicks a hidden anchor
   * element to save the file. Releases the temporary Object URL afterward.
   */
  async function downloadCsv() {
    try {
      const response = await teamService.downloadTeamCsv(id);

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", `${team.team_name}.csv`);

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDownloadExcel = async (id) => {
    try {
      const response = await teamService.downloadTeamExcel(id);

      const blob = new Blob([response.data]);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "players.xlsx";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  async function downloadPdf() {
    try {
      const response = await teamService.downloadTeamPdf(id);

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", `${team.team_name}.pdf`);

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.teamDetails}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.pageSubtitle}>Team Details</p>

          <h1 className={styles.pageTitle}>{team?.team_name}</h1>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.dropdownContainer}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Download ↓
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    downloadCsv();
                    setDropdownOpen(false);
                  }}
                >
                  Download CSV
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    handleDownloadExcel(team?.id);
                    setDropdownOpen(false);
                  }}
                >
                  Download Excel
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    downloadPdf();
                    setDropdownOpen(false);
                  }}
                >
                  Download PDF
                </button>
              </div>
            )}
          </div>

          <button className={styles.backBtn} onClick={goBack}>
            ← Back
          </button>
        </div>
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
