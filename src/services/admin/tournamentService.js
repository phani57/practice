import axios from "../../api/axios";

// const getTournaments = async () => {

//     const response = await axios.get(

//         "/admin/tournaments-api"

//     );

//     return response.data;

// };
const getTournaments = async () => {

    const response = await axios.get(

        "/admin/tournaments-api"

    );

    return response.data.data;

};

const getTeams = async () => {

    const response = await axios.get(

        "/admin/teams-list-api"

    );

    return response.data;

};

const addTournament = async (data) => {

    const response = await axios.post(

        "/add-tournament-api",

        data

    );

    return response.data;

};

const updateTournament = async (id, data) => {

    const response = await axios.put(

        `/update-tournament-api/${id}`,

        data

    );

    return response.data;

};

const deleteTournament = async (id) => {

    const response = await axios.delete(

        `/delete-tournament-api/${id}`

    );

    return response.data;

};

const getTournament = async (id) => {

    const response = await axios.get(

        `/admin/tournaments-api/${id}`

    );

    return response.data;

};

// Create a match
const createMatch = async (tournamentId, data) => {

    const response = await axios.post(

        `/tournaments/${tournamentId}/matches-api`,

        data

    );

    return response.data;

};

// Update a match
const updateMatch = async (id, data) => {

    const response = await axios.put(

        `/update-match-api/${id}`,

        data

    );

    return response.data;

};

// Delete a match
const deleteMatch = async (id) => {

    const response = await axios.delete(

        `/delete-match-api/${id}`

    );

    return response.data;

};

// Generate leaderboard
const generateLeaderboard = async (matchId) => {

    const response = await axios.post(

        `/matches/${matchId}/generate-leaderboard-api`

    );

    return response.data;

};


// Get match players
const getMatchPlayers = async (matchId) => {

    const response = await axios.get(

        `/matches/${matchId}/players-api`

    );

    return response.data;

};

// Save Playing XI
const savePlayingXI = async (matchId, players) => {

    const response = await axios.post(

        `/matches/${matchId}/save-players-api`,

        {

            players

        }

    );

    return response.data;

};

// Get match scores
const getMatchScores = async (matchId) => {

    const response = await axios.get(

        `/matches/${matchId}/scores-api`

    );

    return response.data;

};

// Save scores
const saveScores = async (matchId, scores) => {

    const response = await axios.post(

        `/matches/${matchId}/scores-api`,

        {

            scores

        }

    );

    return response.data;

};

const getLeaderboard = async (matchId) => {

    const response = await axios.get(

        `/matches/${matchId}/leaderboard-api`

    );

    return response.data;

};


export default {

    getTournaments,

    getTeams,

    addTournament,

    updateTournament,

    deleteTournament,

    getTournament,

    createMatch,

    updateMatch,

    deleteMatch,

    generateLeaderboard,
    getMatchPlayers,

    savePlayingXI,
    getMatchScores,

    saveScores,
    getLeaderboard

};