import styles from "../../../styles/admin/AdminTournaments.module.css";
import { useEffect, useState } from "react";

function TournamentModal({
  show,

  teams,

  isEditMode,

  editingTournament,

  onClose,

  onSave,
}) {
  const [form, setForm] = useState({
    name: "",

    start_date: "",

    end_date: "",

    teams: [],
  });

  //rehydration
  // Restore form whenever modal opens
  useEffect(() => {
    if (!show) {
      return;
    }

    const draft = localStorage.getItem("tournamentModalDraft");

    if (draft) {
      const data = JSON.parse(draft);

      if (data.form) {
        setForm(data.form);

        return;
      }
    }

    if (isEditMode && editingTournament) {
      setForm({
        name: editingTournament.name,

        start_date: editingTournament.start_date,

        end_date: editingTournament.end_date,

        teams: editingTournament.teams.map((team) => team.id),
      });
    } else {
      setForm({
        name: "",

        start_date: "",

        end_date: "",

        teams: [],
      });
    }
  }, [show, isEditMode, editingTournament]);

  // Save form and draft together
  function updateForm(updatedForm) {
    setForm(updatedForm);

    const draft = localStorage.getItem("tournamentModalDraft");

    const previous = draft ? JSON.parse(draft) : {};

    localStorage.setItem(
      "tournamentModalDraft",

      JSON.stringify({
        ...previous,

        form: updatedForm,
      }),
    );
  }

  // Update text/date fields
  function handleChange(e) {
    const updatedForm = {
      ...form,

      [e.target.name]: e.target.value,
    };

    updateForm(updatedForm);
  }

  // Select and unselect teams
  function handleTeamChange(e) {
    const id = Number(e.target.value);

    let selectedTeams = [...form.teams];

    if (e.target.checked) {
      selectedTeams.push(id);
    } else {
      selectedTeams = selectedTeams.filter((teamId) => teamId !== id);
    }

    updateForm({
      ...form,

      teams: selectedTeams,
    });
  }

  // Send form to parent
  function handleSubmit(e) {
    e.preventDefault();

    onSave(form);
  }

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalCard}>
        <h2>{isEditMode ? "Edit Tournament" : "Add Tournament"}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Tournament Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Start Date</label>

            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>End Date</label>

            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Select Teams</label>

            <div className={styles.teamsList}>
              {teams.map((team) => (
                <label
                  key={team.id}
                  className={
                    form.teams.includes(team.id)
                      ? `${styles.teamItem} ${styles.selected}`
                      : styles.teamItem
                  }
                >
                  <input
                    type="checkbox"
                    value={team.id}
                    checked={form.teams.includes(team.id)}
                    onChange={handleTeamChange}
                    className={styles.hiddenCheckbox}
                  />

                  <span className={styles.checkboxIndicator}>✓</span>

                  <span className={styles.teamName}>{team.team_name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.modalButtons}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                localStorage.removeItem("tournamentModalDraft");

                onClose();
              }}
            >
              Cancel
            </button>

            <button type="submit" className={styles.saveBtn}>
              {isEditMode ? "Update Tournament" : "Save Tournament"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TournamentModal;
