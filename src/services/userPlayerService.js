import api from "../api/axios";

const getPlayingPlayers = async (matchId) => {

    const response = await api.get(

        `/players-data/${matchId}`

    );

    return response.data;

};

export default {

    getPlayingPlayers,

};