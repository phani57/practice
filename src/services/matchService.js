// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api";
import api from "../api/axios";

const getMatches = async (tournamentId) => {

    // const token = localStorage.getItem("token");

    // const response = await axios.get(

    //     `${API_URL}/matches-data/${tournamentId}`,

    //     {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }

    // );
    const response = await api.get(`/matches-data/${tournamentId}`);

    return response.data;

};

export default {

    getMatches

};