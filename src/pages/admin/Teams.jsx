import "../../styles/admin/Teams.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import teamService from "../../services/admin/teamService";

import TeamsHeader from "../../components/admin/teams/TeamsHeader";
import TeamsToolbar from "../../components/admin/teams/TeamsToolbar";
import TeamsTable from "../../components/admin/teams/TeamsTable";
import TeamModal from "../../components/admin/teams/TeamModal";

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

  // Delete selected team
  async function deleteTeam(id) {
    if (!window.confirm("Delete this team?")) {
      return;
    }

    try {
      const response = await teamService.deleteTeam(id);

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
    <div className="teams-container">
      <TeamsHeader onAddTeam={openCreateModal} />

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <TeamsToolbar searchText={searchText} onSearchChange={onSearchChange} />

      <TeamsTable
        teams={paginatedTeams}
        onEdit={editTeam}
        onDelete={deleteTeam}
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
    </div>
  );
}

export default Teams;
