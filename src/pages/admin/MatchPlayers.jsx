import "../../styles/admin/MatchPlayers.css";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import tournamentService from "../../services/admin/tournamentService";

function MatchPlayers() {
  const { id } = useParams();

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

  // Save Playing XI
  async function savePlayers() {
    if (selectedPlayers.length !== 22) {
      alert("Select exactly 22 players");

      return;
    }

    try {
      const response = await tournamentService.savePlayingXI(
        id,

        selectedPlayers,
      );

      alert(response.message);

      clearDraft();
    } catch (error) {
      console.log(error);
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
    <div className="playingxi-container">
      <div className="page-header">
        <div>
          <p className="page-subtitle">Match Management</p>

          <h1 className="page-title">
            {match.team1.team_name} VS {match.team2.team_name}
          </h1>
        </div>
      </div>

      <div className="teams-grid">
        <div className="team-card">
          <h2>{match.team1.team_name}</h2>

          <div className="players-list">
            {team1Players.map((player) => (
              <label key={player.id} className="player-item">
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

        <div className="team-card">
          <h2>{match.team2.team_name}</h2>

          <div className="players-list">
            {team2Players.map((player) => (
              <label key={player.id} className="player-item">
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

      <div className="save-section">
        <button className="save-btn" onClick={savePlayers}>
          Save Playing XI
        </button>
      </div>
    </div>
  );
}

export default MatchPlayers;
