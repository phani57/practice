import api from "../../api/axios";

// Get all teams
async function getTeams() {
  const response = await api.get("/admin/teams-api");

  return response.data;
}

// Get all players for team creation
async function getPlayers() {
  const response = await api.get("/admin/players-api");

  return response.data;
}

// Create new team
async function addTeam(team) {
  const response = await api.post(
    "/add-team-api",

    team,
  );

  return response.data;
}

// Update existing team
async function updateTeam(id, team) {
  const response = await api.put(
    `/update-team-api/${id}`,

    team,
  );

  return response.data;
}

// Delete a team
async function deleteTeam(id) {
  const response = await api.delete(`/delete-team-api/${id}`);

  return response.data;
}

// Get single team details
async function getTeam(id) {
  const response = await api.get(`/admin/teams-api/${id}`);

  return response.data;
}

/**
 * Sends a GET request to retrieve the team players list as a CSV file blob.
 * Uses responseType 'blob' to process binary file data streams.
 *
 * @param {string|number} id - The ID of the team.
 * @returns {Promise<AxiosResponse<Blob>>} The API response containing the CSV Blob.
 */
async function downloadTeamCsv(id) {
  const response = await api.get(`/admin/teams-api/${id}/download`, {
    responseType: "blob",
  });

  return response;
}
async function downloadTeamExcel(id) {
  const response = await api.get(`/admin/teams-api/${id}/download-excel`, {
    responseType: "blob",
  });

  return response;
}

async function downloadTeamPdf(id) {
  const response = await api.get(
    `/admin/teams-api/${id}/download-pdf`,

    {
      responseType: "blob",
    },
  );

  return response;
}

export default {
  getTeams,

  getPlayers,

  addTeam,

  updateTeam,

  deleteTeam,

  getTeam,

  downloadTeamCsv,

  downloadTeamExcel,

  downloadTeamPdf,
};
