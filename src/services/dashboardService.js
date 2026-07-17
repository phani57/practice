import api from "../api/axios";

const getDashboardData = async () => {

    const response = await api.get(

        "/dashboard-data"

    );

    return response.data;

};



export default {

    getDashboardData,
    

};