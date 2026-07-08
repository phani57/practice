import { useEffect, useState } from "react";

function TeamModal({
  show,

  players,

  isEditMode,

  editingTeam,

  onClose,

  onSave,
}) {
  const [form, setForm] = useState({
    name: "",

    players: [],
  });

  // Load saved draft when modal opens
  //   useEffect(() => {
  //     if (!show) {
  //       return;
  //     }

  //     const draft = localStorage.getItem("teamModalDraft");

  //     if (draft) {
  //       setForm(JSON.parse(draft));
  //     }
  //   }, [show]);

  // Load editing team into the form
  //   useEffect(() => {
  //     if (!show) {
  //       return;
  //     }

  //     if (!editingTeam) {
  //       return;
  //     }

  //     setForm({
  //       name: editingTeam.team_name,

  //       players: editingTeam.players.map((player) => player.id),
  //     });
  //   }, [editingTeam, show]);

  //   // Reset form while opening Add Team
  //   useEffect(() => {
  //     if (!show) {
  //       return;
  //     }

  //     if (isEditMode) {
  //       return;
  //     }

  //     const draft = localStorage.getItem("teamModalDraft");

  //     if (!draft) {
  //       setForm({
  //         name: "",

  //         players: [],
  //       });
  //     }
  //   }, [show, isEditMode]);

  // Restore form while opening modal
  useEffect(() => {
    if (!show) {
      return;
    }

    const draft = localStorage.getItem("teamModalDraft");

    if (draft) {
      const data = JSON.parse(draft);

      if (data.form) {
        setForm(data.form);

        return;
      }
    }

    if (isEditMode && editingTeam) {
      setForm({
        name: editingTeam.team_name,

        players: editingTeam.players.map((player) => player.id),
      });
    } else {
      setForm({
        name: "",

        players: [],
      });
    }
  }, [show, isEditMode, editingTeam]);

  // Restore draft when modal opens
  useEffect(() => {
    if (!show) {
      return;
    }

    const draft = localStorage.getItem("teamModalDraft");

    if (!draft) {
      return;
    }

    const data = JSON.parse(draft);

    if (data.form) {
      setForm(data.form);
    }
  }, [show]);

  // Update form state and save it into the draft
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

  // Update input field values
  function handleChange(e) {
    const updatedForm = {
      ...form,

      [e.target.name]: e.target.value,
    };

    updateForm(updatedForm);
  }

  // Select or unselect players
  function handlePlayerChange(e) {
    const id = Number(e.target.value);

    let updatedPlayers = [...form.players];

    if (e.target.checked) {
      updatedPlayers.push(id);
    } else {
      updatedPlayers = updatedPlayers.filter((playerId) => playerId !== id);
    }

    const updatedForm = {
      ...form,

      players: updatedPlayers,
    };

    updateForm(updatedForm);
  }

  // Submit form data to parent
  function handleSubmit(e) {
    e.preventDefault();

    onSave(form);
  }

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>{isEditMode ? "Edit Team" : "Add Team"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Team Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Select Players</label>

            <div className="players-list">
              {players.map((player) => (
                <label
                  key={player.id}
                  className={
                    form.players.includes(player.id)
                      ? "player-item selected"
                      : "player-item"
                  }
                >
                  <input
                    type="checkbox"
                    value={player.id}
                    checked={form.players.includes(player.id)}
                    onChange={handlePlayerChange}
                  />

                  <span className="player-name">{player.player_name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                localStorage.removeItem("teamModalDraft");

                onClose();
              }}
            >
              Cancel
            </button>

            <button className="save-btn" type="submit">
              {isEditMode ? "Update Team" : "Save Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamModal;
