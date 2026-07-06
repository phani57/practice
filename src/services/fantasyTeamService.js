import api from "../api/axios";

const getMyTeams = async () => {

    const response = await api.get(
        "/my-teams-api"
    );

    return response.data;

};

const deleteTeam = async (teamId) => {

    await api.delete(
        `/delete-fantasy-team-api/${teamId}`
    );

};

const getTeamForEdit = async (teamId) => {

    const response = await api.get(
        `/edit-team-api/${teamId}`
    );

    return response.data;

};

const getGlobalLeaderboard = async () => {

    const response = await api.get(
        "/global-leaderboard-api"
    );

    return response.data;

};

const saveTeam = async (matchId, teamData) => {

    const response = await api.post(
        `/store-team-api/${matchId}`,
        teamData
    );

    return response.data;

};

const updateTeam = async (teamId, teamData) => {

    const response = await api.put(
        `/update-fantasy-team-api/${teamId}`,
        teamData
    );

    return response.data;

};


export default {

    getMyTeams,

    deleteTeam,

    getTeamForEdit,

    getGlobalLeaderboard,

    saveTeam,

    updateTeam,

    editingTeam: null

};