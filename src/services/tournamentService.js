// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api";
import api from "../api/axios";

const getTournaments = async () => {

    // const token = localStorage.getItem("token");

    // const response = await axios.get(

    //     `${API_URL}/tournaments-data`,

    //     {

    //         headers:{

    //             Authorization:`Bearer ${token}`

    //         }

    //     }

    // );
    const response = await api.get(

"/tournaments-data"

);

    return response.data;

};

export default{

getTournaments

}