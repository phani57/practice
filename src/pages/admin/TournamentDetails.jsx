import "../../styles/admin/TournamentDetails.css";

import { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import tournamentService from "../../services/admin/tournamentService";

import TournamentInfo from "../../components/admin/tournament-details/TournamentInfo";
import MatchForm from "../../components/admin/tournament-details/MatchForm";
import MatchesTable from "../../components/admin/tournament-details/MatchesTable";

function TournamentDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const firstRender = useRef(true);

  const [tournament, setTournament] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedMatchId, setSelectedMatchId] = useState(0);

  const [successMessage, setSuccessMessage] = useState("");

  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    loadTournament();
  }, [id]);

  // Rehydrate match form after refresh
  useEffect(() => {
    const draft = localStorage.getItem(`matchDraft_${id}`);

    if (!draft) {
      return;
    }

    const data = JSON.parse(draft);

    setIsEditMode(data.isEditMode || false);

    setSelectedMatchId(data.selectedMatchId || 0);
  }, [id]);

  // Save edit state
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    const draft = localStorage.getItem(`matchDraft_${id}`);

    const previous = draft ? JSON.parse(draft) : {};

    localStorage.setItem(
      `matchDraft_${id}`,

      JSON.stringify({
        ...previous,

        isEditMode,

        selectedMatchId,
      }),
    );
  }, [isEditMode, selectedMatchId, id]);

  // Load tournament details
  async function loadTournament() {
    try {
      const data = await tournamentService.getTournament(id);

      setTournament(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Create or update match
  async function saveMatch(formData) {
    try {
      if (isEditMode) {
        const response = await tournamentService.updateMatch(
          selectedMatchId,

          formData,
        );

        setSuccessMessage(response.message);
      } else {
        const response = await tournamentService.createMatch(
          id,

          formData,
        );

        setSuccessMessage(response.message);
      }

      localStorage.removeItem(`matchDraft_${id}`);

      setIsEditMode(false);

      setSelectedMatchId(0);

      loadTournament();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setValidationMessage(
        error.response?.data?.errors?.team2_id?.[0] ||
          error.response?.data?.message ||
          "Validation failed",
      );
    }
  }

  // Delete selected match
  async function deleteMatch(matchId) {
    if (!window.confirm("Delete Match?")) {
      return;
    }

    try {
      await tournamentService.deleteMatch(matchId);

      loadTournament();
    } catch (error) {
      console.log(error);
    }
  }

  // Open edit mode
  function editMatch(match) {
    setSelectedMatchId(match.id);

    setIsEditMode(true);
  }

  // Navigate to Playing XI page
  function managePlayers(matchId) {
    navigate(`/admin/matches/${matchId}/players`);
  }

  // Navigate to Scores page
  function manageScores(matchId) {
    navigate(`/admin/matches/${matchId}/scores`);
  }

  // Generate leaderboard
  async function generateLeaderboard(matchId) {
    try {
      const response = await tournamentService.generateLeaderboard(matchId);

      alert(response.message);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  // Navigate to leaderboard page
  function viewLeaderboard(matchId) {
    navigate(`/admin/matches/${matchId}/leaderboard`);
  }

  if (!tournament) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details-container">
      <TournamentInfo tournament={tournament} />

      <MatchForm
        tournament={tournament}
        isEditMode={isEditMode}
        selectedMatchId={selectedMatchId}
        editingMatch={tournament.matches.find(
          (match) => match.id === selectedMatchId,
        )}
        validationMessage={validationMessage}
        successMessage={successMessage}
        onSave={saveMatch}
      />

      <MatchesTable
        matches={tournament.matches}
        onEdit={editMatch}
        onDelete={deleteMatch}
        onPlayers={managePlayers}
        onScores={manageScores}
        onGenerate={generateLeaderboard}
        onLeaderboard={viewLeaderboard}
      />
    </div>
  );
}

export default TournamentDetails;
