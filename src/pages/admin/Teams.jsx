import styles from "../../styles/admin/Teams.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import teamService from "../../services/admin/teamService";

import TeamsHeader from "../../components/admin/Teams/TeamsHeader";
import TeamsToolbar from "../../components/admin/Teams/TeamsToolbar";
import TeamsTable from "../../components/admin/Teams/TeamsTable";
import TeamModal from "../../components/admin/Teams/TeamModal";
import ConfirmModal from "../../components/common/ConfirmModal";

function Teams() {
  const firstRender = useRef(true);
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);

  const [players, setPlayers] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const [showModal, setShowModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [editingTeam, setEditingTeam] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    loadTeams();

    loadPlayers();
  }, []);

  // Rehydrate modal state after page refresh
  useEffect(() => {
    const draft = localStorage.getItem("teamModalDraft");

    if (!draft) {
      return;
    }

    const data = JSON.parse(draft);

    setShowModal(data.showModal || false);

    setIsEditMode(data.isEditMode || false);

    setEditingTeam(data.editingTeam || null);
  }, []);

  //   // Save modal state whenever it changes
  //   useEffect(() => {
  //     const draft = localStorage.getItem("teamModalDraft");

  //     let form = {
  //       name: "",

  //       players: [],
  //     };

  //     if (draft) {
  //       form = JSON.parse(draft).form || form;
  //     }

  //     localStorage.setItem(
  //       "teamModalDraft",

  //       JSON.stringify({
  //         form,

  //         showModal,

  //         isEditMode,

  //         editingTeam,
  //       }),
  //     );
  //   }, [showModal, isEditMode, editingTeam]);

  // Save modal state
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    const draft = localStorage.getItem("teamModalDraft");

    const previous = draft ? JSON.parse(draft) : {};

    localStorage.setItem(
      "teamModalDraft",

      JSON.stringify({
        ...previous,

        showModal,

        isEditMode,

        editingTeam,
      }),
    );
  }, [showModal, isEditMode, editingTeam]);

  // Load all teams from the backend
  async function loadTeams() {
    try {
      const data = await teamService.getTeams();

      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Load all players for team creation
  async function loadPlayers() {
    try {
      const data = await teamService.getPlayers();

      setPlayers(data);
    } catch (error) {
      console.log(error);
    }
  }

  function openCreateModal() {
    localStorage.removeItem("teamModalDraft");

    setEditingTeam(null);

    setIsEditMode(false);

    setShowModal(true);
  }

  // Close modal and clear editing state
  function closeModal() {
    setShowModal(false);

    setIsEditMode(false);

    setEditingTeam(null);

    localStorage.removeItem("teamModalDraft");
  }

  function editTeam(team) {
    localStorage.removeItem("teamModalDraft");

    setEditingTeam(team);

    setIsEditMode(true);

    setShowModal(true);
  }

  function updateForm(updatedForm) {
    setForm(updatedForm);

    const draft = localStorage.getItem("teamModalDraft");

    const previous = draft ? JSON.parse(draft) : {};

    localStorage.setItem(
      "teamModalDraft",

      JSON.stringify({
        ...previous,

        form: updatedForm,
      }),
    );
  }

  // Navigate to team details page
  function viewTeam(id) {
    navigate(`/admin/teams/${id}`);
  }

  // Filter teams based on search text
  const filteredTeams = teams.filter((team) =>
    team.team_name

      .toLowerCase()

      .includes(searchText.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;

  const end = start + itemsPerPage;

  const paginatedTeams = filteredTeams.slice(start, end);

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

  // Create a new team or update existing team
  async function saveTeam(formData) {
    try {
      if (isEditMode) {
        const response = await teamService.updateTeam(
          editingTeam.id,

          formData,
        );

        setSuccessMessage(response.message);
      } else {
        const response = await teamService.addTeam(formData);

        setSuccessMessage(response.message);
      }

      localStorage.removeItem("teamModalDraft");

      closeModal();

      loadTeams();

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

  // Open confirm modal for deleting a team
  function handleDeleteClick(id) {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  }

  // Delete selected team
  async function deleteTeam() {
    setIsConfirmOpen(false);
    if (!deleteTargetId) return;

    try {
      const response = await teamService.deleteTeam(deleteTargetId);

      setSuccessMessage(response.message);

      loadTeams();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Unable to delete team");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  return (
    <div className={styles.teamsContainer}>
      <TeamsHeader onAddTeam={openCreateModal} />

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <TeamsToolbar searchText={searchText} onSearchChange={onSearchChange} />

      <TeamsTable
        teams={paginatedTeams}
        onEdit={editTeam}
        onDelete={handleDeleteClick}
        onView={viewTeam}
      />

      <TeamModal
        show={showModal}
        players={players}
        isEditMode={isEditMode}
        editingTeam={editingTeam}
        onClose={closeModal}
        onSave={saveTeam}
      />

      <ConfirmModal
        open={isConfirmOpen}
        title="Delete Team"
        message="Are you sure you want to delete this team? This action cannot be undone."
        onConfirm={deleteTeam}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}

export default Teams;
