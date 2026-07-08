import { useEffect, useState } from "react";

function MatchForm({
  tournament,

  isEditMode,

  selectedMatchId,

  editingMatch,

  validationMessage,

  successMessage,

  onSave,
}) {
  const [form, setForm] = useState({
    team1_id: "",

    team2_id: "",

    match_date: "",
  });

  // Load editing match into form
  useEffect(() => {
    if (!editingMatch) {
      return;
    }

    setForm({
      team1_id: editingMatch.team1_id,

      team2_id: editingMatch.team2_id,

      match_date: editingMatch.match_date,
    });
  }, [editingMatch]);

  // Rehydration
  useEffect(() => {
    const draft = localStorage.getItem(`matchDraft_${tournament.id}`);

    if (!draft) {
      return;
    }

    const data = JSON.parse(draft);

    if (data.form) {
      setForm(data.form);
    }
  }, [tournament.id]);

  // Save draft whenever form changes
  useEffect(() => {
    const draft = localStorage.getItem(`matchDraft_${tournament.id}`);

    const previous = draft ? JSON.parse(draft) : {};

    localStorage.setItem(
      `matchDraft_${tournament.id}`,

      JSON.stringify({
        ...previous,

        form,
      }),
    );
  }, [form, tournament.id]);

  // Update input values
  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  // Submit form
  function handleSubmit(e) {
    e.preventDefault();

    onSave(form);
  }

  return (
    <div className="card">
      <h2>{isEditMode ? "Edit Match" : "Create Match"}</h2>

      {validationMessage && (
        <div className="validation-error">{validationMessage}</div>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form className="match-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Team 1</label>

          <select name="team1_id" value={form.team1_id} onChange={handleChange}>
            <option value="">Select Team</option>

            {tournament.teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.team_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Team 2</label>

          <select name="team2_id" value={form.team2_id} onChange={handleChange}>
            <option value="">Select Team</option>

            {tournament.teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.team_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Match Date</label>

          <input
            type="datetime-local"
            name="match_date"
            value={form.match_date}
            onChange={handleChange}
          />
        </div>

        <button className="primary-btn" type="submit">
          {isEditMode ? "Update Match" : "Create Match"}
        </button>
      </form>
    </div>
  );
}

export default MatchForm;
