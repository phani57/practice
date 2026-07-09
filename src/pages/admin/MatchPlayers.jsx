import styles from "../../styles/admin/MatchPlayers.module.css";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import tournamentService from "../../services/admin/tournamentService";

function MatchPlayers() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);

  const [team1Players, setTeam1Players] = useState([]);

  const [team2Players, setTeam2Players] = useState([]);

  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  // Load match players from backend
  async function loadPlayers() {
    try {
      const response = await tournamentService.getMatchPlayers(id);

      setMatch(response.match);

      setTeam1Players(response.team1Players);

      setTeam2Players(response.team2Players);

      setSelectedPlayers(response.selectedPlayers);

      restoreDraft();
    } catch (error) {
      console.log(error);
    }
  }

  // Select or unselect player
  function togglePlayer(playerId, e) {
    let updatedPlayers;

    if (e.target.checked) {
      updatedPlayers = [...selectedPlayers, playerId];
    } else {
      updatedPlayers = selectedPlayers.filter((id) => id !== playerId);
    }

    setSelectedPlayers(updatedPlayers);

    saveDraft(updatedPlayers);
  }

  // Toggle all players for a specific team
  function toggleTeamSelectAll(teamPlayers) {
    const teamPlayerIds = teamPlayers.map((p) => p.id);
    const isAllSelected =
      teamPlayerIds.length > 0 &&
      teamPlayerIds.every((id) => selectedPlayers.includes(id));

    let updatedPlayers;

    if (isAllSelected) {
      updatedPlayers = selectedPlayers.filter((id) => !teamPlayerIds.includes(id));
    } else {
      const otherPlayers = selectedPlayers.filter((id) => !teamPlayerIds.includes(id));
      updatedPlayers = [...otherPlayers, ...teamPlayerIds];
    }

    setSelectedPlayers(updatedPlayers);

    saveDraft(updatedPlayers);
  }

  // Save Playing XI
  async function savePlayers() {
    if (selectedPlayers.length !== 22) {
      toast.warning("Select exactly 22 players");

      return;
    }

    try {
      const response = await tournamentService.savePlayingXI(
        id,

        selectedPlayers,
      );

      toast.success(response.message);

      clearDraft();
      
      navigate(-1); // Redirect back
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to save Playing XI");
    }
  }

  // Rehydration
  function saveDraft(players) {
    localStorage.setItem(
      `playingXI_${id}`,

      JSON.stringify(players),
    );
  }

  function loadDraft() {
    const draft = localStorage.getItem(`playingXI_${id}`);

    return draft ? JSON.parse(draft) : null;
  }

  function restoreDraft() {
    const draft = loadDraft();

    if (!draft) {
      return;
    }

    setSelectedPlayers(draft);
  }

  function clearDraft() {
    localStorage.removeItem(`playingXI_${id}`);
  }

  if (!match) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.playingxiContainer}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.pageSubtitle}>Match Management</p>

          <h1 className={styles.pageTitle}>
            {match.team1.team_name} VS {match.team2.team_name}
          </h1>
        </div>
      </div>

      <div className={styles.teamsGrid}>
        <div className={styles.teamCard}>
          <div className={styles.teamHeader}>
            <div className={styles.teamNameGroup}>
              <h2>{match.team1.team_name}</h2>
              <button
                type="button"
                onClick={() => toggleTeamSelectAll(team1Players)}
                className={styles.selectAllBtn}
              >
                {team1Players.length > 0 && team1Players.every((p) => selectedPlayers.includes(p.id))
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
            <span className={styles.selectionCount}>
              {team1Players.filter((p) => selectedPlayers.includes(p.id)).length} / {team1Players.length} Selected
            </span>
          </div>

          <div className={styles.playersList}>
            {team1Players.map((player) => (
              <label key={player.id} className={styles.playerItem}>
                <input
                  type="checkbox"
                  checked={selectedPlayers.includes(player.id)}
                  onChange={(e) => togglePlayer(player.id, e)}
                />

                <span>{player.player_name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.teamCard}>
          <div className={styles.teamHeader}>
            <div className={styles.teamNameGroup}>
              <h2>{match.team2.team_name}</h2>
              <button
                type="button"
                onClick={() => toggleTeamSelectAll(team2Players)}
                className={styles.selectAllBtn}
              >
                {team2Players.length > 0 && team2Players.every((p) => selectedPlayers.includes(p.id))
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
            <span className={styles.selectionCount}>
              {team2Players.filter((p) => selectedPlayers.includes(p.id)).length} / {team2Players.length} Selected
            </span>
          </div>

          <div className={styles.playersList}>
            {team2Players.map((player) => (
              <label key={player.id} className={styles.playerItem}>
                <input
                  type="checkbox"
                  checked={selectedPlayers.includes(player.id)}
                  onChange={(e) => togglePlayer(player.id, e)}
                />

                <span>{player.player_name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.saveSection}>
        <button className={styles.saveBtn} onClick={savePlayers}>
          Save Playing XI
        </button>
      </div>
    </div>
  );
}

export default MatchPlayers;
