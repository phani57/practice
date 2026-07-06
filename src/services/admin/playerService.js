import api from "../../api/axios";

const getPlayers = async () => {

    const response = await api.get(

        "/admin/players-api"

    );

    return response.data;

};

const addPlayer = async (player) => {

    const response = await api.post(

        "/add-player-api",

        player

    );

    return response.data;

};

const updatePlayer = async (id, player) => {

    const response = await api.post(

        `/update-player-api/${id}`,

        player

    );

    return response.data;

};

const deletePlayer = async (id) => {

    const response = await api.delete(

        `/delete-player-api/${id}`

    );

    return response.data;

};

export default {

    getPlayers,

    addPlayer,

    updatePlayer,

    deletePlayer

};