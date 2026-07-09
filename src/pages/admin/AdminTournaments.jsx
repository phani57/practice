import styles from "../../styles/admin/AdminTournaments.module.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import tournamentService from "../../services/admin/tournamentService";

import TournamentsHeader from "../../components/admin/tournaments/TournamentsHeader";
import TournamentsToolbar from "../../components/admin/tournaments/TournamentsToolbar";
import TournamentsTable from "../../components/admin/tournaments/TournamentsTable";
import TournamentModal from "../../components/admin/tournaments/TournamentModal";
import ConfirmModal from "../../components/common/ConfirmModal";

function AdminTournaments() {
  const navigate = useNavigate();

  const firstRender = useRef(true);

  const [tournaments, setTournaments] = useState([]);

  const [teams, setTeams] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const [showModal, setShowModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [editingTournament, setEditingTournament] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    loadTournaments();

    loadTeams();
  }, []);

  //rehydration
  useEffect(() => {
    const draft = localStorage.getItem("tournamentModalDraft");

    if (!draft) {
      return;
    }

    const data = JSON.parse(draft);

    setShowModal(data.showModal || false);

    setIsEditMode(data.isEditMode || false);

    setEditingTournament(data.editingTournament || null);
  }, []);

  //rehydration
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    const draft = localStorage.getItem("tournamentModalDraft");

    const previous = draft ? JSON.parse(draft) : {};

    localStorage.setItem(
      "tournamentModalDraft",

      JSON.stringify({
        ...previous,

        showModal,

        isEditMode,

        editingTournament,
      }),
    );
  }, [showModal, isEditMode, editingTournament]);

  // Load tournaments from backend
  async function loadTournaments() {
    try {
      const data = await tournamentService.getTournaments();

      setTournaments(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Load teams for tournament creation
  async function loadTeams() {
    try {
      const data = await tournamentService.getTeams();

      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Open modal for creating tournament
  function openCreateModal() {
    localStorage.removeItem("tournamentModalDraft");

    setEditingTournament(null);

    setIsEditMode(false);

    setShowModal(true);
  }

  // Close modal and clear draft
  function closeModal() {
    setShowModal(false);

    setIsEditMode(false);

    setEditingTournament(null);

    localStorage.removeItem("tournamentModalDraft");
  }

  // Open selected tournament in edit mode
  function editTournament(tournament) {
    localStorage.removeItem("tournamentModalDraft");

    setEditingTournament(tournament);

    setIsEditMode(true);

    setShowModal(true);
  }

  // Open confirm modal for deleting a tournament
  function handleDeleteClick(id) {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  }

  // Delete selected tournament
  async function deleteTournament() {
    setIsConfirmOpen(false);
    if (!deleteTargetId) return;

    try {
      const response = await tournamentService.deleteTournament(deleteTargetId);

      setSuccessMessage(response.message);

      loadTournaments();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to delete tournament",
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  // Create or update tournament
  async function saveTournament(formData) {
    try {
      if (isEditMode) {
        const response = await tournamentService.updateTournament(
          editingTournament.id,

          formData,
        );

        setSuccessMessage(response.message);
      } else {
        const response = await tournamentService.addTournament(formData);

        setSuccessMessage(response.message);
      }

      localStorage.removeItem("tournamentModalDraft");

      closeModal();

      loadTournaments();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  // Navigate to tournament details
  function viewTournament(id) {
    navigate(`/admin/tournaments/${id}`);
  }

  // Filter tournaments
  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name

      .toLowerCase()

      .includes(searchText.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredTournaments.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;

  const end = start + itemsPerPage;

  const paginatedTournaments = filteredTournaments.slice(
    start,

    end,
  );

  // Go to previous page
  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Go to next page
  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  // Update search text
  function onSearchChange(e) {
    setSearchText(e.target.value);

    setCurrentPage(1);
  }
  return (
    <div className={styles.tournamentsContainer}>
      <TournamentsHeader onAddTournament={openCreateModal} />

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <TournamentsToolbar
        searchText={searchText}
        onSearchChange={onSearchChange}
      />

      <TournamentsTable
        tournaments={paginatedTournaments}
        onEdit={editTournament}
        onDelete={handleDeleteClick}
        onView={viewTournament}
      />

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={styles.pageBtn}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <TournamentModal
        show={showModal}
        teams={teams}
        isEditMode={isEditMode}
        editingTournament={editingTournament}
        onClose={closeModal}
        onSave={saveTournament}
      />

      <ConfirmModal
        open={isConfirmOpen}
        title="Delete Tournament"
        message="Are you sure you want to delete this tournament? This action cannot be undone."
        onConfirm={deleteTournament}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}

export default AdminTournaments;
