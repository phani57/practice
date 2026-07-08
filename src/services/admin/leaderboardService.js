import api from "../../api/axios";

async function getGlobalLeaderboard() {

    const response = await api.get(

        "/AdminGlobal-leaderboard-api"

    );

    return response.data;

}

export default {

    getGlobalLeaderboard

};