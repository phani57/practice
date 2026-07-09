import styles from "../../styles/admin/MatchScores.module.css";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import tournamentService from "../../services/admin/tournamentService";

function MatchScores() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [match, setMatch] = useState(null);

  const [players, setPlayers] = useState([]);

  const [scores, setScores] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadScores();
  }, []);

  // Load all player scores
  async function loadScores() {
    try {
      const response = await tournamentService.getMatchScores(id);

      setMatch(response.match);

      setPlayers(response.players);

      const initialScores = {};

      response.players.forEach((player) => {
        if (!player.player) {
          console.log("Invalid Player", player);

          return;
        }

        initialScores[player.player.id] = player.current_score;
      });

      setPlayers(response.players.filter((player) => player.player));

      setScores(initialScores);

      const draft = localStorage.getItem(`matchScores_${id}`);

      if (draft) {
        Object.assign(
          initialScores,

          JSON.parse(draft),
        );
      }

      setScores(initialScores);
    } catch (error) {
      console.log(error);
    }
  }

  // Update score
  function handleScoreChange(playerId, value) {
    const updatedScores = {
      ...scores,

      [playerId]: value,
    };

    setScores(updatedScores);

    saveDraft(updatedScores);
  }

  // Save scores
  async function saveScores() {
    try {
      const response = await tournamentService.saveScores(
        id,

        scores,
      );

      setSuccessMessage(response.message);

      setErrorMessage("");

      clearDraft();

      navigate(`/admin/tournaments/${match.tournament_id}`);
    } catch (error) {
      setSuccessMessage("");

      setErrorMessage(error.response?.data?.message || "Unable to save scores");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  // Rehydration
  function saveDraft(updatedScores) {
    localStorage.setItem(
      `matchScores_${id}`,

      JSON.stringify(updatedScores),
    );
  }

  function clearDraft() {
    localStorage.removeItem(`matchScores_${id}`);
  }

  if (!match) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.scoresContainer}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.pageSubtitle}>Match Score Management</p>

          <h1 className={styles.pageTitle}>
            {match.team1.team_name} VS {match.team2.team_name}
          </h1>
        </div>
      </div>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <div className={styles.tableCard}>
        <table>
          <thead>
            <tr>
              <th>Player</th>

              <th width="180">Current Score</th>

              <th width="220">Update Score</th>
            </tr>
          </thead>

          <tbody>
            {players.map((player) => (
              <tr key={player.player.id}>
                <td>{player.player.player_name}</td>

                <td>
                  <span className={styles.currentScore}>{player.current_score}</span>
                </td>

                <td>
                  <input
                    className={styles.scoreInput}
                    type="number"
                    value={scores[player.player.id] ?? ""}
                    onChange={(e) =>
                      handleScoreChange(
                        player.player.id,

                        e.target.value,
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.saveSection}>
        <button className={styles.saveBtn} onClick={saveScores}>
          Save Scores
        </button>
      </div>
    </div>
  );
}

export default MatchScores;
